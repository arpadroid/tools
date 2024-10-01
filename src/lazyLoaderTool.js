export const lazyQueue = new Set();
export const loadedSources = new Set();
let isLoading = false;
let batchSize = 5;

const controller = new AbortController();
window.addEventListener('beforeunload', () => controller.abort());

/**
 * Get the source of an image.
 * @param {HTMLImageElement | string} image - The image to get the source of.
 * @returns {string}
 */
export function getSource(image) {
    if (typeof image === 'string') {
        return image;
    }
    return image?.dataset?.src || image?.src;
}

/**
 * Check if a source has been loaded.
 * @param {string} src - The source to check.
 * @returns {boolean}
 */
export function hasLoadedSource(src) {
    return loadedSources.has(src);
}

/**
 * Clear a lazy image.
 * @param {HTMLImageElement} image - The image to clear.
 */
export function clearLazyImage(image) {
    lazyQueue.delete(image);
    if (lazyQueue.size === 0) {
        isLoading = false;
    }
}

/**
 * Load the next image in the queue.
 * @returns {Promise<HTMLImageElement>}
 */
export function loadNext() {
    return new Promise(resolve => {
        const iterator = lazyQueue.values();
        let image = iterator.next().value;
        if (!image) {
            isLoading = false;
            return;
        }
        lazyQueue.delete(image);
        let src = image?.dataset?.src;
        if (typeof image === 'string') {
            src = image;
            image = new Image();
        }
        const _loadNext = () => {
            resolve(image);
            loadedSources.add(src);
            image.removeEventListener('load', _loadNext);
            image.removeEventListener('error', _loadNext);
        };
        if (!(image instanceof HTMLImageElement)) {
            console.error('Invalid image element.');
            _loadNext();
            return;
        }
        image.addEventListener('load', _loadNext);
        image.addEventListener('error', _loadNext);
        image.src = src;
    });
}

/**
 * Clear the lazy queue.
 */
export function clearLazyQueue() {
    lazyQueue.clear();
    isLoading = false;
    controller.abort();
}

/**
 * Loads a batch of images.
 * @returns {Promise<void>}
 */
export const loadBatch = () => {
    if (!lazyQueue.size || !isLoading) {
        isLoading = false;
        return Promise.resolve();
    }
    const promises = [];
    const total = Math.min(batchSize, lazyQueue.size);

    for (let i = 0; i < total; i++) {
        promises.push(loadNext());
    }
    return Promise.all(promises).then(() => {
        if (lazyQueue.size) {
            requestAnimationFrame(loadBatch);
        } else {
            isLoading = false;
        }
    });
};

/**
 * Lazy load an image.
 * @param {HTMLImageElement | string} image - The image to lazy load.
 * @param {number} $batchSize - The number of images to load in batch.
 */
export function lazyLoad(image, $batchSize = batchSize) {
    batchSize = $batchSize;
    lazyQueue.add(image);
    if (!isLoading) {
        isLoading = true;
        requestAnimationFrame(loadBatch);
    }
}
