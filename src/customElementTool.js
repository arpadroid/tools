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
 * Observes the content of a node and calls a callback when its loaded.
 * @param {Node} targetNode - The node to observe.
 * @param {Function} callback - The callback to call when the content is loaded.
 * @returns {Promise<boolean>} A promise that resolves when the content is loaded.
 */
export function onContentLoaded(targetNode, callback) {
    return new Promise(resolve => {
        if (!targetNode) {
            return resolve(true);
        }
        const config = { childList: true, subtree: true };
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    typeof callback === 'function' && callback();
                    resolve(true);
                    observer.disconnect();
                }
            }
        });
        observer.observe(targetNode, config);
    });
}

/**
 * Removes a node if it is empty.
 * @param {Node} node - The node to remove if empty.
 */
export function removeIfEmpty(node) {
    const originalContent = node?._childNodes;
    if (originalContent?.length) {
        return;
    }
    if (node?.textContent?.trim() === '') {
        node.remove();
    }
}

export default {
    hasProperty,
    getProperty,
    onContentLoaded,
    removeIfEmpty
};
