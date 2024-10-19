/**
 * A class that provides a means to subscribe to properties of an instance via observer pattern.
 * It acts as a mixin, and should be used as such via the mixin method.
 */
import { debounce } from './functionTool';

////////////////////////
// #region TYPES
////////////////////////

/**
 * @typedef {Function} ObserverTool_SignalType - Interface for observer signal method.
 * @property {string} signalName - The name of the signal being emitted.
 * @property {unknown} value - The value to signal.
 * @property {unknown} param1 - The event to signal.
 */

/**
 * @typedef {Function} ObserverTool_OnType - Interface for observer on method.
 * @property {string} signalName - The name of the signal to listen to.
 * @property {(value: unknown, event: unknown) => void} callback - The callback to call when the signal is emitted.
 */

////////////////////////
// #endregion
////////////////////////

//////////////////////////
// #region LOGGING
//////////////////////////
const VERBOSE = false;
const SIGNAL_REGISTRY = {};
let SIGNAL_REGISTRY_BATCH = {};
let SIGNAL_COUNT = 0;
let SIGNAL_BATCH_COUNT = 0;

const logSignals = debounce(instance => {
    console.log('ObserverTool.on', {
        SIGNAL_COUNT,
        SIGNAL_BATCH_COUNT,
        SIGNAL_REGISTRY,
        SIGNAL_REGISTRY_BATCH: { ...SIGNAL_REGISTRY_BATCH },
        CALLBACKS: instance._observerTool.callbacks
    });
    SIGNAL_REGISTRY_BATCH = {};
    SIGNAL_BATCH_COUNT = 0;
}, 1000);

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

class ObserverTool {
    /**
     * Binds the subscribe, callSubscribers, initializeSubscriptions and unsubscribeProperty methods to the instance.
     * @param {unknown} instance
     */
    static mixin(instance) {
        instance.on = ObserverTool.on.bind(instance);
        instance.signal = ObserverTool.signal.bind(instance);
        instance.unsubscribe = ObserverTool.unsubscribe.bind(instance);
        instance.off = ObserverTool.off.bind(instance);
        instance._observerTool = { callbacks: {}, unsubscribes: {}, listeners: {} };
    }

    /**
     * Subscribes to a signal.
     * @param {string} signalName
     * @param {() => void} callback
     * @param {[]<() => void> | undefined} unsubscribes
     * @returns {() => void}
     */
    static on(signalName, callback, unsubscribes) {
        const { callbacks } = this._observerTool;
        if (!callbacks[signalName]) {
            callbacks[signalName] = new Set();
        }
        callbacks[signalName].add(callback);
        const unsubscribe = this.unsubscribe(signalName, callback);
        Array.isArray(unsubscribes) && unsubscribes.push(unsubscribe);
        VERBOSE && reportSignals(signalName, this);
        return unsubscribe;
    }

    static off(signalName, callback) {
        const { callbacks } = this._observerTool;
        callbacks[signalName]?.delete(callback);
    }

    /**
     * Unsubscribes from a signal.
     * @param {string} signalName
     * @param {() => void} callback
     * @returns {() => void}
     */
    static unsubscribe(signalName, callback) {
        return () => {
            const { callbacks } = this._observerTool;
            callbacks[signalName]?.delete(callback);
        };
    }

    /**
     * Calls all subscribers of a signal.
     * @param {string} signalName
     * @param {unknown} value
     * @param {unknown} param1
     * @param {unknown} param2
     */
    static signal(signalName, value, param1, param2) {
        const { callbacks } = this._observerTool;
        if (callbacks[signalName]?.size) {
            for (const observer of callbacks[signalName]) {
                observer(value, param1, param2);
            }
        }
    }
}

export default ObserverTool;
