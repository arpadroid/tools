import { encodeValueCommas, decodeValueCommas, csvToJson } from './csvTool';

describe('CsvTool', () => {
    describe('encodeValueCommas', () => {
        it('should encode commas within double quotes in a text', () => {
            const text = 'John,Doe,"Hello, World",42';
            const encodedText = encodeValueCommas(text);
            expect(encodedText).toBe('John,Doe,"Hello[valueComma] World",42');
        });

        it('should not encode commas outside of double quotes', () => {
            const text = 'John,Doe,Hello, World, 42';
            const encodedText = encodeValueCommas(text);
            expect(encodedText).toBe(text);
        });
    });

    describe('decodeValueCommas', () => {
        it('should decode encoded commas within double quotes in a text', () => {
            const text = 'John,Doe,"Hello[valueComma] World",42';
            const decodedText = decodeValueCommas(text);
            expect(decodedText).toBe('John,Doe,"Hello, World",42');
        });

        it('should not decode commas outside of double quotes', () => {
            const text = 'John,Doe,Hello, World,42';
            const decodedText = decodeValueCommas(text);
            expect(decodedText).toBe('John,Doe,Hello, World,42');
        });
    });

    describe('csvToJson', () => {
        it('should convert a CSV string to JSON object array', () => {
            const csv = 'name,age\nJohn,42\nJane,35';
            const json = csvToJson(csv);
            expect(json).toEqual([
                { name: 'John', age: '42' },
                { name: 'Jane', age: '35' }
            ]);
        });

        it('should convert a CSV string to JSON object array with key mapping', () => {
            const csv = 'name,age\nJohn,42\nJane,35';
            const map = { name: 'firstName', age: 'years' };
            const json = csvToJson(csv, map);
            expect(json).toEqual([
                { firstName: 'John', years: '42' },
                { firstName: 'Jane', years: '35' }
            ]);
        });
    });
});
