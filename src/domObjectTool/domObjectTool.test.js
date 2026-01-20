import { getPropertyValue, createFormData, getObjectId } from './domObjectTool.js';

describe('domObjectTool', () => {
    describe('getPropertyValue', () => {
        it('should return nested property value', () => {
            const obj = { a: { b: { c: 'value' } } };
            expect(getPropertyValue('a.b.c', obj)).toBe('value');
        });

        it('should return default value for undefined property', () => {
            const obj = { a: { b: {} } };
            expect(getPropertyValue('a.b.c', obj, 'default')).toBe('default');
        });

        it('should handle array path', () => {
            const obj = { a: { b: { c: 'value' } } };
            expect(getPropertyValue(['a', 'b', 'c'], obj)).toBe('value');
        });

        it('should return default value for deeply nested undefined property', () => {
            const obj = { a: {} };
            expect(getPropertyValue('a.b.c.d.e', obj, 'fallback')).toBe('fallback');
        });

        it('should handle single level property', () => {
            const obj = { name: 'test' };
            expect(getPropertyValue('name', obj)).toBe('test');
        });
    });

    describe('createFormData', () => {
        it('should create FormData from object', () => {
            const blob1 = new Blob(['content1'], { type: 'text/plain' });
            const blob2 = new Blob(['content2'], { type: 'text/plain' });
            const obj = {
                file1: blob1,
                file2: blob2
            };

            const formData = createFormData(obj);
            expect(formData).toBeInstanceOf(FormData);
            expect(formData.get('file1')).toBeInstanceOf(Blob);
            expect(formData.get('file2')).toBeInstanceOf(Blob);
            expect(formData.has('file1')).toBe(true);
            expect(formData.has('file2')).toBe(true);
        });

        it('should handle empty object', () => {
            const formData = createFormData({});
            expect(formData).toBeInstanceOf(FormData);
            expect(Array.from(formData.keys()).length).toBe(0);
        });

        it('should handle undefined parameter', () => {
            const formData = createFormData();
            expect(formData).toBeInstanceOf(FormData);
        });

        it('should handle multiple types of blobs', () => {
            const file = new File(['content'], 'test.txt', { type: 'text/plain' });
            const blob = new Blob(['data'], { type: 'application/json' });
            const obj = {
                file: file,
                data: blob
            };

            const formData = createFormData(obj);
            expect(formData.get('file')).toBeInstanceOf(File);
            expect(formData.get('data')).toBeInstanceOf(Blob);
            expect(formData.has('file')).toBe(true);
            expect(formData.has('data')).toBe(true);
        });
    });

    describe('getObjectId', () => {
        it('should return mechanized value property', () => {
            const obj = { value: 'Test Value' };
            expect(getObjectId(obj)).toBe('test-value');
        });

        it('should return mechanized id property', () => {
            const obj = { id: 'Test ID' };
            expect(getObjectId(obj)).toBe('test-id');
        });

        it('should return mechanized name property', () => {
            const obj = { name: 'Test Name' };
            expect(getObjectId(obj)).toBe('test-name');
        });

        it('should return mechanized title property', () => {
            const obj = { title: 'Test Title' };
            expect(getObjectId(obj)).toBe('test-title');
        });

        it('should prefer value over other properties', () => {
            const obj = { value: 'Value', id: 'ID', name: 'Name', title: 'Title' };
            expect(getObjectId(obj)).toBe('value');
        });

        it('should prefer id over name and title', () => {
            const obj = { id: 'ID', name: 'Name', title: 'Title' };
            expect(getObjectId(obj)).toBe('id');
        });

        it('should prefer name over title', () => {
            const obj = { name: 'Name', title: 'Title' };
            expect(getObjectId(obj)).toBe('name');
        });

        it('should use custom preferences order', () => {
            const obj = { title: 'Title', name: 'Name' };
            expect(getObjectId(obj, '-', ['title', 'name'])).toBe('title');
        });

        it('should generate id from object properties when no preferred property exists', () => {
            const obj = { foo: 'bar', baz: 123 };
            const result = getObjectId(obj);
            expect(result).toBeTruthy();
            expect(typeof result).toBe('string');
        });

        it('should use custom divider', () => {
            const obj = { foo: 'bar baz', qux: 'test' };
            const result = getObjectId(obj, '_');
            expect(typeof result).toBe('string');
        });

        it('should handle empty object', () => {
            const obj = {};
            const result = getObjectId(obj);
            expect(typeof result).toBe('string');
        });

        it('should ignore non-string and non-number values', () => {
            const obj = {
                str: 'string',
                num: 42,
                bool: true,
                null: null,
                undef: undefined,
                obj: {},
                arr: []
            };
            const result = getObjectId(obj);
            expect(result).toBeTruthy();
            expect(typeof result).toBe('string');
        });

        it('should trim string values', () => {
            const obj = { value: '  Spaced Value  ' };
            expect(getObjectId(obj)).toBe('spaced-value');
        });

        it('should sort keys for consistent ids', () => {
            const obj1 = { z: 'zebra', a: 'apple', m: 'mango' };
            const obj2 = { a: 'apple', m: 'mango', z: 'zebra' };
            expect(getObjectId(obj1)).toBe(getObjectId(obj2));
        });
    });
});
