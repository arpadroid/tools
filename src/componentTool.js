/**
 * Utility class for working with web components and custom elements.
 */
class ComponentTool {
    /**
     * Applies the `onReady` method to the given component and sets up the necessary callbacks.
     * @param {HTMLElement} component - The component to apply the `onReady` method to.
     * @param {string} [tagName] - The tag name of the Custom element.
     */
    static applyOnReady(component, tagName = component?.tagName?.toLowerCase()) {
        component.onReady = ComponentTool.onReady.bind(component);
        if (typeof component._onReadyCallbacks === 'undefined') {
            component._onReadyCallbacks = [];
        }
        if (tagName) {
            customElements.whenDefined(tagName).then(() => ComponentTool.whenDefined(component));
        }
    }

    /**
     * Calls all the registered callbacks when the component is defined and marks the component as ready.
     * @param {HTMLElement} component - The component to call the callbacks on.
     */
    static whenDefined(component) {
        component._onReadyCallbacks.forEach(callback => callback());
        component._isReady = true;
    }

    /**
     * Registers a callback to be called when the component is ready.
     * @param {Function} callback - The callback function to register.
     */
    static onReady(callback) {
        if (typeof callback === 'function') {
            if (this._isReady) {
                callback();
            } else {
                this._onReadyCallbacks.push(callback);
            }
        }
    }
}

export default ComponentTool;
