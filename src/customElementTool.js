/**
 * @typedef {import('./zoneTool.types').ElementType} ElementType
 * @typedef {import('./common.types').CallableType} CallableType
 */
import { dashedToCamel } from './stringTool.js';
import { destroyComponentZones, hasZone } from './zoneTool.js';

/**
 * Checks if an element has a property as an attribute or defined in the configuration.
 * @param {ElementType} element - The element to check.
 * @param {string} name - The property name.
 * @param {Record<string, unknown>} [config] - The configuration object.
 * @returns {unknown | undefined} Whether the element has the property.
 */
export function hasProperty(element, name, config = element._config) {
    const attrVal = element.getAttribute(name);
    if (attrVal === 'false') {
        return false;
    }
    if (element.hasAttribute(name)) {
        return true;
    }
    if (config && typeof config[dashedToCamel(name)] !== 'undefined') {
        return config[dashedToCamel(name)];
    }
}

/**
 * Gets the value of a property from the element's configuration or attributes.
 * @param {ElementType} element - The element to get the property from.
 * @param {string} name - The property name.
 * @param {Record<string, unknown>} [config] - The configuration object.
 * @returns {string | unknown} The value of the property.
 */
export function getProperty(element, name, config = element._config ?? {}) {
    const configName = dashedToCamel(name);
    /** @todo Try to remove the try / catch. */
    try {
        return element.getAttribute(name) ?? config[configName];
    } catch (error) {
        return config[configName];
    }
}

/**
 * Gets the value of a property from the element's configuration or attributes as an array.
 * @param {ElementType} element - The element to get the property from.
 * @param {string} name - The property name.
 * @param {Record<string, unknown>} [config] - The configuration object.
 * @returns {(string | number | unknown)[]} The value of the property as an array.
 */
export function getArrayProperty(element, name, config = element._config) {
    const value = getProperty(element, name, config);
    if (typeof value === 'string') {
        return value.split(',').map(item => item.trim());
    }
    return value;
}

/**
 * Checks if an element has content.
 * @param {CallableType} element
 * @param {string} property
 * @returns {boolean}
 */
export function hasContent(element, property) {
    if (typeof element?.getProperty === 'function') {
        const rv = element.getProperty(property);
        if (typeof rv === 'string' && rv.length) {
            return true;
        }
    }
    return hasZone(element, property);
}

/**
 * Destroys the zones of a component.
 * @param {ElementType} component - The component to destroy.
 */
export function onDestroy(component) {
    destroyComponentZones(component);
}

export default {
    hasProperty,
    getProperty
};

/**
 * Checks if a component can render.
 * @param {ElementType | any} component - The component to check.
 * @param {number} timeout
 * @returns {boolean} Whether the component can render.
 */
export function canRender(component, timeout = 200) {
    if (
        component._hasRendered &&
        component?._lastRendered &&
        component._lastRendered - Date.now() < timeout
    ) {
        console.warn('Stopped component from rerendering too fast', component);
        return false;
    }
    component._lastRendered = Date.now();
    return true;
}
