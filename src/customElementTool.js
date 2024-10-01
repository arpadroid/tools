import { dashedToCamel } from './stringTool.js';

/**
 * Checks if an element has a property as an attribute or defined in the configuration.
 * @param {HTMLElement} element - The element to check.
 * @param {string} name - The property name.
 * @param {Record<string, unknown>} [config] - The configuration object.
 * @returns {boolean | undefined} Whether the element has the property.
 */
export function hasProperty(element, name, config = element._config) {
    const attrVal = element.getAttribute(name);
    if (attrVal === 'false') {
        return false;
    }
    if (element.hasAttribute(name)) {
        return true;
    }
    if (typeof config[dashedToCamel(name)] !== 'undefined') {
        return config[dashedToCamel(name)];
    }
}

/**
 * Gets the value of a property from the element's configuration or attributes.
 * @param {HTMLElement} element - The element to get the property from.
 * @param {string} name - The property name.
 * @param {Record<string, unknown>} [config] - The configuration object.
 * @returns {string} The value of the property.
 */
export function getProperty(element, name, config = element._config ?? {}) {
    const configName = dashedToCamel(name);
    return element.getAttribute(name) ?? config[configName];
}

/**
 * Gets the value of a property from the element's configuration or attributes as an array.
 * @param {HTMLElement} element - The element to get the property from.
 * @param {string} name - The property name.
 * @param {Record<string, unknown>} [config] - The configuration object.
 * @returns {string[]} The value of the property as an array.
 */
export function getArrayProperty(element, name, config = element._config) {
    const value = getProperty(element, name, config);
    if (typeof value === 'string') {
        return value.split(',').map(item => item.trim());
    }
    return value;
}

export default {
    hasProperty,
    getProperty
};
