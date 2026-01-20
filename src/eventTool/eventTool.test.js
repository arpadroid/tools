import { normalizeClientCoords, normalizeTouchEvent } from './eventTool';
import { jest } from '@jest/globals';

describe('eventTool', () => {
    describe('normalizeClientCoords', () => {
        it('should normalize mouse event coordinates', () => {
            const mouseEvent = new MouseEvent('click', {
                clientX: 100,
                clientY: 200
            });
            
            const result = normalizeClientCoords(mouseEvent);
            expect(result.clientX).toBe(100);
            expect(result.clientY).toBe(200);
        });

        it('should normalize touch event coordinates if Touch API available', () => {
            // Skip if Touch is not available (JSDOM)
            if (typeof Touch === 'undefined') {
                expect(true).toBe(true);
                return;
            }
            
            const touch = new Touch({
                identifier: 1,
                target: document.body,
                clientX: 150,
                clientY: 250
            });
            
            const touchEvent = new TouchEvent('touchstart', {
                changedTouches: [touch]
            });
            
            const result = normalizeClientCoords(touchEvent);
            expect(result.clientX).toBe(150);
            expect(result.clientY).toBe(250);
        });

        it('should return zero coordinates for touch event with no touches', () => {
            // Skip if TouchEvent is not available (JSDOM)
            if (typeof TouchEvent === 'undefined') {
                expect(true).toBe(true);
                return;
            }

            const touchEvent = new TouchEvent('touchstart', {
                changedTouches: []
            });
            
            const result = normalizeClientCoords(touchEvent);
            expect(result.clientX).toBe(0);
            expect(result.clientY).toBe(0);
        });

        it('should handle events without coordinates', () => {
            const event = new Event('custom');
            const result = normalizeClientCoords(event);
            expect(result.clientX).toBe(0);
            expect(result.clientY).toBe(0);
        });
    });

    describe('normalizeTouchEvent', () => {
        it('should normalize mouse event', () => {
            const target = document.createElement('div');
            document.body.appendChild(target);
            
            const mouseEvent = new MouseEvent('click', {
                clientX: 100,
                clientY: 200
            });
            
            Object.defineProperty(mouseEvent, 'target', {
                value: target,
                writable: true
            });
            
            const result = normalizeTouchEvent(mouseEvent);
            expect(result.clientX).toBe(100);
            expect(result.clientY).toBe(200);
            expect(result.target).toBe(target);
            
            document.body.removeChild(target);
        });

        it('should normalize touch event', () => {
            // Skip if Touch is not available (JSDOM)
            if (typeof Touch === 'undefined') {
                expect(true).toBe(true);
                return;
            }

            const target = document.createElement('div');
            target.style.position = 'absolute';
            target.style.left = '0px';
            target.style.top = '0px';
            target.style.width = '100px';
            target.style.height = '100px';
            document.body.appendChild(target);
            
            const touch = new Touch({
                identifier: 1,
                target: target,
                clientX: 50,
                clientY: 50
            });
            
            const touchEvent = new TouchEvent('touchstart', {
                changedTouches: [touch]
            });
            
            Object.defineProperty(touchEvent, 'target', {
                value: target,
                writable: true
            });
            
            // Mock elementFromPoint
            const originalElementFromPoint = document.elementFromPoint;
            document.elementFromPoint = jest.fn(() => target);
            
            const result = normalizeTouchEvent(touchEvent);
            expect(result.clientX).toBe(50);
            expect(result.clientY).toBe(50);
            expect(result.target).toBe(target);
            
            document.elementFromPoint = originalElementFromPoint;
            document.body.removeChild(target);
        });

        it('should handle touch event with no target found', () => {
            // Skip if Touch is not available (JSDOM)
            if (typeof Touch === 'undefined') {
                expect(true).toBe(true);
                return;
            }

            const touch = new Touch({
                identifier: 1,
                target: document.body,
                clientX: 50,
                clientY: 50
            });
            
            const touchEvent = new TouchEvent('touchstart', {
                changedTouches: [touch]
            });
            
            Object.defineProperty(touchEvent, 'target', {
                value: document.body,
                writable: true
            });
            
            // Mock elementFromPoint to return non-HTMLElement
            const originalElementFromPoint = document.elementFromPoint;
            document.elementFromPoint = jest.fn(() => null);
            
            const result = normalizeTouchEvent(touchEvent);
            expect(result.clientX).toBe(50);
            expect(result.clientY).toBe(50);
            expect(result.target).toBe(document.body);
            
            document.elementFromPoint = originalElementFromPoint;
        });

        it('should handle touch event without changedTouches', () => {
            const mouseEvent = new MouseEvent('click', {
                clientX: 100,
                clientY: 200
            });
            
            const result = normalizeTouchEvent(mouseEvent);
            expect(result.clientX).toBe(100);
            expect(result.clientY).toBe(200);
        });

        it('should handle elementFromPoint returning non-HTMLElement', () => {
            const originalElementFromPoint = document.elementFromPoint;
            document.elementFromPoint = jest.fn(() => document.createTextNode('text'));
            
            const touchEvent = {
                changedTouches: [{ clientX: 50, clientY: 50 }],
                target: document.body
            };
            
            const result = normalizeTouchEvent(touchEvent);
            expect(result.target).toBe(document.body);
            
            document.elementFromPoint = originalElementFromPoint;
        });
    });
});
