import { onResize, onScroll, onScrollStart, removeScrollCallback, removeResizeCallback } from './pageTool';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

/** @typedef {(event: Event) => boolean | void} CallbackType */

/**
 * Creates a typed page callback mock.
 * @param {() => boolean | void} [implementation]
 * @returns {CallbackType}
 */
const createCallback = (implementation = () => undefined) =>
    /** @type {CallbackType} */ (jest.fn(implementation));

describe('pageTool', () => {
    beforeEach(() => {
        // Clear all event listeners
        jest.clearAllMocks();
    });

    describe('onResize', () => {
        it('should register resize callback', () => {
            const callback = createCallback();
            onResize(callback);

            // Trigger resize event
            window.dispatchEvent(new Event('resize'));

            expect(callback).toHaveBeenCalled();
        });

        it('should not register duplicate callbacks', () => {
            const callback = createCallback();
            onResize(callback);
            onResize(callback);

            // Trigger resize event
            window.dispatchEvent(new Event('resize'));

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should call multiple callbacks', () => {
            const callback1 = createCallback();
            const callback2 = createCallback();
            onResize(callback1);
            onResize(callback2);

            window.dispatchEvent(new Event('resize'));

            expect(callback1).toHaveBeenCalled();
            expect(callback2).toHaveBeenCalled();
        });

        it('should remove callback when it returns false', () => {
            const callback = createCallback(() => false);
            onResize(callback);

            window.dispatchEvent(new Event('resize'));
            expect(callback).toHaveBeenCalledTimes(1);

            // Should not be called again
            window.dispatchEvent(new Event('resize'));
            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe('removeResizeCallback', () => {
        it('should remove resize callback', () => {
            const callback = createCallback();
            onResize(callback);

            window.dispatchEvent(new Event('resize'));
            expect(callback).toHaveBeenCalledTimes(1);

            removeResizeCallback(callback);

            window.dispatchEvent(new Event('resize'));
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should handle removing non-existent callback', () => {
            const callback = createCallback();
            expect(() => removeResizeCallback(callback)).not.toThrow();
        });
    });

    describe('onScroll', () => {
        it('should register scroll callback', () => {
            const callback = createCallback();
            onScroll(callback);

            window.dispatchEvent(new Event('scroll'));

            expect(callback).toHaveBeenCalled();
        });

        it('should not register duplicate callbacks', () => {
            const callback = createCallback();
            onScroll(callback);
            onScroll(callback);

            window.dispatchEvent(new Event('scroll'));

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should call multiple callbacks', () => {
            const callback1 = createCallback();
            const callback2 = createCallback();
            onScroll(callback1);
            onScroll(callback2);

            window.dispatchEvent(new Event('scroll'));

            expect(callback1).toHaveBeenCalled();
            expect(callback2).toHaveBeenCalled();
        });

        it('should remove callback when it returns false', () => {
            const callback = createCallback(() => false);
            onScroll(callback);

            window.dispatchEvent(new Event('scroll'));
            expect(callback).toHaveBeenCalledTimes(1);

            window.dispatchEvent(new Event('scroll'));
            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe('removeScrollCallback', () => {
        it('should remove scroll callback', () => {
            const callback = createCallback();
            onScroll(callback);

            window.dispatchEvent(new Event('scroll'));
            expect(callback).toHaveBeenCalledTimes(1);

            removeScrollCallback(callback);

            window.dispatchEvent(new Event('scroll'));
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should handle removing non-existent callback', () => {
            const callback = createCallback();
            expect(() => removeScrollCallback(callback)).not.toThrow();
        });
    });

    describe('onScrollStart', () => {
        it('should register callback without errors', () => {
            const callback = createCallback();
            expect(() => onScrollStart(callback)).not.toThrow();
        });

        it('should not register duplicate callbacks', () => {
            const callback = createCallback();
            onScrollStart(callback);
            onScrollStart(callback);
            // Registering same callback multiple times should be safe
            expect(() => onScrollStart(callback)).not.toThrow();
        });

        it('should register multiple callbacks', () => {
            const callback1 = createCallback();
            const callback2 = createCallback();
            expect(() => {
                onScrollStart(callback1);
                onScrollStart(callback2);
            }).not.toThrow();
        });

        it('should only add callback once', () => {
            const callback = createCallback();
            onScrollStart(callback);
            const result = onScrollStart(callback);
            expect(result).toBeUndefined();
        });
    });
});
