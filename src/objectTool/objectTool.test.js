/* eslint-disable id-length */
import { isObject, getPropertyValue, countProps, createFormData } from './objectTool';
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
