import {
    validateRequired,
    validateMaxLength,
    validateMinLength,
    validateLength,
    validateSize,
    validateRegex,
    validateNumber,
    validateColor,
} from './validationTool';

describe('Validation Tool', () => {
    describe('validateRequired', () => {
        it('should return true if value is not empty', () => {
            expect(validateRequired('hello')).toBe(true);
        });

        it('should return false if value is empty', () => {
            expect(validateRequired('')).toBe(false);
        });
    });

    describe('validateMaxLength', () => {
        it('should return true if value length is less than or equal to maxLength', () => {
            expect(validateMaxLength('hello', 10)).toBe(true);
        });

        it('should return false if value length is greater than maxLength', () => {
            expect(validateMaxLength('hello', 3)).toBe(false);
        });
    });

    describe('validateMinLength', () => {
        it('should return true if value length is greater than or equal to minLength', () => {
            expect(validateMinLength('hello', 3)).toBe(true);
        });

        it('should return false if value length is less than minLength', () => {
            expect(validateMinLength('hello', 10)).toBe(false);
        });
    });

    describe('validateLength', () => {
        it('should return true if value length is equal to length', () => {
            expect(validateLength('hello', 5)).toBe(true);
        });

        it('should return false if value length is not equal to length', () => {
            expect(validateLength('hello', 10)).toBe(false);
        });
    });

    describe('validateSize', () => {
        it('should return true if value size is within the range', () => {
            expect(validateSize([1, 2, 3], [1, 3])).toBe(true);
        });

        it('should return false if value size is not within the range', () => {
            expect(validateSize([1, 2, 3], [4, 6])).toBe(false);
        });
    });

    describe('validateRegex', () => {
        it('should return true if value matches the regular expression', () => {
            expect(validateRegex('hello', /^h.*o$/)).toBe(true);
        });

        it('should return false if value does not match the regular expression', () => {
            expect(validateRegex('hello', /^a.*z$/)).toBe(false);
        });
    });

    describe('number', () => {
        it('should return true if value is a number', () => {
            expect(validateNumber(42)).toBe(true);
        });

        it('should return false if value is not a number', () => {
            expect(validateNumber('hello')).toBe(false);
        });
    });

    describe('color', () => {
        it('should return true if value is a valid color', () => {
            expect(validateColor('#FF0000')).toBe(true);
        });

        it('should return false if value is not a valid color', () => {
            expect(validateColor('hello')).toBe(false);
        });
    });
});
