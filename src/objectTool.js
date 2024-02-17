/**
 * Checks if an object is an object and not an array or HTMLElement.
 * @param {unknown} obj
 * @returns {boolean}
 */
export function isObject(obj) {
    return obj?.constructor?.name === 'Object';
}

/**
 * Merges two objects recursively.
 * @param {Record<string, unknown>} obj
 * @param {Record<string, unknown>} obj2
 * @param {boolean} strict - Strict mode will filter out properties that are not in the original object.
 * @returns {Record<string, unknown>}
 */
export function mergeObjects(obj = {}, obj2 = {}, strict = false) {
    const rv = { ...obj };
    for (const [key, value] of Object.entries(obj2)) {
        if (strict && !rv.hasOwnProperty(key)) {
            continue;
        }
        if (isObject(value) && isObject(rv[key])) {
            rv[key] = mergeObjects(rv[key], value, strict);
        } else {
            rv[key] = value;
        }
    }
    return rv;
}

/**
 * Return the value of a nested object property.
 * @param {string} path
 * @param {Record<string, unknown>} object
 * @param {unknown} defaultValue
 * @returns {unknown}
 */
export function getPropertyValue(path, object, defaultValue) {
    let frags = [];
    if (typeof path === 'string') {
        frags = path.split('.');
    } else if (typeof path.length !== 'undefined') {
        frags = path;
    }
    let obj = object || window;
    for (let index = 0; index < frags.length; index++) {
        if (typeof obj[frags[index]] == 'undefined') {
            return defaultValue;
        }
        obj = obj[frags[index]];
    }
    return obj;
}

/**
 * Counts the number of properties in an object.
 * @param {{}} obj
 * @returns {number}
 */
export function countProps(obj) {
    return Object.keys(obj).length;
}

/**
 * Creates a FormData object from an object.
 * @param {{}} obj
 * @returns {FormData}
 */
export function createFormData(obj = {}) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(obj)) {
        formData.append(key, value);
    }
    return formData;
}
