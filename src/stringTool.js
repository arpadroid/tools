/**
 * Converts a dashed string to camel case.
 * @param {string} str - The dashed string.
 * @returns {string} The camel case string.
 */
export function dashedToCamel(str) {
    const parts = str.split('-');
    for (let i = 1; i < parts.length; i++) {
        parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
    }
    return parts.join('');
}

/**
 * Converts a camel case string to dashed.
 * @param {string} str - The camel case string.
 * @returns {string} The dashed string.
 */
export function camelToDashed(str) {
    return str.replace(/([A-Z])/g, group => '-' + group.toLowerCase());
}

/**
 * Converts the first character of a string to uppercase.
 * @param {string} str - The input string.
 * @returns {string} The string with the first character in uppercase.
 */
export function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts the first character of a string to lowercase.
 * @param {string} str - The input string.
 * @returns {string} The string with the first character in lowercase.
 */
export function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Truncates a string to a specified length.
 * @param {string} str - The input string.
 * @param {number} length - The maximum length of the truncated string.
 * @returns {string} The truncated string.
 */
export function truncate(str, length) {
    if (length >= str.length) {
        return str;
    }
    return str.slice(0, length) + ' ...';
}

/**
 * Removes unsafe characters from a string to create a safe ID.
 * @param {string} str - The input string.
 * @returns {string} The safe ID string.
 */
export function getSafeID(str) {
    return str
        .toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, '')
        .replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Parses email addresses from a string.
 * @param {string} str - The input string.
 * @returns {string[]} An array of parsed email addresses.
 */
export function parseOutlookEmails(str) {
    const regex = /<([^\s<>@]+@?[^\s<>@]+)>/g;
    let rv = Array.from(str.matchAll(regex), match => match[1]);
    if (!rv?.length) {
        rv = str.replace(/[;]/g, ' ').replace(/[,]/g, ' ').split(/\s+/);
    }
    return rv.filter(email => email.includes('@'));
}

const memoizedMechanize = {};
/**
 * Converts a string to a URL-friendly format, with memoization for faster lookup.
 * @param {string} str - The input string.
 * @returns {string} The URL-friendly string.
 */
export function mechanize(str = '') {
    if (memoizedMechanize[str]) {
        return memoizedMechanize[str];
    }

    const result = str
        .toString()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w\-]/g, '') // Remove non-alphanumeric characters except hyphens/underscores
        .toLowerCase();

    memoizedMechanize[str] = result;
    return result;
}

window.arpaSafeIDs = {};
/**
 * Generates a safe HTML ID with minimal re-computation.
 * @param {string} _id - The input string.
 * @returns {string} The safe HTML ID.
 */
export function getSafeHtmlId(_id) {
    let id = mechanize(_id);
    const originalId = id;
    let index = 1;

    // Check for duplicates and append a number if necessary
    while (window.arpaSafeIDs[id]) {
        id = `${originalId}-${index++}`;
    }

    window.arpaSafeIDs[id] = true;
    return id;
}

/**
 * Removes white spaces from a string.
 * @param {string} str - The input string.
 * @returns {string} The string without white spaces.
 */
export function removeWhiteSpace(str) {
    return str.replace(/\s/g, '');
}

/**
 * Removes slashes from the beginning and end of a string.
 * @param {string} str - The input string.
 * @returns {string} The string without slashes.
 */
export function removeSlashes(str) {
    return str?.replace(/^\/+|\/+$/g, '');
}

/**
 * Extracts the currency symbol from a string.
 * @param {string} str - The input string.
 * @returns {string|null} The currency symbol or null if not found.
 */
export function extractCurrency(str) {
    const pattern = /[\£\$\€]{1}/g;
    const matches = str.match(pattern);
    return matches?.length ? matches[0] : null;
}

/**
 * Sanitizes a search input by removing special characters and limiting the length.
 * @param {string} str - The input string.
 * @returns {string} The sanitized search input.
 */
export function sanitizeSearchInput(str) {
    return str.replace(/[^\w\s]/gi, '').slice(0, 50);
}

/**
 * Retrieves the initials from a string.
 * @param {string} str - The input string.
 * @returns {string} The initials.
 */
export function getInitials(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();
}

/**
 * Converts a string to seconds.
 * @param {string} str - The input string.
 * @returns {number} - Seconds.
 */
export function timeStringToSeconds(str) {
    const parts = str.split(':');
    const multipliers = [3600, 60, 1];
    let seconds = 0;
    parts.forEach((part, index) => (seconds += parseFloat(part) * multipliers[index]));
    return seconds;
}
