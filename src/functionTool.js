/**
 * Debounce function.
 * @param {() => void} fn
 * @param {number} delay
 * @returns {() => void}
 */
export function debounce(fn, delay) {
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
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
