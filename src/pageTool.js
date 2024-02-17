const onResizeCallbacks = [];
const onScrollCallbacks = [];
let initializedResize = false;
let initializedScroll = false;

/**
 * Initializes the resize event listener and sets the flag indicating it has been initialized.
 * @param {Function} callback - The callback function to be executed on resize.
 */
export function initializeResize(callback) {
    window.addEventListener('resize', callback);
    initializedResize = true;
}

/**
 * Removes the specified callback function from the scroll event listener.
 * @param {Function} callback - The callback function to be removed.
 */
export function removeScrollCallback(callback) {
    const index = onScrollCallbacks.indexOf(callback);
    if (index !== -1) {
        onScrollCallbacks.splice(index, 1);
    }
}

/**
 * Executes resize event listener callbacks.
 * @param {Event} event - The resize event handler.
 */
function _onResize(event) {
    const toBeRemoved = [];
    onResizeCallbacks.forEach(callback => callback(event) === false && toBeRemoved.push(callback));
    toBeRemoved.forEach(callback =>
        onResizeCallbacks.splice(onResizeCallbacks.indexOf(callback), 1)
    );
}


/**
 * Adds a callback function to the resize event listener.
 * @param {Function} callback - The callback function to be added.
 */
export function onResize(callback) {
    if (!initializedResize) {
        initializeResize(_onResize);
    }
    if (onResizeCallbacks.indexOf(callback) === -1) {
        onResizeCallbacks.push(callback);
    }
}

/**
 * Initializes the scroll event listener and sets the flag indicating it has been initialized.
 * @param {Function} callback - The callback function to be executed on scroll.
 */
export function initializeOnScroll(callback) {
    window.addEventListener('scroll', callback);
    initializedScroll = true;
}

/**
 * Executes scroll event listener callbacks.
 * @param {Event} event - The resize event.
 */
function _onScroll(event) {
    const toBeRemoved = [];
    onScrollCallbacks.forEach(callback => callback(event) === false && toBeRemoved.push(callback));
    toBeRemoved.forEach(callback => onScrollCallbacks.splice(onScrollCallbacks.indexOf(callback), 1));
}

/**
 * Adds a callback function to the scroll event listener.
 * @param {Function} callback - The callback function to be added.
 */
export function onScroll(callback) {
    if (!initializedScroll) {
        initializeOnScroll(_onScroll);
    }
    if (onScrollCallbacks.indexOf(callback) === -1) {
        onScrollCallbacks.push(callback);
    }
}

/**
 * Removes the specified callback function from the resize event listener.
 * @param {Function} callback - The callback function to be removed.
 */
export function removeResizeCallback(callback) {
    const index = onResizeCallbacks.indexOf(callback);
    if (index !== -1) {
        onResizeCallbacks.splice(index, 1);
    }
}

