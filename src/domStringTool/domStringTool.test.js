import { getSafeHtmlId } from './domStringTool.js';

describe('domStringTool', () => {
    beforeEach(() => {
        // Clear the safe IDs cache before each test
        if (typeof window !== 'undefined') {
            window.arpaSafeIDs = {};
        }
    });

    describe('getSafeHtmlId', () => {
        it('should generate a safe HTML ID', () => {
            const id = getSafeHtmlId('Test ID');
            expect(id).toBe('test-id');
        });
        it('should handle environment without window', () => {
            const originalWindow = global.window;
            delete global.window;
            const id = getSafeHtmlId('test-id');
            expect(id).toBe('test-id');
            global.window = originalWindow;
        });
        it('should mechanize the input string', () => {
            const id = getSafeHtmlId('Hello World!');
            expect(id).toMatch(/^[a-z0-9-]+$/);
        });

        it('should handle special characters', () => {
            const id = getSafeHtmlId('Test@#$%ID');
            expect(id).toMatch(/^[a-z0-9-]+$/);
        });

        it('should prevent duplicate IDs by appending number', () => {
            const id1 = getSafeHtmlId('test');
            const id2 = getSafeHtmlId('test');
            const id3 = getSafeHtmlId('test');

            expect(id1).toBe('test');
            expect(id2).toBe('test-1');
            expect(id3).toBe('test-2');
        });

        it('should track IDs in window.arpaSafeIDs', () => {
            const id = getSafeHtmlId('unique-id');
            
            if (typeof window !== 'undefined') {
                expect(window.arpaSafeIDs[id]).toBe(true);
            }
        });

        it('should handle empty string', () => {
            const id = getSafeHtmlId('');
            expect(typeof id).toBe('string');
        });

        it('should handle spaces', () => {
            const id = getSafeHtmlId('  spaced  id  ');
            expect(id).toBe('spaced-id');
        });

        it('should handle numbers', () => {
            const id = getSafeHtmlId('id123');
            expect(id).toBe('id123');
        });

        it('should handle mixed case', () => {
            const id = getSafeHtmlId('MixedCaseID');
            expect(id).toBe('mixedcaseid');
        });

        it('should handle consecutive special characters', () => {
            const id = getSafeHtmlId('test---id');
            expect(id).toMatch(/^[a-z0-9-]+$/);
        });

        it('should handle unicode characters', () => {
            const id = getSafeHtmlId('test-café-id');
            expect(typeof id).toBe('string');
        });

        it('should increment correctly for multiple duplicates', () => {
            const ids = [];
            for (let i = 0; i < 5; i++) {
                ids.push(getSafeHtmlId('duplicate'));
            }

            expect(ids[0]).toBe('duplicate');
            expect(ids[1]).toBe('duplicate-1');
            expect(ids[2]).toBe('duplicate-2');
            expect(ids[3]).toBe('duplicate-3');
            expect(ids[4]).toBe('duplicate-4');
        });

        it('should handle IDs that already end with numbers', () => {
            const id1 = getSafeHtmlId('test-1');
            const id2 = getSafeHtmlId('test-1');

            expect(id1).toBe('test-1');
            expect(id2).toBe('test-1-1');
        });

        it('should be idempotent for unique strings', () => {
            const input = 'unique-string';
            const id1 = getSafeHtmlId(input);
            
            // Clear and try again
            if (typeof window !== 'undefined') {
                window.arpaSafeIDs = {};
            }
            
            const id2 = getSafeHtmlId(input);
            expect(id1).toBe(id2);
        });
    });
});
