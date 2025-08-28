/* eslint-disable sonarjs/no-ignored-exceptions */
/**
 * @typedef {import('../zoneTool/zoneTool.types').ElementType} ElementType
 * @typedef {import('../zoneTool/zoneTool.types').ComponentType} ComponentType
 * @typedef {import('../common.types').CallableType} CallableType
 * @typedef {import('./customElementTool.types.js').CustomElementChildOptionsType} CustomElementChildOptionsType
 * @typedef {import('./customElementTool.types.js').CustomElementConstructor} CustomElementConstructor
 */
import { destroyComponentZones } from '../zoneTool/zoneTool.js';

const VERBOSE = false;

/**
 * Destroys the zones of a component.
 * @param {ElementType} component - The component to destroy.
 */
export function onDestroy(component) {
    destroyComponentZones(component);
}

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
