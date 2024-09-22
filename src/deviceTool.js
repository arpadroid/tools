/**
 * Checks if the user agent is Opera Mini.
 * @returns {boolean} True if the user agent is Opera Mini, false otherwise.
 */
export function isOperaPhone() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.match(/Opera Mini/i);
}

/**
 * Checks if the user agent is Internet Explorer 11.
 * @returns {boolean} True if the user agent is Internet Explorer 11, false otherwise.
 */
export function isIE11() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.match(/trident\/7\./);
}

/**
 * Checks if the user agent is Internet Explorer (any version).
 * @returns {boolean} True if the user agent is Internet Explorer, false otherwise.
 */
export function isIE() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.match(/msie/) || isIE11();
}

/**
 * Checks if the user agent is Edge.
 * @returns {boolean} True if the user agent is Edge, false otherwise.
 */
export function isEdge() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('edge') > -1;
}

/**
 * Checks if the user agent is Firefox.
 * @returns {boolean} True if the user agent is Firefox, false otherwise.
 */
export function isFirefox() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('firefox') > -1;
}

/**
 * Checks if the user agent is iOS (iPhone, iPad, iPod).
 * @returns {boolean} True if the user agent is iOS, false otherwise.
 */
export function isIOSPhone() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.match(/iPhone|iPad|iPod/i);
}

/**
 * Checks if the user agent is WebKit.
 * @returns {boolean} True if the user agent is WebKit, false otherwise.
 */
export function isWebkit() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.match(/webkit/i);
}

/**
 * Checks if the user agent is Chrome.
 * @returns {boolean} True if the user agent is Chrome, false otherwise.
 */
export function isChrome() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('chrome') > -1 && !isEdge();
}

/**
 * Checks if the user agent is Safari.
 * @returns {boolean} True if the user agent is Safari, false otherwise.
 */
export function isSafari() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('safari') > -1 && !isChrome();
}

/**
 * Checks if the user agent is iOS Safari (iPhone, iPad, iPod or Safari browser).
 * @returns {boolean} True if the user agent is iOS Safari, false otherwise.
 */
export function isIOsSafari() {
    return isIOSPhone() || isSafari();
}

/**
 * Returns the width of the viewport.
 * @returns {number} The width of the viewport.
 */
export function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

/**
 * Returns the height of the viewport.
 * @returns {number} The height of the viewport.
 */
export function getViewportHeight() {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

/**
 * Returns the size of the viewport.
 * @returns {number[]} The size of the viewport.
 */
export function getViewportSize() {
    return [getViewportWidth(), getViewportHeight()];
}
