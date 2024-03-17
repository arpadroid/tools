/**
 * @module placeTool
 * @description A set of tools for placing nodes in the document.
 */
/**
 * @typedef {import("./placeToolInterface").PlaceToolOptionsInterface} PlaceToolOptionsInterface
 */
import { style } from './nodeTool';
import { mergeObjects } from './objectTool';

/**
 * The default options for placing a node.
 * @type {PlaceToolOptionsInterface}
 * @ignore
 */
const defaultOptions = {
    position: 'bottom-right',
    offset: 4,
    verticalOffset: 4,
    horizontalOffset: 4,
    container: document.body
};

/**
 * Merges the default options with the given options.
 * @param {PlaceToolOptionsInterface} [options] - The options to merge with the default options.
 * @returns {PlaceToolOptionsInterface} - The merged options.
 * @ignore
 */
const getOptions = (options = {}) => {
    return mergeObjects(defaultOptions, options);
};

/**
 * Resets the placement of a node.
 * @param {HTMLElement} node - The node to reset.
 */
export function resetNodePlacement(node) {
    style(node, {
        right: '',
        top: '',
        bottom: '',
        left: '',
        height: '',
        width: '',
        maxHeight: '',
        position: 'fixed',
        visibility: 'visible'
    });
}

/**
 * Gets the available space above a node.
 * @param {HTMLElement} node - The node to check.
 * @returns {number} - The available space above the node.
 */
export function getAvailableTop(node) {
    return node?.getBoundingClientRect()?.top;
}

/**
 * Gets the available space below a node.
 * @param {HTMLElement} node - The node to check.
 * @returns {number} - The available space below the node.
 */
export function getAvailableBottom(node) {
    const rect = node.getBoundingClientRect();
    return window.innerHeight - rect.bottom;
}

/**
 * Places a node in a fixed position below another node in the document.
 * @param {HTMLElement} node - The node to be placed.
 * @param {HTMLElement} refNode - The reference node below which the subject node will be placed.
 * @param {PlaceToolOptionsInterface} opt - The options for placing the node.
 */
export function placeBottom(node, refNode, opt) {
    const { offset, verticalOffset, horizontalOffset } = opt;
    const refRect = refNode.getBoundingClientRect();
    style(node, {
        top: `${refRect.bottom + verticalOffset ?? offset}px`,
        left: `${refRect.left + horizontalOffset ?? offset}px`,
        right: 'auto'
    });
}

/**
 * Places a node in a fixed position above another node in the document.
 * @param {HTMLElement} node - The node to be placed.
 * @param {HTMLElement} refNode - The reference node above which the subject node will be placed.
 * @param {PlaceToolOptionsInterface} opt - The options for placing the node.
 */
export function placeTop(node, refNode, opt) {
    const refRect = refNode.getBoundingClientRect();
    const { offset, verticalOffset, horizontalOffset } = opt;
    style(node, {
        top: `${refRect.top - node.offsetHeight - (verticalOffset ?? offset)}px`,
        left: `${refRect.left + (horizontalOffset ?? offset)}px`,
        right: 'auto'
    });
}

/**
 * Centers a node horizontally.
 * @param {HTMLElement} node - The node to be centered.
 * @param {HTMLElement} refNode - The reference node against which the node will be centered.
 */
export function placeCenterHorizontal(node, refNode) {
    const refRect = refNode.getBoundingClientRect();
    const left = refRect.left + refNode.offsetWidth / 2 - node.offsetWidth / 2;
    style(node, {
        left: `${left}px`,
        right: 'auto'
    });
}

/**
 * Places a node to the right of another node in the document.
 * @param {HTMLElement} node - The node to be placed.
 * @param {HTMLElement} refNode - The reference node next to which the subject node will be placed.
 * @param {PlaceToolOptionsInterface} opt - The options for placing the node.
 */
export function placeRight(node, refNode, opt) {
    const refRect = refNode.getBoundingClientRect();
    style(node, {
        left: `${refRect.right + (opt.horizontalOffset ?? opt.offset) - node.offsetWidth}px`,
        right: 'auto'
    });
}

/**
 * Places a node vertically in a fixed position relative to another node in the document.
 * @param {HTMLElement} node - The node to be placed.
 * @param {HTMLElement} refNode - The reference node.
 * @param {PlaceToolOptionsInterface} opt - The options for placing the node.
 */
export function placeY(node, refNode, opt) {
    const height = node.offsetHeight;
    const availableTop = getAvailableTop(refNode);
    const availableBottom = getAvailableBottom(refNode);
    const positions = opt.position.split('-');
    if (positions.includes('bottom')) {
        if (availableBottom < height && availableTop > availableBottom) {
            placeTop(node, refNode, opt);
        } else {
            placeBottom(node, refNode, opt);
        }
    } else if (positions.includes('top')) {
        if (availableTop < height && availableBottom > availableTop) {
            placeBottom(node, refNode, opt);
        } else {
            placeTop(node, refNode, opt);
        }
    }
}

/**
 * Places a node horizontally in a fixed position relative to another node in the document.
 * @param {HTMLElement} node - The node to be placed.
 * @param {HTMLElement} refNode - The reference node.
 * @param {PlaceToolOptionsInterface} opt - The options for placing the node.
 */
export function placeX(node, refNode, opt) {
    const positions = opt.position.split('-');
    if (positions.includes('right')) {
        placeRight(node, refNode, opt);
    } else if (positions.includes('center')) {
        placeCenterHorizontal(node, refNode);
    }
}

/**
 * Places a node in a fixed position next to another node in the document.
 * @param {HTMLElement} node - The node to be placed.
 * @param {HTMLElement} refNode - The reference node next to which the subject node will be placed.
 * @param {PlaceToolOptionsInterface} [options]
 */
export const placeNode = (node, refNode = node?.parentNode, options) => {
    const opt = getOptions(options);
    if (opt?.container instanceof HTMLElement && node.parentNode !== opt.container) {
        opt.container.appendChild(node);
    }
    resetNodePlacement(node);
    placeY(node, refNode, opt);
    placeX(node, refNode, opt);
};
