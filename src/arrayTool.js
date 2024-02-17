/**
 * Returns a new array with unique values.
 * @param {Array} array - The input array.
 * @returns {Array} - The array with unique values.
 */
export function arrayUnique(array) {
    return [...new Set(array)];
}

/**
 * Checks if an array is empty.
 * @param {Array} array - The input array.
 * @returns {boolean} - True if the array is empty, false otherwise.
 */
export function arrayEmpty(array) {
    return Array.isArray(array) && array.length === 0;
}

/**
 * Converts each element in the array to a number.
 * @param {Array} array - The input array.
 * @returns {Array} - The array with each element converted to a number.
 */
export function arrayToNumbers(array) {
    return array.map(item => Number(item));
}

/**
 * Checks if two arrays are equal.
 * @param {Array} array1 - The first array.
 * @param {Array} array2 - The second array.
 * @returns {boolean} - True if the arrays are equal, false otherwise.
 */
export function areArraysEqual(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}
