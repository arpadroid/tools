import { rgbToHex, validateColor, stringToHex } from './colorTool';
import { jest } from '@jest/globals';

describe('ColorTool', () => {
    describe('rgbToHex', () => {
        it('should convert RGB color value to hexadecimal color value', () => {
            const rgbColor = 'rgb(255, 0, 0)';
            const hexColor = rgbToHex(rgbColor);
            expect(hexColor).toBe('#ff0000');
        });

        it('should handle RGB color value with spaces', () => {
            const rgbColor = 'rgb( 0, 255, 0 )';
            const hexColor = rgbToHex(rgbColor);
            expect(hexColor).toBe('#00ff00');
        });
    });

    describe('stringToHex', () => {
        it('should convert named color to hexadecimal', () => {
            const hexColor = stringToHex('red');
            expect(hexColor).toBe('#ff0000');
        });

        it('should handle hex color values', () => {
            const hexColor = stringToHex('#00ff00');
            expect(hexColor).toBe('#00ff00');
        });

        it('should handle RGB color values', () => {
            const hexColor = stringToHex('rgb(0, 0, 255)');
            expect(hexColor).toBe('#0000ff');
        });

        it('should return original color if conversion fails', () => {
            // Mock getComputedStyle to throw an error
            const originalGetComputedStyle = window.getComputedStyle;
            window.getComputedStyle = jest.fn(() => {
                throw new Error('Mock error');
            });

            const result = stringToHex('invalid-color');
            expect(result).toBe('invalid-color');

            window.getComputedStyle = originalGetComputedStyle;
        });

        it('should handle transparent color', () => {
            const hexColor = stringToHex('transparent');
            expect(typeof hexColor).toBe('string');
        });
    });

    describe('validateColor', () => {
        it('should return true for valid color value', () => {
            expect(validateColor('#ff0000')).toBe(true);
            expect(validateColor('rgb(0, 255, 0)')).toBe(true);
            // expect(validateColor('hsl(120, 100%, 50%)')).toBe(true);
            // expect(validateColor('blue')).toBe(true);
        });

        it('should return false for invalid color value', () => {
            expect(validateColor('invalid-color')).toBe(false);
            expect(validateColor('#')).toBe(false);
            expect(validateColor('rgb(0, 255, 0, 0)')).toBe(false);
        });

        it('should return false for transparent', () => {
            expect(validateColor('transparent')).toBe(false);
        });

        it('should handle catch block for rgbToHex errors', () => {
            expect(validateColor('xyz')).toBe(false);
        });
    });
});
