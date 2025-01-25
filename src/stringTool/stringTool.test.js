import {
    dashedToCamel,
    ucFirst,
    lcFirst,
    truncate,
    getSafeID,
    parseOutlookEmails,
    mechanize,
    removeWhiteSpace,
    extractCurrency,
    sanitizeSearchInput,
    getInitials
} from './stringTool';

describe('dashedToCamel', () => {
    describe('dashedToCamel', () => {
        test('converts a dashed string to camel case', () => {
            expect(dashedToCamel('hello-world')).toBe('helloWorld');
            expect(dashedToCamel('foo-bar-baz')).toBe('fooBarBaz');
        });
    });

    describe('ucFirst', () => {
        test('converts the first character of a string to uppercase', () => {
            expect(ucFirst('hello')).toBe('Hello');
            expect(ucFirst('world')).toBe('World');
        });
    });

    describe('lcFirst', () => {
        test('converts the first character of a string to lowercase', () => {
            expect(lcFirst('Hello')).toBe('hello');
            expect(lcFirst('World')).toBe('world');
        });
    });

    describe('truncate', () => {
        test('truncates a string to a specified length', () => {
            expect(truncate('Lorem ipsum dolor sit amets', 10)).toBe('Lorem ipsu ...');
            expect(truncate('Hello, gang!', 5)).toBe('Hello ...');
        });
    });

    describe('getSafeID', () => {
        test('removes unsafe characters from a string to create a safe ID', () => {
            expect(getSafeID('Hello, droid!')).toBe('hellodroid');
            expect(getSafeID('Some text')).toBe('sometext');
        });
    });

    describe('parseOutlookEmails', () => {
        test('parses email addresses from a string', () => {
            expect(parseOutlookEmails('john@example.com; mary@example.com')).toEqual([
                'john@example.com',
                'mary@example.com'
            ]);
            expect(parseOutlookEmails('No emails found')).toEqual([]);
        });
    });

    describe('mechanize', () => {
        test('converts a string to a URL-friendly format', () => {
            expect(mechanize('Hello world!')).toBe('hello-world');
            expect(mechanize('Lorem ipsum dolor sit amet')).toBe('lorem-ipsum-dolor-sit-amet');
        });
    });

    describe('removeWhiteSpace', () => {
        test('removes white spaces from a string', () => {
            expect(removeWhiteSpace('Hello, world!')).toBe('Hello,world!');
            expect(removeWhiteSpace('Lorem ipsum dolor sit amet')).toBe('Loremipsumdolorsitamet');
        });
    });

    describe('extractCurrency', () => {
        test('extracts the currency symbol from a string', () => {
            expect(extractCurrency('Price: $10')).toBe('$');
            expect(extractCurrency('Total: €20')).toBe('€');
            expect(extractCurrency('No currency symbol')).toBeNull();
        });
    });

    describe('sanitizeSearchInput', () => {
        test('sanitizes a search input by removing special characters and limiting the length', () => {
            expect(sanitizeSearchInput('Hello, world!')).toBe('Hello world');
        });
    });

    describe('getInitials', () => {
        test('retrieves the initials from a string', () => {
            expect(getInitials('John Doe')).toBe('JD');
            expect(getInitials('Jane Smith')).toBe('JS');
        });
    });
});
