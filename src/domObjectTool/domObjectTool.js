// Re-export all isomorphic object functions from @arpadroid/tools-iso

import { mechanize } from '@arpadroid/tools-iso';

// Browser-specific functions (kept in this package)

/**
 * Return the value of a nested object property.
 * @param {string} path
 * @param {Record<string, unknown>} object
 * @param {unknown} defaultValue
 * @returns {unknown | Record<string, unknown>}
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
    let obj = object || (typeof window !== 'undefined' ? window : {});
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
 * Creates an id based in an object's properties.
 * Browser-friendly convenience function.
 * @param {Record<string, unknown>} obj
 * @param {string} divider
 * @param {string[]} preferences
 * @returns {string}
 */
export function getObjectId(obj, divider = '-', preferences = ['value', 'id', 'name', 'title']) {
    for (const preference of preferences) {
        const pref = /** @type {string} */ obj[preference];
        if (typeof pref === 'string') {
            return mechanize(pref);
        }
    }
    // Sort keys inline
    /** @type {Record<string, unknown>} */
    const ordered = {};
    Object.keys(obj)
        .sort()
        .forEach(key => (ordered[key] = obj[key]));
    
    /** @type {string[]} */
    const parts = [];
    Object.keys(ordered).forEach(key => {
        const val = ordered[key];
        if (typeof val === 'string' || typeof val === 'number') {
            parts.push(String(val).trim());
        }
    });
    return mechanize(parts.join(divider));
}
