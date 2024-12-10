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

/**
 * Sorts an array of objects by a specified key.
 * @param {Array} array - The input array.
 * @param {string} key - The key to sort by.
 * @param {string} direction - The sort direction.
 * @returns {Array} - The sorted array.
 */
export function sortObjectArrayByKey(array, key, direction = 'asc') {
    if (!key) return array;
    return array.sort((itemA, itemB) => {
        const aVal = itemA[key];
        const bVal = itemB[key];
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

/**
 * Searches an array of objects for a query within specified fields and returns the results.
 * @param {Array} array - The input array.
 * @param {string} query - The search query.
 * @param {Array} searchFields - The fields to search.
 * @returns {Array} - The filtered array.
 */
export function searchObjectArray(array = [], query, searchFields = ['name']) {
    if (!query) return [...array];
    return array.filter(item =>
        searchFields.some(field => item[field].toLowerCase().includes(query.toLowerCase()))
    );
}

/**
 * Paginates an array.
 * @param {Array} array - The input array.
 * @param {number} perPage - The number of items per page.
 * @param {number} page - The current page.
 * @returns {Array} - The paginated array.
 */
export function paginateArray(array = [], perPage = 10, page = 1) {
    const start = (page - 1) * perPage;
    return array.slice(start, start + perPage);
}
