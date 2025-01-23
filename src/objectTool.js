/**
 * Counts the number of properties in an object.
 * @param {Record<string, unknown>} obj
 * @returns {number}
 */
export function countProps(obj) {
    return Object.keys(obj).length;
}

/**
 * Checks if an object is an object and not an array or HTMLElement.
 * @param {unknown} obj
 * @returns {boolean}
 */
export function isObject(obj) {
    return obj?.constructor?.name === 'Object';
}

/**
 * Checks if an object is empty.
 * @param {Record<string, unknown>} obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
    return isObject(obj) && countProps(obj) === 0;
}

/**
 * Merges two objects recursively.
 * @param {Record<string, any>} obj
 * @param {Record<string, any>} obj2
 * @param {boolean} strict - Strict mode will filter out properties that are not in the original object.
 * @returns {Record<string, any>}
 */
export function mergeObjects(obj = {}, obj2 = {}, strict = false) {
    if (Object.keys(obj2).length === 0) {
        return obj;
    }
    const rv = { ...obj };
    for (const [key, value] of Object.entries(obj2)) {
        const hasKeyInRv = key in rv;
        if (strict && !hasKeyInRv) {
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
 * Copies an object and its properties.
 * @param {Record<string, unknown>} object
 * @returns {Record<string, unknown>}
 */
export function copyObjectProps(object) {
    /**
     * @type {Record<string, unknown>}
     */
    const props = {};
    for (const [key, value] of Object.entries(object)) {
        if (Array.isArray(value)) {
            props[key] = [...value];
        } else if (isObject(value)) {
            // @ts-ignore
            props[key] = { ...value };
        } else {
            props[key] = value;
        }
    }
    return props;
}

/**
 * Return the value of a nested object property.
 * @param {string} path
 * @param {Record<string, unknown>} object
 * @param {unknown} defaultValue
 * @returns {unknown}
 */
export function getPropertyValue(path, object, defaultValue) {
    /** @type {string[]} */
    let frags = [];
    if (typeof path === 'string') {
        frags = path.split('.');
    } else if (Array.isArray(path)) {
        frags = path;
    }
    /** @type {Record<string, any>} */
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
 * Creates a FormData object from an object.
 * @param {Record<string, Blob>} obj
 * @returns {FormData}
 */
export function createFormData(obj = {}) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(obj)) {
        formData.append(key, value);
    }
    return formData;
}

/**
 * Binds methods to an object.
 * @param {Record<string, () => void>} obj
 * @param {...string} methods
 */
export function bind(obj, ...methods) {
    for (const method of methods) {
        obj[method] = obj[method].bind(obj);
    }
}

/**
 * Sorts an object by its keys.
 * @param {Record<string, unknown>} obj
 * @returns {Record<string, unknown>}
 */
export function sortKeys(obj) {
    /** @type {Record<string, unknown>} */
    const ordered = {};
    Object.keys(obj)
        .sort()
        .forEach(key => (ordered[key] = obj[key]));
    return ordered;
}
