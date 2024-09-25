import {
    attr,
    setContent,
    isInView,
    addContent,
    style,
    prepend,
    resolveNode
} from './nodeTool';

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
            prepend(node, childNode);
            expect(node.firstChild).toBe(childNode);
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
    });
});
