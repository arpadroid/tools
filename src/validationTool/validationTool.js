import { validateColor } from '../colorTool/colorTool';
import RegexTool from '../regexTool/regexTool';
import { removeSlashes } from '../stringTool/stringTool';

/**
 * Checks if a value is required.
 * @param {unknown} value - The value to be checked.
 * @returns {boolean} - True if the value is required, false otherwise.
 */
export function validateRequired(value) {
    return Boolean(
        typeof value === 'boolean' ||
            (typeof value === 'string' && value.length) ||
            (Array.isArray(value) && value.length) ||
            (typeof value === 'object' && value !== null && Object.keys(value).length) ||
            (typeof value === 'number' && !isNaN(value))
    );
}

/**
 * Checks if a value has a maximum length.
 * @param {string | number | unknown[]} value - The value to be checked.
 * @param {number} maxLength - The maximum length allowed.
 * @returns {boolean | undefined} - True if the value has a maximum length, false otherwise.
 */
export function validateMaxLength(value, maxLength) {
    if (typeof value === 'number') {
        return value <= Number(maxLength);
    }
    if (value?.length) {
        return value.length <= Number(maxLength);
    }
}

/**
 * Checks if a value has a minimum length.
 * @param {string | number | unknown[]} value - The value to be checked.
 * @param {number} minLength - The minimum length allowed.
 * @returns {boolean | undefined} - True if the value has a minimum length, false otherwise.
 */
export function validateMinLength(value, minLength) {
    if (typeof value === 'number') {
        return value >= Number(minLength);
    }
    if (value?.length) {
        return value.length >= Number(minLength);
    }
}

/**
 * Checks if a value has a specific length.
 * @param {string | []} value - The value to be checked.
 * @param {number} length - The specific length to be checked against.
 * @returns {boolean | undefined} - True if the value has the specific length, false otherwise.
 */
export function validateLength(value, length) {
    if (value?.length) {
        return value.length === Number(length);
    }
    if (typeof value === 'number') {
        return value === Number(length);
    }
}

/**
 * Checks if a value has a size within a range.
 * @param {string | number} value - The value to be checked.
 * @param {number[]} size - The range of sizes allowed.
 * @returns {boolean} - True if the value has a size within the range, false otherwise.
 */
export function validateSize(value, size) {
    if (isNaN(size[0]) || isNaN(size[1]) || !size?.length) {
        return true;
    }
    return Boolean(validateMaxLength(value, size[1]) && validateMinLength(value, size[0]));
}

/**
 * Checks if a value matches a regular expression.
 * @param {*} value - The value to be checked.
 * @param {string|RegExp} _regex - The regular expression to be used for matching.
 * @returns {boolean} - True if the value matches the regular expression, false otherwise.
 */
export function validateRegex(value, _regex) {
    let regex = _regex;
    const preset = typeof regex === 'string' ? RegexTool[regex] : undefined;
    preset && (regex = preset);
    // eslint-disable-next-line security/detect-non-literal-regexp
    regex = new RegExp(removeSlashes(regex.toString()));
    return regex?.test(value?.toString());
}

/**
 * Checks if a value is a number.
 * @param {*} _value - The value to be checked.
 * @returns {boolean} - True if the value is a number, false otherwise.
 */
export function validateNumber(_value) {
    let value = _value;
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    return !isNaN(value);
}

/**
 * Checks if a value is a valid color.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - True if the value is a valid color, false otherwise.
 */
export function validateColour(value) {
    return validateColor(value);
}
