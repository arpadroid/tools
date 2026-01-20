import { jest } from '@jest/globals';
import {
    resetNodePlacement,
    getAvailableTop,
    getAvailableBottom,
    placeBottom,
    placeTop,
    placeCenterHorizontal,
    placeRight,
    placeY,
    placeX,
    placeNode
} from './placeTool';

describe('placeTool', () => {
    let node, refNode;

    beforeEach(() => {
        node = document.createElement('div');
        refNode = document.createElement('div');
        document.body.appendChild(node);
        document.body.appendChild(refNode);

        node.style.position = 'fixed';
        node.style.width = '100px';
        node.style.height = '100px';

        refNode.style.position = 'absolute';
        refNode.style.left = '50px';
        refNode.style.top = '50px';
        refNode.style.width = '200px';
        refNode.style.height = '50px';
    });

    afterEach(() => {
        // Clean up nodes if they're still attached to document.body
        if (node.parentNode === document.body) {
            document.body.removeChild(node);
        }
        if (refNode.parentNode === document.body) {
            document.body.removeChild(refNode);
        }
    });

    describe('resetNodePlacement', () => {
        it('should reset node placement styles', () => {
            node.style.right = '10px';
            node.style.top = '20px';
            node.style.bottom = '30px';
            node.style.left = '40px';
            node.style.height = '50px';
            node.style.width = '60px';

            resetNodePlacement(node);

            expect(node.style.right).toBe('');
            expect(node.style.top).toBe('');
            expect(node.style.bottom).toBe('');
            expect(node.style.left).toBe('');
            expect(node.style.height).toBe('');
            expect(node.style.width).toBe('');
            expect(node.style.position).toBe('fixed');
            expect(node.style.visibility).toBe('visible');
        });
    });

    describe('getAvailableTop', () => {
        it('should return available space above node', () => {
            const space = getAvailableTop(refNode);
            expect(typeof space).toBe('number');
            expect(space).toBeGreaterThanOrEqual(0);
        });
    });

    describe('getAvailableBottom', () => {
        it('should return available space below node', () => {
            const space = getAvailableBottom(refNode);
            expect(typeof space).toBe('number');
            expect(space).toBeGreaterThanOrEqual(0);
        });
    });

    describe('placeBottom', () => {
        it('should place node below reference node', () => {
            const opt = { offset: 10, verticalOffset: 5, horizontalOffset: 15 };
            placeBottom(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();
            expect(node.style.right).toBe('auto');
        });

        it('should use offset when specific offsets not provided', () => {
            const opt = { offset: 10 };
            placeBottom(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();
        });

        it('should handle zero offset', () => {
            const opt = { offset: 0 };
            placeBottom(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();
        });
    });

    describe('placeTop', () => {
        it('should place node above reference node', () => {
            const opt = { offset: 10, verticalOffset: 5, horizontalOffset: 15 };
            placeTop(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();
            expect(node.style.right).toBe('auto');
        });

        it('should use offset when specific offsets not provided', () => {
            const opt = { offset: 10 };
            placeTop(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();
        });
    });

    describe('placeCenterHorizontal', () => {
        it('should center node horizontally relative to reference node', () => {
            placeCenterHorizontal(node, refNode);

            expect(node.style.left).toBeTruthy();
            expect(node.style.right).toBe('auto');
        });
    });

    describe('placeRight', () => {
        it('should place node to the right of reference node', () => {
            const opt = { offset: 10, horizontalOffset: 15 };
            placeRight(node, refNode, opt);

            expect(node.style.left).toBeTruthy();
            expect(node.style.right).toBe('auto');
        });

        it('should use offset when horizontalOffset not provided', () => {
            const opt = { offset: 10 };
            placeRight(node, refNode, opt);

            expect(node.style.left).toBeTruthy();
        });
    });

    describe('placeY', () => {
        it('should place node at bottom position', () => {
            const opt = { position: 'bottom-right', offset: 10 };
            placeY(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
        });

        it('should place node at top position', () => {
            const opt = { position: 'top-right', offset: 10 };
            placeY(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
        });

        it('should adjust placement if not enough space at bottom', () => {
            // Mock to simulate not enough space at bottom
            refNode.style.top = `${window.innerHeight - 50}px`;
            node.style.height = '200px';

            const opt = { position: 'bottom-right', offset: 10 };
            placeY(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
        });

        it('should adjust placement if not enough space at top', () => {
            refNode.style.top = '10px';
            node.style.height = '200px';

            const opt = { position: 'top-right', offset: 10 };
            placeY(node, refNode, opt);

            expect(node.style.top).toBeTruthy();
        });

        it('should swap to bottom when top space is insufficient', () => {
            node.getBoundingClientRect = jest.fn(() => ({ height: 200 }));
            refNode.getBoundingClientRect = jest.fn(() => ({ top: 50, bottom: 100 }));
            window.innerHeight = 600;

            const opt = { position: 'top', offset: 10 };
            placeY(node, refNode, opt);

            expect(node.style.position).toBe('fixed');
        });

        it('should swap to top when bottom space is insufficient', () => {
            node.getBoundingClientRect = jest.fn(() => ({ height: 200 }));
            refNode.getBoundingClientRect = jest.fn(() => ({ top: 400, bottom: 450 }));
            window.innerHeight = 500;

            const opt = { position: 'bottom', offset: 10 };
            placeY(node, refNode, opt);

            expect(node.style.position).toBe('fixed');
        });
    });

    describe('placeX', () => {
        it('should place node to the right', () => {
            const opt = { position: 'bottom-right', offset: 10 };
            placeX(node, refNode, opt);

            expect(node.style.left).toBeTruthy();
        });

        it('should center node horizontally', () => {
            const opt = { position: 'bottom-center', offset: 10 };
            placeX(node, refNode, opt);

            expect(node.style.left).toBeTruthy();
        });

        it('should handle position without horizontal directive', () => {
            const opt = { position: 'bottom', offset: 10 };
            placeX(node, refNode, opt);

            // Should not throw error
            expect(node.style.left).toBeDefined();
        });
    });

    describe('placeNode', () => {
        it('should place node relative to reference node', () => {
            const options = { position: 'bottom-right', offset: 10 };
            placeNode(node, refNode, options);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();
        });

        it('should use default options when not provided', () => {
            placeNode(node, refNode);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();
        });

        it('should use parent element as reference if not provided', () => {
            const parent = document.createElement('div');
            parent.style.position = 'absolute';
            parent.style.left = '100px';
            parent.style.top = '100px';
            document.body.appendChild(parent);
            parent.appendChild(node);

            placeNode(node);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();

            document.body.removeChild(parent);
        });

        it('should append to custom container', () => {
            const container = document.createElement('div');
            document.body.appendChild(container);

            const options = {
                position: 'bottom-right',
                offset: 10,
                container: container
            };

            placeNode(node, refNode, options);

            expect(node.parentNode).toBe(container);

            // Clean up: remove container which contains the node
            document.body.removeChild(container);
            // Remove node from afterEach cleanup since it's already removed with container
            node.remove();
        });

        it('should not append if already in correct container', () => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            // Remove from body before adding to container
            document.body.removeChild(node);
            container.appendChild(node);

            const options = {
                position: 'bottom-right',
                offset: 10,
                container: container
            };

            placeNode(node, refNode, options);

            expect(node.parentNode).toBe(container);

            // Clean up: remove container which contains the node
            document.body.removeChild(container);
        });

        it('should use custom offsets', () => {
            const options = {
                position: 'bottom-right',
                offset: 5,
                verticalOffset: 10,
                horizontalOffset: 15
            };

            placeNode(node, refNode, options);

            expect(node.style.top).toBeTruthy();
            expect(node.style.left).toBeTruthy();
        });
    });
});
