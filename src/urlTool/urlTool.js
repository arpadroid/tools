/**
 * Extracts query string parameters from a string and returns them in an object.
 * @param {string} url - A URL string or a query string.
 * @returns {Record<string, any>} - An object representing the query string parameters.
 */
export function getURLParams(url) {
    const queryString = url.includes('?') ? url.split('?')[1].split('#')[0] : url;
    if (!queryString) return {};
    /** @type {Record<string, any>} */
    const params = {};
    const queryParts = queryString.split('&');
    queryParts[0].startsWith('http') && queryParts.shift();

    for (const part of queryParts) {
        const [key, value = ''] = part.split('=');
        const decodedKey = decodeURIComponent(key);
        const decodedValue = decodeURIComponent(value);
        const arrayMatch = decodedKey.match(/^(.+)\[\d*\]$/);
        if (arrayMatch) {
            const arrayKey = arrayMatch[1];
            if (!params[arrayKey]) {
                params[arrayKey] = [];
            }
            Array.isArray(params[arrayKey]) && params[arrayKey].push(decodedValue);
        } else {
            params[decodedKey] = decodedValue;
        }
    }
    return params;
}

/**
 * Transforms an array into a URL query string.
 * @param {string} propName - The name of the property.
 * @param {string[]} array - The array to be converted into a query string.
 * @param {boolean} encode - Whether or not to encode the query string values.
 * @returns {string} - A URL query string.
 */
export function arrayToQueryString(propName, array = [], encode = true) {
    let str = '';
    array.forEach(item => {
        if (encode) {
            str += `${encodeURIComponent(propName)}[]=${encodeURIComponent(item)}&`;
        } else {
            str += `${propName}[]=${item}&`;
        }
    });
    return str.substring(0, str.length - 1);
}

/**
 * Decodes a URI component safely.
 * @param {string} value - The value to be decoded.
 * @returns {string} - The decoded value.
 */
export function decodeURIComponentSafe(value) {
    if (!value || typeof value !== 'string') {
        return value;
    }
    return decodeURIComponent(value.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25'));
}

/**
 * Checks if two URLs are equal.
 * @param {string} url1 - The first URL.
 * @param {string} url2 - The second URL.
 * @returns {boolean} - True if the URLs are equal, false otherwise.
 */
export function areUrlsEqual(url1, url2) {
    const path1 = url1.split('?')[0];
    const path2 = url2.split('?')[0];
    const params1 = JSON.stringify(getURLParams(url1));
    const params2 = JSON.stringify(getURLParams(url2));
    return path1 === path2 && params1 === params2;
}

/**
 * Removes the last slash from a path.
 * @param {string} path - A path string.
 * @returns {string} - The path without the last slash.
 */
export function removeLastSlash(path) {
    return path.replace(/\/$/, '');
}

/**
 * Sanitizes the path.
 * @param {string} path - A path string.
 * @returns {string} - The sanitized path.
 */
export function sanitizePath(path) {
    return removeLastSlash(path.replace(/\/\//g, '/'));
}

/**
 * Removes the origin from a URL.
 * @param {string} url - A URL string.
 * @returns {string | undefined} - The URL without the origin.
 */
export function removeURLOrigin(url = window?.location?.href) {
    try {
        const _url = new URL(url);
        return url.replace(_url.origin, '');
    } catch (error) {
        return url.replace(window.location.origin, '');
    }
}

/**
 * Sanitizes the URL.
 * @param {string} url - A URL string.
 * @returns {string} - The sanitized URL.
 */
export function sanitizeURL(url) {
    const urlWithoutOrigin = removeURLOrigin(url) || '';
    return sanitizePath(urlWithoutOrigin);
}

/**
 * Returns the current path.
 * @param {string} url - A URL string.
 * @returns {string} - The current path.
 */
export function getURLPath(url = window.location.href) {
    return sanitizeURL(url.split('?')[0]) || '/';
}

/**
 * Gets a specific query string parameter value from a URL.
 * @param {string} name - The name of the query string parameter.
 * @param {string} url - A URL string.
 * @returns {string | undefined} - The value of the query string parameter.
 */
export function getURLParam(name, url = window.location.href) {
    let value;
    const params = getURLParams(url);
    const $name = params[name];
    if (params && typeof $name !== 'undefined') {
        value = decodeURIComponentSafe($name);
    }
    return value;
}

/**
 * Matches a URL against a route.
 * @param {string} url - Any URL.
 * @param {string} route - An array of routes to match against.
 * @returns {boolean} - True if there is a match, false otherwise.
 */
export function matchPath(url, route) {
    const path = getURLPath(url);
    const pathParts = path.split('/').filter(part => part !== '');
    const routeParts = route.split('/').filter(part => part !== '');
    if (pathParts.length !== routeParts.length) {
        return false;
    }
    for (let index = 0; index < routeParts.length; index++) {
        const paramIndex = routeParts[index].indexOf(':');
        if (routeParts[index] !== pathParts[index] && paramIndex !== 0) {
            return false;
        }
    }
    return true;
}

/**
 * Matches a URL against multiple routes.
 * @param {string} url - Any URL.
 * @param {string[]} routes - An array of routes to match against.
 * @returns {boolean} - True if there is a match, false otherwise.
 */
export function matchPaths(url, routes) {
    for (const route of routes) {
        if (typeof route === 'string' && matchPath(url, route)) {
            return true;
        }
    }
    return false;
}

/**
 * Returns the parts of the current path.
 * @param {string} url - A URL string.
 * @returns {string[]} - The parts of the current path.
 */
export function getPathParts(url = window.location.href) {
    return getURLPath(url)
        .split('/')
        .filter(part => part !== '');
}

/**
 * Transforms an object into a URL query string.
 * @param {Record<string, unknown>} object - An object with properties to be converted into a query string.
 * @param {boolean} encode - Whether or not to encode the query string values.
 * @returns {string} - A URL query string.
 */
export function objectToQueryString(object = {}, encode = true) {
    let rv = '?';
    for (const prop in object) {
        if (!Object.prototype.hasOwnProperty.call(object, prop) || prop === '') {
            continue;
        }
        const val = (object[prop] || '')?.toString() || '';
        if (val.constructor === Array) {
            rv += arrayToQueryString(prop, val, encode);
        } else if (encode) {
            rv += encodeURIComponent(prop) + '=' + encodeURIComponent(val) + '&';
        } else {
            rv += prop + '=' + val + '&';
        }
    }
    rv = rv.substring(0, rv.length - 1);
    return rv;
}

/**
 * Edits the query in a URL. This function is designed to work with any kind of string, not necessarily a valid URL format that includes a protocol, such as the one required by the native JS URL constructor, which does not handle relative URLs.
 * Unlike URLSearchParams constructor, this function accepts a full URL and will not encode the path.
 * @param {string} url - A URL string.
 * @param {Record<string, unknown>} params - A set of parameters representing query string values that must be edited in the URL.
 * @param {boolean} encode - Whether or not to encode the query string values.
 * @returns {string} - A new URL string with query string parameters based on the params object.
 */
export function editURL(url, params = {}, encode = true) {
    let rv = url;
    const urlParts = url.split('?');
    /** @type {Record<string, unknown>} */
    const queryObject = getURLParams(url) || {};
    rv = urlParts[0];
    for (const param in params) {
        if (!Object.prototype.hasOwnProperty.call(params, param)) {
            continue;
        }
        if (params[param] === null || typeof params[param] === 'undefined') {
            delete queryObject[param];
            continue;
        }
        queryObject[param] = params[param];
    }
    rv += objectToQueryString(queryObject, encode);
    return rv;
}

/**
 * Removes a specific query string parameter from a URL.
 * @param {string} name - The name of the query string parameter to remove.
 * @param {string} url - A URL string.
 * @returns {string} - A new URL string without the specified query string parameter.
 */
export function removeURLParam(name, url) {
    if (typeof url !== 'string') {
        url = window.location.href;
    }
    const urlParts = url.split('?');
    const rv = urlParts[0];
    /** @type {Record<string, unknown>} */
    const params = getURLParams(url);
    const newParams = Object.keys(params)
        .filter(key => key !== name)
        .reduce((obj, key) => {
            return Object.assign(obj, {
                [key]: params[key]
            });
        }, {});
    return rv + objectToQueryString(newParams);
}

/**
 * Returns the parent path of given url.
 * @param {string} url - A URL string.
 * @returns {string} - The parent path of the given url.
 */
export function getParentPath(url) {
    const path = getURLPath(url);
    const parts = path.split('/');
    parts.pop();
    return parts.join('/');
}
