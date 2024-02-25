/**
 * A class that provides a means to subscribe to properties of an instance via observer pattern.
 * It acts as a mixin, and should be used as such via the mixin method.
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
     * Subscribes to a property.
     * @param {string} property
     * @param {never} callback
     * @returns {Function}
     */
    static listen(property, callback) {
        if (!Array.isArray(this[`${property}_observers`])) {
            this[`${property}_observers`] = [];
        }
        this[`${property}_observers`].push(callback);
        return ObserverTool.unsubscribe(this[`${property}_observers`], callback);
    }

    /**
     * Unsubscribes from a property.
     * @param {Function[]} observers
     * @param {Function} callback
     * @returns {Function}
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
     * Calls all subscribers of a property.
     * @param {string} property
     * @param {unknown} value
     * @param {unknown} event
     */
    static signal(property, value, event) {
        const observers = this[`${property}_observers`];
        if (Array.isArray(observers)) {
            observers.forEach(observer => observer(value, event));
        }
    }

    /**
     * Initializes subscriptions for a property, used as a means to prevent accidental duplication of subscriptions.
     * @param {string} id
     * @param {Function} callback
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
