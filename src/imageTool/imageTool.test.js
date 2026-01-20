import { getDisplaySize, upscale, crop, getMaximumSize } from './imageTool';
import { jest } from '@jest/globals';

describe('imageTool', () => {
    let img;

    beforeEach(() => {
        img = document.createElement('img');
        img.width = 400;
        img.height = 300;
        Object.defineProperty(img, 'naturalWidth', { value: 800, writable: true });
        Object.defineProperty(img, 'naturalHeight', { value: 600, writable: true });
    });

    describe('getDisplaySize', () => {
        it('should calculate display size based on image dimensions', () => {
            const [width, height] = getDisplaySize(img);
            expect(width).toBe(400);
            expect(height).toBe(300);
        });

        it('should handle wider images', () => {
            img.width = 200;
            img.height = 300;
            Object.defineProperty(img, 'naturalWidth', { value: 800, writable: true });
            Object.defineProperty(img, 'naturalHeight', { value: 400, writable: true });
            
            const [width, height] = getDisplaySize(img);
            expect(width).toBe(200);
            expect(height).toBe(100);
        });

        it('should handle taller images', () => {
            img.width = 300;
            img.height = 200;
            Object.defineProperty(img, 'naturalWidth', { value: 400, writable: true });
            Object.defineProperty(img, 'naturalHeight', { value: 800, writable: true });
            
            const [width, height] = getDisplaySize(img);
            expect(width).toBe(100);
            expect(height).toBe(200);
        });
    });

    describe('upscale', () => {
        it('should upscale image to available space maintaining aspect ratio', () => {
            const container = document.createElement('div');
            container.style.width = '800px';
            container.style.height = '600px';
            document.body.appendChild(container);
            container.appendChild(img);

            const opt = { x: 0, y: 0, width: 400, height: 300, ratio: 1 };
            upscale(img, opt);

            expect(opt.width).toBeGreaterThan(400);
            expect(opt.height).toBeGreaterThan(300);
            expect(opt.ratio).toBeGreaterThan(1);

            document.body.removeChild(container);
        });

        it('should adjust for aspect ratio', () => {
            const container = document.createElement('div');
            container.style.width = '1000px';
            container.style.height = '400px';
            document.body.appendChild(container);
            container.appendChild(img);

            const opt = { x: 0, y: 0, width: 400, height: 300, ratio: 1 };
            upscale(img, opt);

            // Should upscale while maintaining aspect ratio
            expect(opt.width).toBeGreaterThan(0);
            expect(opt.height).toBeGreaterThan(0);
            // Verify aspect ratio is maintained (400/300 = 4/3)
            expect(opt.width / opt.height).toBeCloseTo(400 / 300, 1);

            document.body.removeChild(container);
        });

        it('should handle image without parent element', () => {
            const opt = { x: 100, y: 100, width: 400, height: 300, ratio: 1 };
            upscale(img, opt);

            // Should use window dimensions
            expect(opt.width).toBeGreaterThan(0);
            expect(opt.height).toBeGreaterThan(0);
        });

        it('should adjust coordinates based on conversion ratio', () => {
            const container = document.createElement('div');
            container.style.width = '800px';
            container.style.height = '600px';
            document.body.appendChild(container);
            container.appendChild(img);

            const opt = { x: 50, y: 75, width: 400, height: 300, ratio: 1 };
            upscale(img, opt);

            expect(opt.x).toBeGreaterThan(50);
            expect(opt.y).toBeGreaterThan(75);

            document.body.removeChild(container);
        });

        it('should constrain height when exceeds available space', () => {
            const container = document.createElement('div');
            // Mock client dimensions since JSDOM doesn't support layout
            Object.defineProperty(container, 'clientWidth', { value: 1200, writable: true });
            Object.defineProperty(container, 'clientHeight', { value: 400, writable: true });
            document.body.appendChild(container);
            container.appendChild(img);

            const opt = { x: 0, y: 0, width: 200, height: 600, ratio: 1 };
            upscale(img, opt);

            // Height should be constrained to available height (400)
            expect(opt.height).toBeLessThanOrEqual(400);

            document.body.removeChild(container);
        });
    });

    describe('crop', () => {
        it('should create canvas and return crop data', () => {
            // Mock canvas context
            const mockCanvas = document.createElement('canvas');
            mockCanvas.getContext = jest.fn(() => ({
                drawImage: jest.fn(),
                getImageData: jest.fn(() => ({})),
                putImageData: jest.fn()
            }));
            mockCanvas.toDataURL = jest.fn(() => 'data:image/png;base64,test');

            const originalCreateElement = document.createElement.bind(document);
            document.createElement = jest.fn((tag) => {
                if (tag === 'canvas') return mockCanvas;
                return originalCreateElement(tag);
            });

            document.body.appendChild(img);

            const opt = { x: 50, y: 50, width: 200, height: 150, ratio: 1 };
            const result = crop(img, opt);

            expect(result).toBeDefined();
            expect(result.canvas).toBe(mockCanvas);
            // crop calls upscale first, so dimensions will change
            expect(result.width).toBeGreaterThan(0);
            expect(result.height).toBeGreaterThan(0);

            document.body.removeChild(img);
            document.createElement = originalCreateElement;
        });

        it('should handle default crop options', () => {
            // Just test that it doesn't throw with basic mocking
            const mockCanvas = document.createElement('canvas');
            mockCanvas.getContext = jest.fn(() => null);
            mockCanvas.toDataURL = jest.fn(() => '');

            const originalCreateElement = document.createElement.bind(document);
            document.createElement = jest.fn((tag) => {
                if (tag === 'canvas') return mockCanvas;
                return originalCreateElement(tag);
            });

            document.body.appendChild(img);
            expect(() => crop(img)).not.toThrow();
            document.body.removeChild(img);
            document.createElement = originalCreateElement;
        });
    });

    describe('getMaximumSize', () => {
        it('should return default max size for small screens', () => {
            Object.defineProperty(window.screen, 'width', { value: 400, writable: true, configurable: true });
            Object.defineProperty(window.screen, 'height', { value: 300, writable: true, configurable: true });

            const size = getMaximumSize();
            expect(size).toBe(500);
        });

        it('should return appropriate size for medium screens', () => {
            Object.defineProperty(window.screen, 'width', { value: 900, writable: true, configurable: true });
            Object.defineProperty(window.screen, 'height', { value: 600, writable: true, configurable: true });

            const size = getMaximumSize();
            expect(size).toBe(1000);
        });

        it('should return appropriate size for large screens', () => {
            Object.defineProperty(window.screen, 'width', { value: 1400, writable: true, configurable: true });
            Object.defineProperty(window.screen, 'height', { value: 900, writable: true, configurable: true });

            const size = getMaximumSize();
            expect(size).toBe(1500);
        });

        it('should return max size for very large screens', () => {
            Object.defineProperty(window.screen, 'width', { value: 2600, writable: true, configurable: true });
            Object.defineProperty(window.screen, 'height', { value: 1600, writable: true, configurable: true });

            const size = getMaximumSize();
            expect(size).toBe(2500);
        });

        it('should use custom max size and breakpoints', () => {
            Object.defineProperty(window.screen, 'width', { value: 700, writable: true, configurable: true });
            Object.defineProperty(window.screen, 'height', { value: 500, writable: true, configurable: true });

            const size = getMaximumSize(3000, [600, 800, 1200]);
            expect(size).toBe(800);
        });

        it('should consider the larger dimension (height)', () => {
            Object.defineProperty(window.screen, 'width', { value: 600, writable: true, configurable: true });
            Object.defineProperty(window.screen, 'height', { value: 1100, writable: true, configurable: true });

            const size = getMaximumSize();
            expect(size).toBe(1500);
        });
    });
});
