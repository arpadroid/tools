/**
 * A class that provides a means to subscribe to properties of an instance via observer pattern.
 * It acts as a mixin, and should be used as such via the mixin method.
 */

/**
 * @typedef {Function} ObserverTool_SignalType - Interface for observer signal method.
 * @property {string} signalName - The name of the signal being emitted.
 * @property {unknown} value - The value to signal.
 * @property {unknown} event - The event to signal.
 */

/**
 * @typedef {Function} ObserverTool_ListenType
 * @property {string} signalName - The name of the signal to listen to.
 * @property {(value: unknown, event: unknown) => void} callback - The callback to call when the signal is emitted.
 */

/**
 * @typedef {Function} ObserverTool_InitializeObserversType
 * @property {string} signalName - The name of the signal to listen to.
 * @property {(value: unknown, event: unknown) => void} callback - The callback to call when the signal is emitted.
 */

class ObserverTool {
    /** @property {Record<string, boolean>} subscriptionsInitialized - Key value pair of initialized subscription states. */
    observersInitialized;
    /**
     * Binds the subscribe, callSubscribers, initializeSubscriptions and unsubscribeProperty methods to the instance.
     * @param {unknown} instance
     */
    static mixin(instance) {
        instance.listen = ObserverTool.listen.bind(instance);
        instance.signal = ObserverTool.signal.bind(instance);
        instance.initializeObservers = ObserverTool.prototype.initializeObservers.bind(instance);
        instance.unsubscribe = ObserverTool.unsubscribe.bind(instance);
        if (!instance.observersInitialized) {
            instance.observersInitialized = {};
        }
    }

    /**
     * Subscribes to a signal.
     * @param {string} signalName
     * @param {() => void} callback
     * @returns {() => void}
     */
    static listen(signalName, callback) {
        if (!Array.isArray(this[`${signalName}_observers`])) {
            this[`${signalName}_observers`] = [];
        }
        this[`${signalName}_observers`].push(callback);
        return ObserverTool.unsubscribe(this[`${signalName}_observers`], callback);
    }

    /**
     * Unsubscribes from a signal.
     * @param {() => void[]} observers
     * @param {() => void} callback
     * @returns {() => void}
     */
    static unsubscribe(observers, callback) {
        return () => {
            const index = observers.indexOf(callback);
            if (index !== -1) {
                observers.splice(index, 1);
            }
        };
    }

    /**
     * Calls all subscribers of a signal.
     * @param {string} signalName
     * @param {unknown} value
     * @param {unknown} event
     */
    static signal(signalName, value, event) {
        const observers = this[`${signalName}_observers`];
        if (Array.isArray(observers)) {
            observers.forEach(observer => observer(value, event));
        }
    }

    /**
     * Initializes subscriptions for a property, used as a means to prevent accidental duplication of subscriptions.
     * @param {string} id
     * @param {() => void} callback
     * @returns {this}
     */
    initializeObservers(id, callback) {
        if (!this.observersInitialized[id]) {
            this.observersInitialized[id] = true;
            callback();
        }
        return this;
    }
}

export default ObserverTool;
