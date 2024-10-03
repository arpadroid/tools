/**
 * Debounce function
 * @param {Function} fn - function to be debounced
 * @param {number} delay - delay time in milliseconds
 * @returns {Function} - debounced function
 */
export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
