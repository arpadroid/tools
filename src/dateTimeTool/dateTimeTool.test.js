/* eslint-disable sonarjs/no-duplicate-string */
import {
    getTimeString,
    getTimezoneOffset,
    normalizeTimeZeroes,
    isFuture,
    isBefore,
    isAfter,
    isPast,
    isToday,
    isYesterday,
    isTomorrow,
    isThisWeek,
    isThisMonth,
    isThisYear,
    formatDate,
    getTimeAgo,
    validateDateFormat,
    getDaysInMonth,
    setDateToMonday
} from './dateTimeTool';

describe('DateTimeTool', () => {
    describe('normalizeTimeZeroes', () => {
        test('should add zero values if missing from seconds/minutes/hours', () => {
            expect(normalizeTimeZeroes(1)).toBe('01');
            expect(normalizeTimeZeroes('1')).toBe('01');
            expect(normalizeTimeZeroes(10)).toBe('10');
            expect(normalizeTimeZeroes('01')).toBe('01');
        });
    });

    describe('getTimeString', () => {
        test('should return a string representation of the current time', () => {
            const currentTime = new Date();
            const timeString = getTimeString(currentTime);
            const [hours, minutes, seconds] = timeString.split(':');
            expect(Number(hours)).toBe(currentTime.getHours());
            expect(Number(minutes)).toBe(currentTime.getMinutes());
            expect(Number(seconds)).toBe(currentTime.getSeconds());
        });

        test('should return a string representation of the current time without seconds', () => {
            const currentTime = new Date();
            const timeString = getTimeString(currentTime, false);
            const [hours, minutes] = timeString.split(':');
            expect(Number(hours)).toBe(currentTime.getHours());
            expect(Number(minutes)).toBe(currentTime.getMinutes());
        });
    });

    describe('getTimezoneOffset', () => {
        test('should return the timezone offset in hours', () => {
            const currentTime = new Date();
            const timezoneOffset = getTimezoneOffset(currentTime);
            expect(timezoneOffset).toBe(currentTime.getTimezoneOffset() / 60);
        });
    });

    describe('isFuture', () => {
        test('should return true if the date is in the future', () => {
            const futureDate = new Date(Date.now() + 1);
            expect(isFuture(futureDate)).toBe(true);
        });

        test('should return false if the date is in the past', () => {
            const pastDate = new Date(Date.now() - 1);
            expect(isFuture(pastDate)).toBe(false);
        });
    });

    describe('isBefore', () => {
        test('should return true if the first date is before the second date', () => {
            const date1 = new Date(Date.now() - 100000000);
            const date2 = new Date();
            expect(isBefore(date1, date2)).toBe(true);
        });

        test('should return false if the first date is after the second date', () => {
            const date1 = new Date();
            const date2 = new Date(Date.now() - 100000000);
            expect(isBefore(date1, date2)).toBe(false);
        });
    });

    describe('isAfter', () => {
        test('should return true if the first date is after the second date', () => {
            const date1 = new Date(Date.now() + 100000000);
            const date2 = new Date();
            expect(isAfter(date1, date2)).toBe(true);
        });

        test('should return false if the first date is before the second date', () => {
            const date1 = new Date();
            const date2 = new Date(Date.now() + 100000000);
            expect(isAfter(date1, date2)).toBe(false);
        });
    });

    describe('isPast', () => {
        test('should return true if the date is in the past', () => {
            const pastDate = new Date(Date.now() - 100000000);
            expect(isPast(pastDate)).toBe(true);
        });

        test('should return false if the date is in the future', () => {
            const futureDate = new Date(Date.now() + 100000000);
            expect(isPast(futureDate)).toBe(false);
        });
    });

    describe('isToday', () => {
        test('should return true if the date is today', () => {
            const today = new Date();
            expect(isToday(today)).toBe(true);
        });

        test('should return false if the date is not today', () => {
            const yesterday = new Date(Date.now() - 86400000);
            expect(isToday(yesterday)).toBe(false);
        });
    });

    describe('isYesterday', () => {
        test('should return true if the date is yesterday', () => {
            const yesterday = new Date(Date.now() - 86400000);
            expect(isYesterday(yesterday)).toBe(true);
        });

        test('should return false if the date is not yesterday', () => {
            const today = new Date();
            expect(isYesterday(today)).toBe(false);
        });
    });

    describe('isTomorrow', () => {
        test('should return true if the date is tomorrow', () => {
            const tomorrow = new Date(Date.now() + 86400000);
            expect(isTomorrow(tomorrow)).toBe(true);
        });

        test('should return false if the date is not tomorrow', () => {
            const today = new Date();
            expect(isTomorrow(today)).toBe(false);
        });
    });

    describe('isThisWeek', () => {
        test('should return true if the date is this week', () => {
            const nextWeek = new Date(Date.now());
            expect(isThisWeek(nextWeek)).toBe(true);
        });

        test('should return false if the date is not this week', () => {
            const lastWeek = new Date(Date.now() - 604800000);
            expect(isThisWeek(lastWeek)).toBe(false);
        });
    });

    describe('isThisMonth', () => {
        test('should return true if the date is this month', () => {
            const nextMonth = new Date(Date.now());
            expect(isThisMonth(nextMonth)).toBe(true);
        });

        test('should return false if the date is not this month', () => {
            const lastMonth = new Date(Date.now() - 2652000000);
            expect(isThisMonth(lastMonth)).toBe(false);
        });
    });

    describe('isThisYear', () => {
        test('should return true if the date is this year', () => {
            const nextYear = new Date(Date.now());
            expect(isThisYear(nextYear)).toBe(true);
        });

        test('should return false if the date is not this year', () => {
            const lastYear = new Date(Date.now() - 31536000000);
            expect(isThisYear(lastYear)).toBe(false);
        });
    });

    describe('format', () => {
        test('should return a formatted date string', () => {
            const date = new Date();
            const formattedDate = formatDate(date, 'YYYY-MM-DD', false);
            const [year, month, day] = formattedDate.split('-');
            expect(Number(year)).toBe(date.getFullYear());
            expect(Number(month)).toBe(date.getMonth() + 1);
            expect(Number(day)).toBe(date.getDate());
        });

        test('should return a formatted date and time string', () => {
            const date = new Date();
            const formattedDate = formatDate(date, 'YYYY-MM-DD HH:mm:ss');
            const [year, month, day] = formattedDate.split(' ')[0].split('-');
            const [hours, minutes, seconds] = formattedDate.split(' ')[1].split(':');
            expect(Number(year)).toBe(date.getFullYear());
            expect(Number(month)).toBe(date.getMonth() + 1);
            expect(Number(day)).toBe(date.getDate());
            expect(Number(hours)).toBe(date.getHours());
            expect(Number(minutes)).toBe(date.getMinutes());
            expect(Number(seconds)).toBe(date.getSeconds());
        });
    });

    describe('getTimeAgo', () => {
        test('should return a time ago string', () => {
            const date = new Date(Date.now() - 1000);
            const timeAgo = getTimeAgo(date);
            expect(timeAgo).toBe('Just now');
        });

        test('should return a time ago string with minutes', () => {
            const date = new Date(Date.now() - 60000);
            const timeAgo = getTimeAgo(date);
            expect(timeAgo).toBe('1 minute ago');
        });

        test('should return a time string 59 minutes ago', () => {
            const date = new Date(Date.now() - 60000 * 59);
            const timeAgo = getTimeAgo(date);
            expect(timeAgo).toBe('59 minutes ago');
        });

        test('should return a time string one hour ago', () => {
            const date = new Date(Date.now() - 3600000);
            const timeAgo = getTimeAgo(date);
            expect(timeAgo).toBe('1 hour ago');
        });

        test('should return a time ago string with hours', () => {
            const date = new Date(Date.now() - 3600000 * 24);
            const timeAgo = getTimeAgo(date);
            expect(timeAgo).toBe('Yesterday at ' + formatDate(date, 'HH:mm'));
        });

        test('should return a time ago string with day of the week', () => {
            /**
             * @todo Fix this test.
             */
            // const monday = setDateToMonday(new Date());
            // const friday = new Date(monday);
            // friday.setDate(monday.getDate() + 4);
            // const timeAgo = getTimeAgo(monday, friday);
            // expect(timeAgo).toBe('Monday at ' + formatDate(monday, 'HH:mm'));
        });

        test('should return a time ago string with a custom format', () => {
            const date = new Date(Date.now() - 3600000 * 24 * 7);
            const timeAgo = getTimeAgo(date, new Date(), 'YYYY-MM-DD HH:mm:ss');
            expect(timeAgo).toBe(formatDate(date, 'YYYY-MM-DD HH:mm:ss'));
        });
    });

    describe('validateDateFormat', () => {
        test('should return true for a valid format', () => {
            expect(validateDateFormat('YYYY-MM-DD HH:mm:ss')).toBe(true);
        });

        test('should return false for an invalid format', () => {
            expect(validateDateFormat('this is not a format')).toBe(false);
        });
    });

    describe('getDaysInMonth', () => {
        test('should return the number of days in a month', () => {
            expect(getDaysInMonth(2, 2021)).toBe(28);
            expect(getDaysInMonth(2, 2020)).toBe(29);
            expect(getDaysInMonth(4, 2021)).toBe(30);
            expect(getDaysInMonth(5, 2021)).toBe(31);
        });
    });

    describe('setDateToMonday', () => {
        test('should return the date set to the first day of the week', () => {
            const date = new Date('2021-01-01');
            const monday = setDateToMonday(date);
            expect(monday.getDay()).toBe(1);
        });
    });
});
