import {
    attr,
    setContent,
    isInView,
    addContent,
    style,
    prepend,
    resolveNode,
    getAttributes,
    getAttributesWithPrefix,
    appendNodes,
    setNodes,
    getScrollableParent,
    getOffset,
    onDoubleClick,
    addCssRule,
    listen
} from './nodeTool';
import { jest } from '@jest/globals';

describe('nodeTool', () => {
    let node;

    beforeEach(() => {
        // Create a new node before each test
        node = document.createElement('div');
    });

    afterEach(() => {
        // Clean up the node after each test
        node = null;
    });

    describe('attr', () => {
        it('should add attributes to a node', () => {
            attr(node, { id: 'myId', class: 'myClass' });
            expect(node.getAttribute('id')).toBe('myId');
            expect(node.getAttribute('class')).toBe('myClass');
        });

        it('should remove attributes if they are set to undefined, null or false', () => {
            node.id = 'myId';
            node.className = 'myClass';
            attr(node, { id: undefined, class: null });
            expect(node.getAttribute('id')).toBeNull();
            expect(node.getAttribute('class')).toBeNull();
        });

        it('should handle null node gracefully', () => {
            expect(() => attr(null, { id: 'test' })).not.toThrow();
        });

        it('should handle non-object attributes', () => {
            expect(() => attr(node, 'notAnObject')).not.toThrow();
        });

        it('should respect override flag', () => {
            node.setAttribute('id', 'original');
            attr(node, { id: 'new' }, false);
            expect(node.getAttribute('id')).toBe('original');
        });
    });

    describe('setContent', () => {
        it('should set string content to a node', () => {
            const content = 'Some content';
            setContent(node, content);
            expect(node.textContent).toBe(content);
        });
        it('should set node content to a node', () => {
            const content = document.createElement('span');
            setContent(node, content);
            expect(node.firstChild).toBe(content);
        });
    });

    describe('isInView', () => {
        it('should return true if the node is in the viewport', () => {
            // Mock the necessary properties and methods for testing
            node.getBoundingClientRect = jest.fn(() => ({
                top: 0,
                bottom: 100,
                left: 0,
                right: 100
            }));
            window.innerHeight = 500;
            window.innerWidth = 500;

            expect(isInView(node)).toBe(true);
        });

        it('should return false if the node is not in the viewport', () => {
            // Mock the necessary properties and methods for testing
            node.getBoundingClientRect = jest.fn(() => ({
                top: 600,
                bottom: 700,
                left: 600,
                right: 700
            }));
            window.innerHeight = 500;
            window.innerWidth = 500;

            expect(isInView(node)).toBe(false);
        });
    });

    describe('addContent', () => {
        it('should add content to a node', () => {
            addContent(node, 'Hello, world!');
            expect(node.innerHTML).toBe('Hello, world!');
        });

        it('should add HTMLElement content to a node', () => {
            const span = document.createElement('span');
            span.textContent = 'test';
            addContent(node, span);
            expect(node.firstChild).toBe(span);
        });

        it('should handle unsupported content types', () => {
            addContent(node, 123);
            expect(node.innerHTML).toBe('');
        });
    });

    describe('style', () => {
        it('should style a node', () => {
            style(node, { color: 'red', fontSize: '16px' });
            expect(node.style.color).toBe('red');
            expect(node.style.fontSize).toBe('16px');
        });

        it('should not style a node if the css object is empty', () => {
            style(node);
            expect(node.style.color).toBe('');
            expect(node.style.fontSize).toBe('');
        });
    });

    describe('prepend', () => {
        it('should prepend a child node to a parent node', () => {
            const childNode = document.createElement('span');
            const firstChild = document.createElement('div');
            node.appendChild(firstChild);
            prepend(node, childNode);
            expect(node.firstChild).toBe(childNode);
        });

        it('should append when no firstChild exists', () => {
            const childNode = document.createElement('span');
            prepend(node, childNode);
            expect(node.firstChild).toBe(childNode);
        });

        it('should handle null child', () => {
            expect(() => prepend(node, null)).not.toThrow();
        });
    });

    describe('resolveNode', () => {
        it('should resolve a node', () => {
            const resolvedNode = resolveNode(node);
            expect(resolvedNode).toBe(node);
        });

        it('should resolve a node by ID', () => {
            node.id = 'myId';
            document.body.appendChild(node);
            const resolvedNode = resolveNode('#myId');
            expect(resolvedNode).toBe(node);
        });

        it('should return null if the node cannot be resolved', () => {
            const resolvedNode = resolveNode('#nonExistentId');
            expect(resolvedNode).toBeFalsy();
        });

        it('should resolve DocumentFragment with single child', () => {
            const fragment = document.createDocumentFragment();
            const div = document.createElement('div');
            fragment.appendChild(div);
            const resolved = resolveNode(fragment);
            expect(resolved).toBe(div);
        });

        it('should return null for empty DocumentFragment', () => {
            const fragment = document.createDocumentFragment();
            const resolved = resolveNode(fragment);
            expect(resolved).toBeNull();
        });

        it('should use closest when querySelector fails', () => {
            const parent = document.createElement('div');
            parent.className = 'parent';
            const child = document.createElement('div');
            parent.appendChild(child);
            document.body.appendChild(parent);
            
            const resolved = resolveNode('.parent', child);
            expect(resolved).toBe(parent);
            
            document.body.removeChild(parent);
        });

        it('should return node as-is for unsupported types', () => {
            const obj = { custom: 'object' };
            const resolved = resolveNode(obj);
            expect(resolved).toBe(obj);
        });
    });

    describe('getAttributes', () => {
        it('should return all attributes of a node', () => {
            attr(node, { id: 'test', 'data-value': 'hello' });
            node.setAttribute('disabled', '');
            const attributes = getAttributes(node);
            expect(attributes.id).toBe('test');
            expect(attributes['data-value']).toBe('hello');
            expect(attributes.disabled).toBe(true);
        });

        it('should convert empty string to true', () => {
            node.setAttribute('disabled', '');
            const attributes = getAttributes(node);
            expect(attributes.disabled).toBe(true);
        });

        it('should convert "false" string to false', () => {
            node.setAttribute('hidden', 'false');
            const attributes = getAttributes(node);
            expect(attributes.hidden).toBe(false);
        });
    });

    describe('getAttributesWithPrefix', () => {
        it('should return attributes with specific prefix', () => {
            attr(node, { 'data-id': '123', 'data-name': 'test', 'aria-label': 'label' });
            const dataAttrs = getAttributesWithPrefix(node, 'data-');
            expect(dataAttrs.id).toBe('123');
            expect(dataAttrs.name).toBe('test');
            expect(dataAttrs['aria-label']).toBeUndefined();
        });

        it('should return empty object if no matching attributes', () => {
            attr(node, { id: 'test' });
            const dataAttrs = getAttributesWithPrefix(node, 'data-');
            expect(Object.keys(dataAttrs).length).toBe(0);
        });
    });

    describe('appendNodes', () => {
        it('should append multiple nodes to container', () => {
            const child1 = document.createElement('span');
            const child2 = document.createElement('span');
            appendNodes(node, [child1, child2]);
            expect(node.children.length).toBe(2);
            expect(node.children[0]).toBe(child1);
            expect(node.children[1]).toBe(child2);
        });

        it('should prepend nodes when prepend is true', () => {
            const existing = document.createElement('span');
            node.appendChild(existing);
            const child1 = document.createElement('span');
            appendNodes(node, [child1], true);
            expect(node.firstChild).toBe(child1);
        });

        it('should handle empty nodes array', () => {
            appendNodes(node, []);
            expect(node.children.length).toBe(0);
        });

        it('should handle null container', () => {
            expect(() => appendNodes(null, [document.createElement('div')])).not.toThrow();
        });
    });

    describe('setNodes', () => {
        it('should replace all nodes in container', () => {
            node.innerHTML = '<span>Old</span>';
            const child1 = document.createElement('div');
            const child2 = document.createElement('div');
            setNodes(node, [child1, child2]);
            expect(node.children.length).toBe(2);
            expect(node.querySelector('span')).toBeNull();
        });
    });

    describe('getScrollableParent', () => {
        it('should find scrollable parent', () => {
            const parent = document.createElement('div');
            parent.style.overflow = 'auto';
            parent.style.height = '100px';
            parent.appendChild(node);
            Object.defineProperty(parent, 'scrollTop', { value: 10, writable: true });
            
            const result = getScrollableParent(node);
            expect(result).toBe(parent);
        });

        it('should return null if no scrollable parent', () => {
            const result = getScrollableParent(node);
            expect(result).toBeNull();
        });

        it('should handle null node', () => {
            const result = getScrollableParent(null);
            expect(result).toBeNull();
        });
    });

    describe('getOffset', () => {
        it('should return offset of node', () => {
            const [left, top] = getOffset(node);
            expect(typeof left).toBe('number');
            expect(typeof top).toBe('number');
        });
    });

    describe('onDoubleClick', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('should trigger callback on double click', () => {
            const callback = jest.fn();
            onDoubleClick(node, callback, 100);
            
            node.click();
            node.click();
            
            expect(callback).toHaveBeenCalled();
        });

        it('should not trigger on single click', () => {
            const callback = jest.fn();
            onDoubleClick(node, callback, 100);
            
            node.click();
            jest.advanceTimersByTime(150);
            
            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('addCssRule', () => {
        it('should add CSS rule to document', () => {
            addCssRule('.test-class', 'color: red;');
            const style = document.getElementById('test-class');
            expect(style).toBeTruthy();
            expect(style?.innerHTML).toContain('.test-class');
            expect(style?.innerHTML).toContain('color: red;');
        });

        it('should not duplicate CSS rules', () => {
            addCssRule('.unique-class', 'color: blue;');
            addCssRule('.unique-class', 'color: green;');
            const styles = document.querySelectorAll('#unique-class');
            expect(styles.length).toBe(1);
        });
    });

    describe('listen', () => {
        it('should add event listener to node', () => {
            const callback = jest.fn();
            listen(node, 'click', callback);
            node.click();
            expect(callback).toHaveBeenCalled();
        });

        it('should add multiple event listeners', () => {
            const callback = jest.fn();
            listen(node, ['click', 'mousedown'], callback);
            node.click();
            node.dispatchEvent(new Event('mousedown'));
            expect(callback).toHaveBeenCalledTimes(2);
        });

        it('should handle multiple nodes', () => {
            const node2 = document.createElement('div');
            const callback = jest.fn();
            listen([node, node2], 'click', callback);
            node.click();
            node2.click();
            expect(callback).toHaveBeenCalledTimes(2);
        });

        it('should remove and re-add listener', () => {
            const callback = jest.fn();
            listen(node, 'click', callback);
            listen(node, 'click', callback);
            node.click();
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should skip non-HTMLElement nodes', () => {
            const callback = jest.fn();
            expect(() => listen([node, null, {}], 'click', callback)).not.toThrow();
        });
    });
});
