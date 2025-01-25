import { rgbToHex, validateColor } from './colorTool';

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
        /**
         * The stringToHex function converts a color string to a hexadecimal color value.
         * @todo Add a test case for the stringToHex function.
         */
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
    });
});
