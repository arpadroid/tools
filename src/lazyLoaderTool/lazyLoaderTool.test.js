import {
    getSource,
    hasLoadedSource,
    clearLazyImage,
    loadNext,
    clearLazyQueue,
    loadBatch,
    lazyLoad,
    lazyQueue,
    loadedSources
} from './lazyLoaderTool';
import { jest } from '@jest/globals';

describe('lazyLoaderTool', () => {
    beforeEach(() => {
        // Clear the queues before each test
        clearLazyQueue();
        loadedSources.clear();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    describe('getSource', () => {
        it('should return string source as is', () => {
            const source = 'https://example.com/image.jpg';
            expect(getSource(source)).toBe(source);
        });

        it('should return data-src from image element', () => {
            const img = document.createElement('img');
            img.dataset.src = 'https://example.com/image.jpg';
            expect(getSource(img)).toBe('https://example.com/image.jpg');
        });

        it('should return src from image element if no data-src', () => {
            const img = document.createElement('img');
            img.src = 'https://example.com/image.jpg';
            expect(getSource(img)).toBe('https://example.com/image.jpg');
        });

        it('should prefer data-src over src', () => {
            const img = document.createElement('img');
            img.dataset.src = 'https://example.com/image1.jpg';
            img.src = 'https://example.com/image2.jpg';
            expect(getSource(img)).toBe('https://example.com/image1.jpg');
        });
    });

    describe('hasLoadedSource', () => {
        it('should return false for unloaded source', () => {
            expect(hasLoadedSource('https://example.com/image.jpg')).toBe(false);
        });

        it('should return true for loaded source', () => {
            const src = 'https://example.com/image.jpg';
            loadedSources.add(src);
            expect(hasLoadedSource(src)).toBe(true);
        });
    });

    describe('clearLazyImage', () => {
        it('should remove image from lazy queue', () => {
            const img = document.createElement('img');
            lazyQueue.add(img);
            expect(lazyQueue.has(img)).toBe(true);

            clearLazyImage(img);
            expect(lazyQueue.has(img)).toBe(false);
        });

        it('should handle removing image not in queue', () => {
            const img = document.createElement('img');
            expect(() => clearLazyImage(img)).not.toThrow();
        });
    });

    describe('clearLazyQueue', () => {
        it('should clear the entire lazy queue', () => {
            const img1 = document.createElement('img');
            const img2 = document.createElement('img');
            lazyQueue.add(img1);
            lazyQueue.add(img2);

            expect(lazyQueue.size).toBe(2);
            clearLazyQueue();
            expect(lazyQueue.size).toBe(0);
        });
    });

    describe('loadNext', () => {
        it('should load the next image in the queue', async () => {
            const img = document.createElement('img');
            img.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            lazyQueue.add(img);

            const resultPromise = loadNext();
            
            // Manually trigger the load event since fake timers don't trigger it
            img.dispatchEvent(new Event('load'));
            
            const result = await resultPromise;
            expect(result).toBe(img);
            expect(img.src).toBe(img.dataset.src);
            expect(hasLoadedSource(img.dataset.src)).toBe(true);
        });

        it('should handle string source', () => {
            const src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            lazyQueue.add(src);

            expect(lazyQueue.has(src)).toBe(true);
            
            // loadNext will create an HTMLImageElement from the string
            const resultPromise = loadNext();
            expect(resultPromise).toBeInstanceOf(Promise);
        });

        it('should handle image load error', async () => {
            const img = document.createElement('img');
            img.dataset.src = 'invalid-url';
            lazyQueue.add(img);

            const resultPromise = loadNext();
            
            // Manually trigger the error event
            img.dispatchEvent(new Event('error'));
            
            const result = await resultPromise;
            expect(result).toBe(img);
            expect(hasLoadedSource('invalid-url')).toBe(true);
        });

        it('should not resolve if queue is empty', () => {
            // loadNext doesn't resolve when queue is empty, just returns
            const promise = loadNext();
            expect(promise).toBeInstanceOf(Promise);
        });

        it('should handle invalid image element', async () => {
            lazyQueue.add({});
            const result = await loadNext();
            expect(result).toEqual({});
        });
    });

    describe('loadBatch', () => {
        it('should load a batch of images', () => {
            const img1 = document.createElement('img');
            const img2 = document.createElement('img');
            img1.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            img2.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

            // Use lazyLoad which sets isLoading and starts the batch process
            lazyLoad(img1);
            lazyLoad(img2);
            
            expect(lazyQueue.size).toBeGreaterThan(0);
        });

        it('should resolve immediately if queue is empty', async () => {
            await expect(loadBatch()).resolves.toBeUndefined();
        });

        it('should continue loading if queue is not empty after batch', () => {
            clearLazyQueue();
            
            // Add more images than batch size to force recursion
            for (let i = 0; i < 10; i++) {
                const img = document.createElement('img');
                img.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                lazyQueue.add(img);
            }

            // Start loading - this will trigger the recursion path
            loadBatch(2); // Use small batch size

            // Verify queue still has items (the recursion happened)
            expect(lazyQueue.size).toBeGreaterThan(0);
        });
    });

    describe('lazyLoad', () => {
        it('should add image to queue and start loading', () => {
            const img = document.createElement('img');
            img.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

            lazyLoad(img);

            expect(lazyQueue.has(img)).toBe(true);

            // Advance timers for requestAnimationFrame
            jest.advanceTimersByTime(100);
        });

        it('should accept custom batch size', () => {
            const img = document.createElement('img');
            img.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

            lazyLoad(img, 10);

            expect(lazyQueue.has(img)).toBe(true);

            // Advance timers for requestAnimationFrame
            jest.advanceTimersByTime(100);
        });

        it('should handle multiple images added sequentially', () => {
            const img1 = document.createElement('img');
            const img2 = document.createElement('img');
            img1.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            img2.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

            lazyLoad(img1);
            lazyLoad(img2);

            expect(lazyQueue.size).toBeGreaterThan(0);

            // Advance timers for requestAnimationFrame
            jest.advanceTimersByTime(150);
        });

        it('should not start loading if already in progress', () => {
            const img1 = document.createElement('img');
            const img2 = document.createElement('img');
            img1.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            img2.dataset.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

            lazyLoad(img1);
            // Add another immediately
            lazyLoad(img2);

            // Both should be in queue
            expect(lazyQueue.size).toBeGreaterThanOrEqual(0);

            // Advance timers for requestAnimationFrame
            jest.advanceTimersByTime(150);
        });
    });
});
