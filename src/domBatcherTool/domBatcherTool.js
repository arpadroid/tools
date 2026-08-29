/**
 * @typedef {import('./domBatcherTool.types').BatchWriteType} BatchWriteType
 * @typedef {import('./domBatcherTool.types').WriteType} WriteType
 * @typedef {import('./domBatcherTool.types').DomBatcherToolConfigType} DomBatcherToolConfigType
 * @typedef {import('./domBatcherTool.types').BatchWriteMapType} BatchWriteMapType
 * @typedef {import('./domBatcherTool.types').BatchValueType} BatchValueType
 * @typedef {import('./domBatcherTool.types').PropWriteType} PropWriteType
 */
import { isObject, mergeObjects } from '@arpadroid/tools-iso';
import { attr } from '../nodeTool/nodeTool.js';

export class DomBatcherTool {
    /** @type {BatchWriteMapType} */
    writes = new Map();

    constructor(config = {}) {
        this.setConfig(config);
    }

    /**
     * Sets the configuration for the DomBatcherTool component.
     * @param {DomBatcherToolConfigType} config
     */
    setConfig(config) {
        /** @type {DomBatcherToolConfigType} */
        this._config = mergeObjects(this.getDefaultConfig(), config);
    }

    /**
     * Returns the default configuration for the DomBatcherTool component.
     * @returns {DomBatcherToolConfigType}
     */
    getDefaultConfig() {
        /** @type {DomBatcherToolConfigType} */
        const config = {
            batchSize: 80,
            timeout: 0
        };
        return config;
    }

    /**
     * Returns the default write configuration for an element.
     * @param {Element} element
     * @returns {BatchWriteType}
     */
    getDefaultWrite(element) {
        let resolve;
        let reject;
        /** @type {BatchWriteType} */
        const rv = {
            attributes: {},
            element,
            methods: {
                append: new Set(),
                prepend: new Set(),
                remove: false,
                removeAttribute: {},
                setAttribute: {}
            },
            promise: new Promise((_resolve, _reject) => {
                resolve = _resolve;
                reject = _reject;
            })
        };
        rv.resolve = resolve;
        rv.reject = reject;
        return rv;
    }

    /**
     * @param {Element} element
     * @returns {BatchWriteType}
     */
    getWrite(element) {
        return this.writes.get(element) || this.getDefaultWrite(element);
    }

    /**
     * Handles method writes for a given write object.
     * @param {BatchWriteType} write
     * @param {WriteType} config
     */
    handleMethodWrite(write, config = {}) {
        const { method, value = '' } = config;
        const methodName = /** @type {keyof BatchWriteType['methods']} */ (method);
        const methods = /** @type {Record<string, unknown>} */ (write.methods);
        if (typeof methodName !== 'string' || !methods) {
            return;
        }
        const payload = methods[methodName];
        if (payload instanceof Set) {
            payload.add(value);
        } else if (Array.isArray(payload)) {
            payload.push(value);
        } else if (isObject(payload) && isObject(value)) {
            // @ts-ignore
            Object.assign(payload, value);
        } else {
            methods[methodName] = value;
        }
    }

    /**
     * @param {Element} element
     * @param {string} html
     * @returns {Promise<void | boolean>}
     */
    innerHTML(element, html) {
        return this.write(element, { prop: 'innerHTML', value: html });
    }

    /**
     * @param {Element} element
     * @param {PropWriteType} name
     * @param {BatchValueType} value
     * @returns {Promise<void | boolean>}
     */
    writeProp(element, name, value) {
        return this.write(element, { prop: name, value });
    }

    /**
     * @param {Element} element
     * @returns {Promise<void | boolean>}
     */
    remove(element) {
        return this.write(element, { method: 'remove', value: true });
    }

    /**
     * Writes a batch of DOM operations to the specified element.
     * @param {BatchWriteType} write
     */
    doWrite(write) {
        const { element, methods, attributes, resolve } = write;
        const { remove, prepend, append, replaceChildren } = methods;
        if (remove === true) {
            element?.remove();
            resolve?.();
            this.writes.delete(element);
            return;
        }
        prepend instanceof Set && element?.prepend(...prepend);
        append instanceof Set && element?.append(...append);
        replaceChildren && element?.replaceChildren(replaceChildren);

        if (isObject(attributes) && element instanceof HTMLElement) {
            attr(element, attributes);
        }
        this.writes.delete(element);
        resolve?.();
    }

    async flushWrites(config = this._config || {}) {
        await new Promise(resolve => requestAnimationFrame(resolve));
        const writes = Array.from(this.writes.entries());
        if (writes.length === 0) return;
        const { batchSize = 100, timeout = 0 } = config;
        const batch = writes.splice(0, batchSize);
        batch.forEach(([, write]) => this.doWrite(write));
        setTimeout(() => this.flushWrites(config), timeout);
    }

    /**
     * Batches dom write operations [innerHTML, textContent, etc.] to improve performance.
     * @param {Element} element
     * @param {WriteType} config
     * @returns {Promise<void | boolean>}
     */
    async write(element, config = {}) {
        config.element = element;
        /** @type {BatchWriteType} */
        const write = this.getWrite(element);

        const { method, prop, value = '', attributes, callback } = config;
        if (typeof callback === 'function' && callback() === false) {
            return false;
        }
        if (typeof method === 'string') {
            this.handleMethodWrite(write, config);
        } else if (prop && typeof value === 'string') {
            write.attributes[prop] = value;
        }
        if (attributes) {
            Object.assign(write.attributes, attributes);
        }
        this.writes.set(element, write);
        if (this.writes.size === 1) {
            this.flushWrites();
        }

        return write.promise;
    }

    /**
     * Waits for the specified node to be available in the DOM.
     * @param {Element} node
     * @returns {Promise<void | boolean>}
     */
    async waitFor(node) {
        const { promise } = this?.writes.get(node) || {};
        promise instanceof Promise && (await promise);
        return promise instanceof Promise ? promise : Promise.resolve();
    }
}
