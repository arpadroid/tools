/* eslint-disable sonarjs/no-ignored-exceptions */
/** @type {HTMLElement} */
let colorNode;

/**
 * Returns an HTML node used for color validation and other calculations.
 * @returns {HTMLElement}
 */
function getColorNode() {
    if (!colorNode) {
        colorNode = document.createElement('div');
        colorNode.style.display = 'none';
        document.body.appendChild(colorNode);
    }
    colorNode.style.backgroundColor = 'transparent';
    return colorNode;
}

/**
 * Converts an RGB color value to a hexadecimal color value.
 * @param {string} rgb - The RGB color value to convert.
 * @returns {string} - The hexadecimal color value.
 */
export function rgbToHex(rgb) {
    const hex = rgb
        .replace(/\s/g, '')
        .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
        ?.slice(1)
        .map(part => parseInt(part, 10).toString(16).padStart(2, '0'))
        .join('');
    return hex ? `#${hex}` : '';
}

/**
 * Converts a color string to a hexadecimal color value.
 * @param {string} color - The color string to convert.
 * @returns {string} - The hexadecimal color value.
 */
export function stringToHex(color) {
    const node = getColorNode();
    node.style.backgroundColor = color;
    try {
        return rgbToHex(window.getComputedStyle(node).backgroundColor);
    } catch (_err) {
        return color;
    }
}

/**
 * Validates a style color value.
 * @param {string} value - The color value to validate.
 * @returns {boolean} - True if the color value is valid, false otherwise.
 */
export function validateColor(value) {
    const node = getColorNode();
    node.style.backgroundColor = value;
    const color = window.getComputedStyle(node).backgroundColor;
    const blackColors = ['black', 'rgb(0, 0, 0)', '#000000'];
    if (color === 'transparent' || (blackColors.includes(color) && !blackColors.includes(value))) {
        return false;
    }
    try {
        const hex = rgbToHex(color);
        return Boolean(hex);
    } catch (_err) {
        return false;
    }
}
