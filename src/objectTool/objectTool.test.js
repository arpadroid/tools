/* eslint-disable id-length */
import { isObject, mergeObjects, getPropertyValue, countProps, createFormData } from './objectTool';
describe('Object Tool', () => {
    describe('isObject', () => {
        test('should return true for an object', () => {
            expect(isObject({})).toBe(true);
        });

        test('should return false for an array', () => {
            expect(isObject([])).toBe(false);
        });

        test('should return false for an HTMLElement', () => {
            expect(isObject(document.createElement('div'))).toBe(false);
        });
    });

    describe('mergeObjects', () => {
        test('should merge two objects recursively', () => {
            const obj1 = { a: 1, string: 'string', b: { c: 2, d: ['a'] } };
            const obj2 = { b: { e: 3, c: 1, d: ['b'] }, string: 'stringUpdated' };
            const merged = mergeObjects(obj1, obj2);
            expect(merged).toEqual({ a: 1, b: { e: 3, c: 1, d: ['b'] }, string: 'stringUpdated' });
        });

        test('should filter out properties not in the original object in strict mode', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 3, c: 4 };
            const merged = mergeObjects(obj1, obj2, true);
            expect(merged).toEqual({ a: 1, b: 3 });
        });
    });

    describe('get', () => {
        test('should return the value of a nested object property', () => {
            const obj = { a: { b: { c: 1 } } };
            expect(getPropertyValue('a.b.c', obj)).toBe(1);
        });

        test('should return the default value if the property does not exist', () => {
            const obj = { a: { b: { c: 1 } } };
            expect(getPropertyValue('a.b.d', obj, 'default')).toBe('default');
        });
    });

    describe('countProps', () => {
        test('should return the number of properties in an object', () => {
            const obj = { a: 1, b: 2, c: 3 };
            expect(countProps(obj)).toBe(3);
        });

        test('should return 0 for an empty object', () => {
            expect(countProps({})).toBe(0);
        });
    });

    describe('createFormData', () => {
        test('should create a FormData object from an object', () => {
            const obj = { name: 'John', age: 30 };
            const formData = createFormData(obj);
            expect(formData.get('name')).toBe('John');
            expect(formData.get('age')).toBe('30');
        });

        test('should create an empty FormData object if no object is provided', () => {
            const formData = createFormData();
            expect(formData instanceof FormData).toBe(true);
            expect(formData.entries().next().done).toBe(true);
        });
    });
});
