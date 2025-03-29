import { mechanize } from '../stringTool/stringTool';
import { isObject } from '../objectTool/objectTool';

/**
 * Adds attributes to a node.
 * @param {HTMLElement} node
 * @param {Record<string, any>} attributes
 * @param {boolean} [override=false]
 */
export function attr(node, attributes, override = true) {
    if (!node || typeof node.setAttribute !== 'function' || !isObject(attributes)) {
        return;
    }
    for (const [key, value] of Object.entries(attributes)) {
        if (!override && node.hasAttribute(key)) {
            continue;
        }
        if (value === false || value == null) {
            node.removeAttribute(key);
        } else {
            node.setAttribute(key, String(value));
        }
    }
}
/**
 * Returns the attributes of a node.
 * @param {HTMLElement} node
 * @returns {Record<string, string | boolean>}
 */
export function getAttributes(node) {
    /**
     * Reduces the attributes of a node to an object.
     * @param {Record<string, string | boolean>} acc
     * @param {{ value: string | boolean, name: string}} attr
     * @returns {Record<string, string | boolean>}
     */
    const reduce = (acc, attr) => {
        let { value } = attr;
        const { name } = attr;
        if (value === '') {
            value = true;
        } else if (value === 'false') {
            value = false;
        }
        acc[name] = value;
        return acc;
    };
    return Array.from(node.attributes).reduce(reduce, {});
}

/**
 * Checks if a node is in the viewport.
 * @param {HTMLElement} node
 * @returns {boolean}
 */
export function isInView(node) {
    const rect = node.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Adds content to a node.
 * @param {HTMLElement} node
 * @param {*} content
 */
export function addContent(node, content) {
    if (typeof content === 'string') {
        node.textContent += content;
    } else if (content instanceof HTMLElement) {
        node.appendChild(content);
    }
}

/**
 * Sets content to a node.
 * @param {HTMLElement} node
 * @param {*} content
 */
export function setContent(node, content) {
    if (typeof content === 'string') {
        node.textContent = content;
    } else if (content instanceof HTMLElement) {
        node.innerHTML = '';
        node.appendChild(content);
    }
}

/**
 * Styles a node.
 * @param {HTMLElement} node
 * @param {Partial<CSSStyleDeclaration>} css
 */
export function style(node, css = {}) {
    for (const [key, value] of Object.entries(css)) {
        // @ts-ignore
        node.style[key] = value;
    }
}
/**
 * Append nodes to a container with a document fragment for performance.
 * @param {HTMLElement | Element} container
 * @param {Element[] | NodeList | Node[]} nodes
 * @param {boolean} prepend - Whether to prepend the nodes.
 */
export function appendNodes(container, nodes = [], prepend = false) {
    if (!container || !nodes?.length) {
        return;
    }
    const fragment = document.createDocumentFragment();
    fragment.append(...nodes);
    prepend ? container.prepend(fragment) : container.appendChild(fragment);
}

/**
 * Sets nodes to a container.
 * @param {Element} container
 * @param {Element[]} nodes
 */
export function setNodes(container, nodes = []) {
    container.innerHTML = '';
    appendNodes(container, nodes);
}

/**
 * Prepends a child node to a parent node.
 * @param {HTMLElement} node
 * @param {HTMLElement} child
 */
export function prepend(node, child) {
    if (!child) {
        return;
    }
    if (node.firstChild instanceof HTMLElement) {
        node.insertBefore(child, node.firstChild);
    } else {
        node.appendChild(child);
    }
}

/**
 * Resolves a node.
 * @param {HTMLElement | DocumentFragment | string} node
 * @param {HTMLElement | Document} container
 * @returns {HTMLElement | DocumentFragment | null | Element}
 */
export function resolveNode(node, container = document) {
    if (node instanceof HTMLElement) return node;
    if (node instanceof DocumentFragment) {
        return (node?.childNodes?.length === 1 && node?.firstElementChild) || null;
    }
    if (typeof node === 'string') {
        return (
            container?.querySelector(node) ||
            (container instanceof HTMLElement && container.closest(node)) ||
            null
        );
    }
    return node;
}

/**
 * Returns the scrollable parent of a node.
 * @param {HTMLElement} node
 * @returns {HTMLElement | null}
 */
export function getScrollableParent(node) {
    if (!node) {
        return null;
    }
    if (node?.scrollTop > 0) {
        return node;
    }
    return node.parentNode instanceof HTMLElement ? getScrollableParent(node.parentNode) : null;
}

/**
 * Returns the offset of a node.
 * @param {HTMLElement} node
 * @returns {number[]}
 */
export function getOffset(node) {
    return [node.offsetLeft, node.offsetTop];
}

/**
 * Adds a double click event listener to a node.
 * @param {HTMLElement} node
 * @param {() => void} callback
 * @param {number} delay
 */
export function onDoubleClick(node, callback, delay = 500) {
    /** @type {boolean} */
    let isRepeat;
    node.addEventListener('click', () => {
        isRepeat && callback();
        isRepeat = true;
        setTimeout(() => (isRepeat = false), delay);
    });
}

/**
 * Creates a dynamic CSS rule.
 * @param {string} selector - A css selector.
 * @param {string} styles
 */
export function addCssRule(selector, styles) {
    const id = mechanize(selector);
    let style = document.getElementById(id);
    if (!style) {
        const content = `${selector} { ${styles} }`;
        style = document.createElement('style');
        style.id = id;
        style.setAttribute('type', 'text/css');
        style.innerHTML = content;
        document.head.appendChild(style);
    }
}

/**
 * Adds event listeners to nodes.
 * @param {HTMLElement | HTMLElement[]} nodes
 * @param {string | string[]} events
 * @param {(event: Event) => void} callback
 * @param {Record<string, unknown>} options
 */
export function listen(nodes, events = [], callback, options = {}) {
    nodes = Array.isArray(nodes) ? nodes : [nodes];
    events = Array.isArray(events) ? events : [events];
    for (const node of nodes) {
        if (!(node instanceof HTMLElement)) {
            continue;
        }
        for (const event of events) {
            node.removeEventListener(event, callback, options);
            node.addEventListener(event, callback, options);
        }
    }
}
