import { arrayUnique, arrayEmpty, arrayToNumbers, areArraysEqual } from './arrayTool';
describe('ArrayTool', () => {
    describe('arrayUnique', () => {
        it('should return an array with unique values', () => {
            expect(arrayUnique([1, 2, 3, 2, 4])).toEqual([1, 2, 3, 4]);
            expect(arrayUnique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
            expect(arrayUnique([])).toEqual([]);
        });
    });

    describe('arrayEmpty', () => {
        it('should return true if the array is empty', () => {
            expect(arrayEmpty([])).toBe(true);
            expect(arrayEmpty([1, 2, 3])).toBe(false);
        });
    });

    describe('arrayToNumbers', () => {
        it('should convert each element in the array to a number', () => {
            expect(arrayToNumbers(['1', '2', '3'])).toEqual([1, 2, 3]);
            expect(arrayToNumbers(['4', '5', '6'])).toEqual([4, 5, 6]);
            expect(arrayToNumbers([])).toEqual([]);
        });
    });

    describe('arraysAreEqual', () => {
        it('should return true if the arrays are equal', () => {
            expect(areArraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
            expect(areArraysEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
        });

        it('should return false if the arrays are not equal', () => {
            expect(areArraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
            expect(areArraysEqual(['a', 'b', 'c'], ['a', 'b', 'd'])).toBe(false);
        });
    });
});
