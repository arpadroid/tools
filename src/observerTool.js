/**
 * A class that provides a means to subscribe to properties of an instance via observer pattern.
 * It acts as a mixin, and should be used as such via the mixin method.
 */
/**
 * @typedef {import('./observerTool.types').ObserverType} ObserverType
 * @typedef {import('./observerTool.types').ObserverInstanceType} ObserverInstanceType
 * @typedef {import('./observerTool.types').SignalType} SignalType
 * @typedef {import('./observerTool.types').UnsubscribeType} UnsubscribeType
 * @typedef {import('./zoneTool.types').ElementType} ElementType
 */
import { debounce } from './functionTool';

//////////////////////////
// #region LOGGING
//////////////////////////
const VERBOSE = false;
/** @type {Record<string, number>} */
const SIGNAL_REGISTRY = {};
/** @type {Record<string, number>} */
let SIGNAL_REGISTRY_BATCH = {};
let SIGNAL_COUNT = 0;
let SIGNAL_BATCH_COUNT = 0;

/**
 * Logs signals to the console.
 * @param {ObserverType} instance
 */
const _logSignals = instance => {
    console.log('ObserverTool.on', {
        SIGNAL_COUNT,
        SIGNAL_BATCH_COUNT,
        SIGNAL_REGISTRY,
        SIGNAL_REGISTRY_BATCH: { ...SIGNAL_REGISTRY_BATCH },
        CALLBACKS: instance?._observerTool?.callbacks
    });
    SIGNAL_REGISTRY_BATCH = {};
    SIGNAL_BATCH_COUNT = 0;
};

/** @type {(instance: Record<string, any>) => void} */
const logSignals = debounce(_logSignals, 1000);

/**
 * Reports signals to the console.
 * @param {string} signalName
 * @param {Record<string, any>} instance
 */
const reportSignals = (signalName, instance) => {
    SIGNAL_COUNT++;
    SIGNAL_BATCH_COUNT++;
    SIGNAL_REGISTRY[signalName] = SIGNAL_REGISTRY[signalName] || 0;
    SIGNAL_REGISTRY[signalName]++;
    SIGNAL_REGISTRY_BATCH[signalName] = SIGNAL_REGISTRY_BATCH[signalName] || 0;
    SIGNAL_REGISTRY_BATCH[signalName]++;
    logSignals(instance);
};

//////////////////////////
// #endregion
//////////////////////////

const ObserverTool = {
    /**
     * Binds the subscribe, callSubscribers, initializeSubscriptions and unsubscribeProperty methods to the instance.
     * @param {ObserverInstanceType} instance
     */
    mixin(instance) {
        instance.on = ObserverTool.on.bind(instance);
        instance.signal = ObserverTool.signal.bind(instance);
        instance.unsubscribe = ObserverTool.unsubscribe.bind(instance);
        instance.off = ObserverTool.off.bind(instance);
        instance._observerTool = { callbacks: {} };
    },

    /**
     * Subscribes to a signal.
     * @param {string} signalName
     * @param {SignalType} callback
     * @param {UnsubscribeType[] | undefined} unsubscribes
     * @returns {UnsubscribeType | undefined}
     * @this {ObserverType}
     */
    on(signalName, callback, unsubscribes) {
        const { callbacks = {} } = this._observerTool || {};
        if (!callbacks[signalName]) {
            callbacks[signalName] = new Set();
        }
        VERBOSE && reportSignals(signalName, this);
        if (typeof this.unsubscribe === 'function') {
            callbacks[signalName].add(callback);
            const unsubscribe = this.unsubscribe(signalName, callback);
            Array.isArray(unsubscribes) && unsubscribes.push(unsubscribe);
            return unsubscribe;
        }
    },

    /**
     * Unsubscribes from a signal.
     * @param {string} signalName
     * @param {SignalType} callback
     * @this {ObserverType}
     */
    off(signalName, callback) {
        const { callbacks = {} } = this._observerTool || {};
        callbacks[signalName]?.delete(callback);
    },

    /**
     * Unsubscribes from a signal.
     * @param {string} signalName
     * @param {SignalType} callback
     * @returns {UnsubscribeType}
     * @this {ObserverType}
     */
    unsubscribe(signalName, callback) {
        return () => {
            const { callbacks = {} } = this._observerTool || {};
            callbacks[signalName]?.delete(callback);
        };
    },

    /**
     * Calls all subscribers of a signal.
     * @param {string} signalName
     * @param {unknown} [value]
     * @param {unknown} [param1]
     * @param {unknown} [param2]
     * @this {ObserverType}
     */
    signal(signalName, value, param1, param2) {
        const { callbacks = {} } = this._observerTool || {};
        if (callbacks[signalName]?.size) {
            for (const observer of callbacks[signalName]) {
                observer(value, param1, param2);
            }
        }
    }
};

export default ObserverTool;
