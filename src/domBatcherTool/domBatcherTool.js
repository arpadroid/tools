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
            batchSize: 200,
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
            props: {},
            fn: [],
            element,
            methods: {
                remove: false,
                removeAttribute: new Set(),
                setAttribute: {},
                replaceWith: undefined
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
    getWriteStub(element) {
        return this.getWrite(element) || this.getDefaultWrite(element);
    }

    /**
     * @param {Element} element
     * @returns {BatchWriteType | undefined}
     */
    getWrite(element) {
        return this.writes.get(element);
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
            if (Array.isArray(value)) {
                value.forEach(val => payload.add(val));
            } else {
                payload.add(value);
            }
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
     * Writes a batch of DOM operations to the specified element.
     * @param {BatchWriteType} write
     */
    doWrite(write) {
        const { element, methods, attributes, resolve, props, fn } = write;
        const { remove, prepend, append, replaceChildren, replaceWith, removeAttribute } = methods;
        if (remove === true) {
            element?.remove();
            resolve?.();
            this.writes.delete(element);
            return;
        }
        for (const method of fn) {
            if (typeof method === 'function') {
                method();
            }
        }
        for (const [key, value] of Object.entries(props)) {
            if (element instanceof HTMLElement) {
                // @ts-expect-error
                element[key] = value;
            }
        }
        prepend instanceof Set && element?.prepend(...prepend);

        append && element?.append(...Array.from(append));
        replaceChildren && element?.replaceChildren(...Array.from(replaceChildren));
        replaceWith && element?.replaceWith(replaceWith);
        removeAttribute instanceof Set && removeAttribute.forEach(attr => element?.removeAttribute(attr));

        if (isObject(attributes) && element instanceof HTMLElement) {
            attr(element, attributes);
        }
        this.writes.delete(element);
        resolve?.();
    }

    async flushWrites(config = this._config || {}) {
        await new Promise(resolve => setTimeout(resolve, 0));
        const writes = Array.from(this.writes.entries());
        if (writes.length === 0) return;
        const { batchSize = this._config?.batchSize || 200, timeout = 0 } = config;

        const batch = writes.splice(0, batchSize);
        batch.forEach(([, write]) => this.doWrite(write));

        setTimeout(() => {
            requestAnimationFrame(() => this.flushWrites(config));
        }, timeout);
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
        const write = this.getWriteStub(element);

        const { method, prop, value = '', attributes, callback, fn, batchSize, timeout } = config;
        if (typeof callback === 'function' && callback() === false) {
            return false;
        }
        if (typeof fn === 'function') {
            write.fn.push(fn);
        }
        if (typeof method === 'string') {
            this.handleMethodWrite(write, config);
        } else if (prop && typeof value === 'string') {
            write.props[prop] = value;
        }
        if (attributes) {
            Object.assign(write.attributes, attributes);
        }
        this.writes.set(element, write);
        if (this.writes.size === 1) {
            this.flushWrites({
                ...this._config,
                ...(typeof batchSize === 'number' ? { batchSize } : {}),
                ...(typeof timeout === 'number' ? { timeout } : {})
            });
        }

        return write.promise;
    }

    /**
     * Writes to the specified element using a method and value.
     * @param {Element} element
     * @param {import('./domBatcherTool.types').MethodWriteType} method
     * @param {any} value
     * @param {Pick<DomBatcherToolConfigType, 'batchSize' | 'timeout'>} [config]
     * @returns {Promise<void | boolean>}
     */
    async writeMethod(element, method, value, config = {}) {
        return this.write(element, { method, value, ...config });
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

    ////////////////////////////
    // #region Write Utils
    ///////////////////////////

    /**
     * @param {Element} element
     * @returns {Promise<void | boolean>}
     */
    remove(element) {
        return this.write(element, { method: 'remove', value: true });
    }

    /**
     * @param {Element} element
     * @param {string} html
     * @param {Pick<DomBatcherToolConfigType, 'batchSize' | 'timeout'>} [config]
     * @returns {Promise<void | boolean>}
     */
    innerHTML(element, html, config = {}) {
        return this.write(element, { ...config, prop: 'innerHTML', value: html });
    }

    /**
     * Removes an attribute from the specified element.
     * @param {Element} element
     * @param {string} name
     * @returns {Promise<void | boolean>}
     */
    removeAttribute(element, name) {
        return this.write(element, { method: 'removeAttribute', value: name });
    }

    /**
     * Appends a node to the element.
     * @param {Element} element
     * @param {HTMLElement[] | NodeList} nodes
     * @param {Pick<DomBatcherToolConfigType, 'batchSize' | 'timeout'>} [config]
     * @returns {Promise<void | boolean>}
     */
    append(element, nodes, config = {}) {
        return this.writeMethod(element, 'append', nodes, config);
    }

    /**
     * Appends a node to the element.
     * @param {Element} element
     * @param {HTMLElement[] | NodeList} nodes
     * @param {Pick<DomBatcherToolConfigType, 'batchSize' | 'timeout'>} [config]
     * @returns {Promise<void | boolean>}
     */
    prepend(element, nodes, config = {}) {
        return this.writeMethod(element, 'prepend', nodes, config);
    }

    /**
     * Replaces the element's children with nodes.
     * @param {Element} element
     * @param {HTMLElement[] | NodeList} nodes
     * @param {Pick<DomBatcherToolConfigType, 'batchSize' | 'timeout'>} [config]
     * @returns {Promise<void | boolean>}
     */
    replaceChildren(element, nodes, config = {}) {
        return this.writeMethod(element, 'replaceChildren', nodes, config);
    }

    /**
     * Sets an attribute on the specified element.
     * @param {Element} element
     * @param {string} name
     * @param {string} value
     * @returns {Promise<void | boolean>}
     */
    setAttribute(element, name, value) {
        return this.write(element, { attributes: { [name]: value } });
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
     * Writes to the specified element with a callback function.
     * @param {Element} element
     * @param {() => boolean | undefined} fn
     * @param {number} [batchSize]
     * @param {number} [timeout]
     * @returns {Promise<void | boolean>}
     */
    writeFn(element, fn, batchSize, timeout) {
        return this.write(element, { batchSize, timeout, fn });
    }

    // #endregion Write Utils
}
