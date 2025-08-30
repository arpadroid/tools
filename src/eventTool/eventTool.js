/**
 * Normalizes client coordinates from a mouse or touch event.
 * @param {MouseEvent | TouchEvent} event - The event to normalize.
 * @returns {{ clientX: number, clientY: number }} The normalized client coordinates.
 */
export function normalizeClientCoords(event) {
    /** @type {number} */
    let clientX = 0;
    /** @type {number} */
    let clientY = 0;
    if (event instanceof MouseEvent) {
        clientX = Number(event.clientX);
        clientY = Number(event.clientY);
    } else if (event instanceof TouchEvent && event.changedTouches.length > 0) {
        clientX = Number(event.changedTouches[0].clientX);
        clientY = Number(event.changedTouches[0].clientY);
    }
    return { clientX, clientY };
}

/**
 * Normalizes a touch event by extracting relevant properties.
 * @param {TouchEvent | MouseEvent } _event - The touch event to normalize.
 * @returns {{
 *  clientX: number,
 *  clientY: number,
 *  target: HTMLElement | null
 * }} The normalized touch event.
 */
export function normalizeTouchEvent(_event) {
    /** @type {Record<string, unknown>} */

    const { clientX, clientY } = normalizeClientCoords(_event);

    let target = /** @type {HTMLElement | null} */ (_event.target); // @ts-ignore
    if (typeof _event?.changedTouches !== 'undefined') {
        const _target = document.elementFromPoint(Number(clientX), Number(clientY));
        _target instanceof HTMLElement && (target = _target);
    }

    return {
        clientX: Number(clientX),
        clientY: Number(clientY),
        target
    };
}
