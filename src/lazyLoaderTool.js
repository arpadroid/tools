export const lazyQueue = new Set();
let isLoading = false;
let batchSize = 5;

window.addEventListener('unload', () => {
    alert('jio');
});

const controller = new AbortController();

/**
 * Clear the lazy queue.
 */
export function clearLazyQueue() {
    lazyQueue.clear();
    isLoading = false;
    controller.abort();
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
