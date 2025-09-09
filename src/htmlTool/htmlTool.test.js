/* eslint-disable sonarjs/no-duplicate-string */

import { attrString, classNames, mapHTML, removeHTML, renderAttr, renderNode } from './htmlTool';

describe('htmlTool', () => {
    describe('mapHTML', () => {
        it('should map an array of items to an HTML string', () => {
            const result = mapHTML(['item1', 'item2'], item => `<div>${item}</div>`);
            expect(result).toBe('<div>item1</div><div>item2</div>');
        });
    });

    describe('renderAttr', () => {
        it('should return a rendered attribute', () => {
            const result = renderAttr('data-test', 'value');
            expect(result).toBe('data-test="value"');
        });
    });

    describe('removeHTML', () => {
        it('should remove HTML tags from a string', () => {
            const result = removeHTML('<div>Hello <strong>World</strong></div>');
            expect(result).toBe('Hello World');
        });

        it('should return an empty string if input is empty or has no text', () => {
            expect(removeHTML('')).toBe('');
            expect(removeHTML('<div><span></span></div>')).toBe('');
        });
    });

    describe('renderNode', () => {
        it('should return null for empty or whitespace-only strings', () => {
            expect(renderNode('')).toBeNull();
            expect(renderNode('   ')).toBeNull();
            expect(renderNode(null)).toBeNull();
            expect(renderNode(undefined)).toBeNull();
        });

        it('should return a node', () => {
            const result = renderNode('<div class="hello">Hello</div>');
            expect(result).toBeInstanceOf(HTMLElement);
            expect(result?.classList.contains('hello')).toBe(true);
            expect(result?.tagName).toBe('DIV');
            expect(result?.textContent).toBe('Hello');
        });
    });
    describe('attrString', () => {
        it('should return a string with the attributes', () => {
            const result = attrString({
                id: 'test',
                disabled: true,
                hidden: false,
                'data-value': '123',
                style: '',
                tabindex: 0,
                'aria-label': 'label',
                items: ['item1', 'item2']
            });
            expect(result).toBe('id="test" disabled data-value="123" aria-label="label" items="item1,item2"');
        });

        it('should return an empty string if no attributes are provided', () => {
            const result = attrString({});
            expect(result).toBe('');
        });
    });

    describe('classNames', () => {
        it('should return a string with the class names', () => {
            const result = classNames('class1 class2  class1 ', 'class2', { class3: true, class4: false }, [
                'class5',
                { class6: true, class2: true }
            ]);
            expect(result).toBe('class1 class2 class3 class5 class6');
        });

        it('should return an empty string if no class names are provided', () => {
            const result = classNames(undefined, null, false, '', {}, []);
            expect(result).toBe('');
        });
    });
});
