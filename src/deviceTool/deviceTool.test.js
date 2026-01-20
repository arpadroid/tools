import {
    isOperaPhone,
    isIE11,
    isIE,
    isEdge,
    isFirefox,
    isIOSPhone,
    isWebkit,
    isChrome,
    isSafari,
    isIOsSafari,
    getViewportWidth,
    getViewportHeight,
    getViewportSize,
    goFullScreen,
    exitFullScreen
} from './deviceTool';
import { jest } from '@jest/globals';

describe('deviceTool', () => {
    let originalUserAgent;

    beforeEach(() => {
        originalUserAgent = navigator.userAgent;
    });

    afterEach(() => {
        Object.defineProperty(navigator, 'userAgent', {
            value: originalUserAgent,
            writable: true,
            configurable: true
        });
    });

    describe('isOperaPhone', () => {
        it('should detect Opera Mini', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Opera Mini/7.1.32444',
                writable: true,
                configurable: true
            });
            expect(isOperaPhone()).toBe(true);
        });

        it('should return false for non-Opera Mini browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0',
                writable: true,
                configurable: true
            });
            expect(isOperaPhone()).toBe(false);
        });
    });

    describe('isIE11', () => {
        it('should detect IE11', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
                writable: true,
                configurable: true
            });
            expect(isIE11()).toBe(true);
        });

        it('should return false for non-IE11 browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 Chrome/91.0',
                writable: true,
                configurable: true
            });
            expect(isIE11()).toBe(false);
        });
    });

    describe('isIE', () => {
        it('should detect IE with msie in user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1)',
                writable: true,
                configurable: true
            });
            expect(isIE()).toBe(true);
        });

        it('should detect IE11', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
                writable: true,
                configurable: true
            });
            expect(isIE()).toBe(true);
        });

        it('should return false for non-IE browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 Chrome/91.0',
                writable: true,
                configurable: true
            });
            expect(isIE()).toBe(false);
        });
    });

    describe('isEdge', () => {
        it('should detect Edge browser', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/18.0',
                writable: true,
                configurable: true
            });
            expect(isEdge()).toBe(true);
        });

        it('should return false for non-Edge browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 Chrome/91.0',
                writable: true,
                configurable: true
            });
            expect(isEdge()).toBe(false);
        });
    });

    describe('isFirefox', () => {
        it('should detect Firefox browser', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
                writable: true,
                configurable: true
            });
            expect(isFirefox()).toBe(true);
        });

        it('should return false for non-Firefox browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 Chrome/91.0',
                writable: true,
                configurable: true
            });
            expect(isFirefox()).toBe(false);
        });
    });

    describe('isIOSPhone', () => {
        it('should detect iPhone', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)',
                writable: true,
                configurable: true
            });
            expect(isIOSPhone()).toBe(true);
        });

        it('should detect iPad', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X)',
                writable: true,
                configurable: true
            });
            expect(isIOSPhone()).toBe(true);
        });

        it('should detect iPod', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPod touch; CPU iPhone OS 14_6 like Mac OS X)',
                writable: true,
                configurable: true
            });
            expect(isIOSPhone()).toBe(true);
        });

        it('should return false for non-iOS devices', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0) Chrome/91.0',
                writable: true,
                configurable: true
            });
            expect(isIOSPhone()).toBe(false);
        });
    });

    describe('isWebkit', () => {
        it('should detect WebKit browser', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
                writable: true,
                configurable: true
            });
            expect(isWebkit()).toBe(true);
        });

        it('should return false for non-WebKit browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Trident/7.0)',
                writable: true,
                configurable: true
            });
            expect(isWebkit()).toBe(false);
        });
    });

    describe('isChrome', () => {
        it('should detect Chrome browser', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
                writable: true,
                configurable: true
            });
            expect(isChrome()).toBe(true);
        });

        it('should return false for Edge (contains chrome but is Edge)', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0 Edge/18.0',
                writable: true,
                configurable: true
            });
            expect(isChrome()).toBe(false);
        });

        it('should return false for non-Chrome browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 Firefox/89.0',
                writable: true,
                configurable: true
            });
            expect(isChrome()).toBe(false);
        });
    });

    describe('isSafari', () => {
        it('should detect Safari browser', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15',
                writable: true,
                configurable: true
            });
            expect(isSafari()).toBe(true);
        });

        it('should return false for Chrome (contains safari but is Chrome)', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 Safari/537.36 Chrome/91.0',
                writable: true,
                configurable: true
            });
            expect(isSafari()).toBe(false);
        });

        it('should return false for non-Safari browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 Firefox/89.0',
                writable: true,
                configurable: true
            });
            expect(isSafari()).toBe(false);
        });
    });

    describe('isIOsSafari', () => {
        it('should return true for iOS devices', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)',
                writable: true,
                configurable: true
            });
            expect(isIOsSafari()).toBe(true);
        });

        it('should return true for Safari browser', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15',
                writable: true,
                configurable: true
            });
            expect(isIOsSafari()).toBe(true);
        });

        it('should return false for non-iOS non-Safari browsers', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 Chrome/91.0',
                writable: true,
                configurable: true
            });
            expect(isIOsSafari()).toBe(false);
        });
    });

    describe('getViewportWidth', () => {
        it('should return the viewport width', () => {
            const width = getViewportWidth();
            expect(typeof width).toBe('number');
            expect(width).toBeGreaterThan(0);
        });
    });

    describe('getViewportHeight', () => {
        it('should return the viewport height', () => {
            const height = getViewportHeight();
            expect(typeof height).toBe('number');
            expect(height).toBeGreaterThan(0);
        });
    });

    describe('getViewportSize', () => {
        it('should return an array with width and height', () => {
            const [width, height] = getViewportSize();
            expect(typeof width).toBe('number');
            expect(typeof height).toBe('number');
            expect(width).toBeGreaterThan(0);
            expect(height).toBeGreaterThan(0);
        });
    });

    describe('goFullScreen', () => {
        it('should call requestFullscreen on the node', () => {
            const node = document.createElement('div');
            node.requestFullscreen = jest.fn();
            goFullScreen(node);
            expect(node.requestFullscreen).toHaveBeenCalled();
        });

        it('should call webkitRequestFullscreen for Safari', () => {
            const node = document.createElement('div');
            node.webkitRequestFullscreen = jest.fn();
            goFullScreen(node);
            expect(node.webkitRequestFullscreen).toHaveBeenCalled();
        });

        it('should call msRequestFullscreen for IE11', () => {
            const node = document.createElement('div');
            node.msRequestFullscreen = jest.fn();
            goFullScreen(node);
            expect(node.msRequestFullscreen).toHaveBeenCalled();
        });
    });

    describe('exitFullScreen', () => {
        it('should call exitFullscreen on document', () => {
            const mockExitFullscreen = jest.fn();
            delete document.exitFullscreen;
            delete document.webkitExitFullscreen;
            delete document.msExitFullscreen;
            document.exitFullscreen = mockExitFullscreen;
            exitFullScreen();
            expect(mockExitFullscreen).toHaveBeenCalled();
        });

        it('should call webkitExitFullscreen for Safari', () => {
            const mockWebkitExitFullscreen = jest.fn();
            delete document.exitFullscreen;
            delete document.webkitExitFullscreen;
            delete document.msExitFullscreen;
            document.webkitExitFullscreen = mockWebkitExitFullscreen;
            exitFullScreen();
            expect(mockWebkitExitFullscreen).toHaveBeenCalled();
        });

        it('should call msExitFullscreen for IE11', () => {
            const mockMsExitFullscreen = jest.fn();
            delete document.exitFullscreen;
            delete document.webkitExitFullscreen;
            delete document.msExitFullscreen;
            document.msExitFullscreen = mockMsExitFullscreen;
            exitFullScreen();
            expect(mockMsExitFullscreen).toHaveBeenCalled();
        });
    });
});
