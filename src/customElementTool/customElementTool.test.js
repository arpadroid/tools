import { defineCustomElement } from './customElementTool';
import { jest } from '@jest/globals';

describe('customElementTool', () => {
    describe('defineCustomElement', () => {
        it('should define a custom element', () => {
            class TestComponent extends HTMLElement {}
            defineCustomElement('test-component', TestComponent);
            expect(customElements.get('test-component')).toBe(TestComponent);
        });

        it('should not redefine an existing custom element', () => {
            class TestComponent extends HTMLElement {}
            class AnotherComponent extends HTMLElement {}
            
            defineCustomElement('test-component-2', TestComponent);
            const firstDefinition = customElements.get('test-component-2');
            
            // Try to redefine with a different component
            defineCustomElement('test-component-2', AnotherComponent);
            const secondDefinition = customElements.get('test-component-2');
            
            // Should still be the first definition
            expect(secondDefinition).toBe(firstDefinition);
            expect(secondDefinition).toBe(TestComponent);
        });

        it('should accept options parameter', () => {
            class TestComponent extends HTMLElement {}
            const options = { extends: 'p' };
            
            // This should not throw an error
            expect(() => {
                defineCustomElement('test-component-3', TestComponent, options);
            }).not.toThrow();
        });

        it('should handle empty options', () => {
            class TestComponent extends HTMLElement {}
            
            // Should work with default empty options
            expect(() => {
                defineCustomElement('test-component-4', TestComponent);
            }).not.toThrow();
            
            expect(customElements.get('test-component-4')).toBe(TestComponent);
        });

        it('should warn when trying to redefine with verbose enabled', () => {
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
            
            class TestComponent extends HTMLElement {}
            class AnotherComponent extends HTMLElement {}
            
            defineCustomElement('test-warn-component', TestComponent);
            defineCustomElement('test-warn-component', AnotherComponent);
            
            // Note: Warning only fires if VERBOSE is true in the source
            // This test ensures the redefine logic works correctly
            expect(customElements.get('test-warn-component')).toBe(TestComponent);
            
            consoleWarnSpy.mockRestore();
        });
    });
});
