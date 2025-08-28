/**
 * @typedef {import('./customElementTool.types.js').CustomElementConstructor} CustomElementConstructor
 */

const VERBOSE = false;

/**
 * Defines a custom element.
 * @param {string} name
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
