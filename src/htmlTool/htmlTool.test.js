/* eslint-disable sonarjs/no-duplicate-string */

import {
    attrString,
    classNames,
    mapHTML,
    removeHTML,
    renderAttr,
    renderNode,
    processTemplateRegex,
    render
} from './htmlTool';

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
            expect(removeHTML('<div>Hello <strong>World</strong></div>')).toBe('Hello World');
            expect(removeHTML('')).toBe('');
            expect(removeHTML('<div><span></span></div>')).toBe('');
        });
    });

    describe('renderNode', () => {
        it('should return null for empty/null/undefined/whitespace strings', () => {
            expect(renderNode('')).toBeNull();
            expect(renderNode('   ')).toBeNull();
            expect(renderNode(null)).toBeNull();
            expect(renderNode(undefined)).toBeNull();
        });

        it('should return a node with correct properties', () => {
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
            expect(attrString({})).toBe('');
        });

        it('should handle number attributes', () => {
            expect(attrString({ count: 5 })).toContain('count="5"');
        });
    });

    describe('classNames', () => {
        it('should return a string with unique class names and handle various input types', () => {
            const result = classNames('class1 class2  class1 ', 'class2', { class3: true, class4: false }, [
                'class5',
                { class6: true, class2: true }
            ]);
            expect(result).toBe('class1 class2 class3 class5 class6');
            expect(classNames(undefined, null, false, '', {}, [])).toBe('');
        });
    });

    describe('processTemplateRegex', () => {
        it('should replace placeholders with props', () => {
            expect(processTemplateRegex('Hello {name}, you are {age} years old', { name: 'John', age: '30' }))
                .toBe('Hello John, you are 30 years old');
            expect(processTemplateRegex('{name} and {name}', { name: 'John' })).toBe('John and John');
        });

        it('should handle missing or empty props', () => {
            expect(processTemplateRegex('Hello {name}, you are {age} years old', { name: 'John' }))
                .toBe('Hello John, you are  years old');
            expect(processTemplateRegex('Hello {name}')).toBe('Hello ');
            expect(processTemplateRegex('Hello World', {})).toBe('Hello World');
        });
    });

    describe('render', () => {
        it('should render HTML when condition is truthy', () => {
            expect(render(true, '<div>Content</div>')).toBe('<div>Content</div>');
            expect(render(() => true, '<div>Content</div>')).toBe('<div>Content</div>');
            expect(render(1, '<div>Content</div>')).toBe('<div>Content</div>');
            expect(render('yes', '<div>Content</div>')).toBe('<div>Content</div>');
            expect(render({}, '<div>Content</div>')).toBe('<div>Content</div>');
        });

        it('should not render HTML when condition is falsy', () => {
            expect(render(false, '<div>Content</div>')).toBe('');
            expect(render(() => false, '<div>Content</div>')).toBe('');
            expect(render(0, '<div>Content</div>')).toBe('');
            expect(render('', '<div>Content</div>')).toBe('');
            expect(render(null, '<div>Content</div>')).toBe('');
        });

        it('should trim HTML output', () => {
            expect(render(true, '  <div>Content</div>  ')).toBe('<div>Content</div>');
        });
    });
});
