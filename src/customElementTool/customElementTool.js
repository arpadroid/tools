/* eslint-disable sonarjs/no-ignored-exceptions */
/**
 * @typedef {import('../zoneTool/zoneTool.types').ElementType} ElementType
 * @typedef {import('../zoneTool/zoneTool.types').ComponentType} ComponentType
 * @typedef {import('../common.types').CallableType} CallableType
 * @typedef {import('./customElementTool.types.js').CustomElementChildOptionsType} CustomElementChildOptionsType
 * @typedef {import('./customElementTool.types.js').CustomElementConstructor} CustomElementConstructor
 */
import { dashedToCamel } from '../stringTool/stringTool.js';
import { destroyComponentZones, hasZone } from '../zoneTool/zoneTool.js';
import { attrString } from '../htmlTool/htmlTool.js';

const VERBOSE = false;
const html = String.raw;

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
    if (typeof config[dashedToCamel(name)] !== 'undefined') {
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
    } catch (_error) {
        return config[configName];
    }
}

/**
 * Gets the value of a property from the element's configuration or attributes as an array.
 * @param {ElementType} element - The element to get the property from.
 * @param {string} name - The property name.
 * @param {Record<string, unknown>} [config] - The configuration object.
 * @returns {any[] | unknown} The value of the property as an array.
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
        const rv = element?.getProperty(property);
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

/**
 * Computes the class name for a child element.
 * @param {ComponentType} component - The component to check.
 * @param {string} name
 * @returns {string}
 */
function getChildClassName(component, name) {
    let className = '';
    const baseClass = component?.getClassName() || '';
    baseClass && (className += `${baseClass}__`);
    className += dashedToCamel(name);
    return className;
}
/**
 * Renders a child element.
 * @param {ComponentType | any} component - The component to check.
 * @param {string} name - The name of the child.
 * @param {CustomElementChildOptionsType} [config] - The configuration object.
 * @returns {boolean}
 */
export function canRenderChild(component, name, config = {}) {
    if (typeof config.canRender === 'function' && config.canRender(component)) {
        return true;
    }
    return hasContent(component, name);
}

/**
 * Renders a child element.
 * @param {ComponentType | any} component - The component to check.
 * @param {string} name - The name of the child.
 * @param {CustomElementChildOptionsType} [config] - The configuration object.
 * @returns {string}
 */
export function renderChild(component, name, config = {}) {
    if (!canRenderChild(component, name, config)) return '';
    const {
        tag = 'div',
        attr = {},
        hasZone = true,
        zoneName = name,
        propName = name,
        className = getChildClassName(component, name),
        content = getProperty(component, propName) || ''
    } = config;
    className && (attr.class = className);
    hasZone && (attr.zone = zoneName);
    return html`<${tag} ${attrString(attr)}>${content}</${tag}>`;
}

/**
 * Defines a custom element.
 * @param {string} name - The name of the element.
 * @param {CustomElementConstructor} component
 * @param {Record<string, unknown>} [options]
 */
export function defineCustomElement(name, component, options = {}) {
    if (!customElements.get(name)) {
        customElements.define(name, component, options);
    } else if (VERBOSE) {
        console.warn(
            `Custom element ${name} already exists. You are probably loading duplicate code or some conflicting libraries`,
            { name, component, options }
        );
    }
}
