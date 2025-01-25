/**
 * Debounce function.
 * @template T
 * @param {(args: T) => void} fn
 * @param {number} delay
 * @returns {(args: T) => void}
 */
export function debounce(fn, delay) {
    /** @type {ReturnType<typeof setTimeout> | null} */
    let timer;
    return (...args) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Throttle function.
 * @param {() => void} fn
 * @param {number} limit
 * @returns {() => void}
 */
export function throttle(fn, limit) {
    /** @type {boolean} */
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
