/* eslint-disable security/detect-non-literal-regexp */
import { mergeObjects } from './objectTool.js';
import ObserverTool from './observerTool.js';
import { sanitizeSearchInput } from './stringTool.js';
/**
 * @typedef {import('./observerTool.types').ObserverType} ObserverType
 * @typedef {import('./observerTool.types').ObserverStoreType} ObserverStoreType
 * @typedef {import('./observerTool.types').ListenerType} ListenerType
 * @typedef {import('./searchTool.types').SearchToolType} SearchToolType
 * @typedef {import('./zoneTool.types').ElementType} ElementType
 */

/**
 * Searches through an array of nodes and returns a list of matches and non-matches.
 * @param {string} searchValue
 * @param {Element[]} nodes
 * @param {(node: Element, isMatch?: boolean) => void} callback - The callback function to execute on search.
 * @returns {Promise<{matches: Element[], nonMatches: Element[], query: string}>}
 */
export async function searchNodes(searchValue, nodes, callback) {
    nodes = await Promise.resolve(nodes);
    const query = searchValue.toString().toLowerCase();
    const matches = [];
    const nonMatches = [];
    for (const [, node] of Object.entries(nodes)) {
        const text = node?.textContent?.toLowerCase();
        const isMatch = text?.includes(query);
        if (isMatch) {
            matches.push(node);
        } else {
            nonMatches.push(node);
        }
        if (typeof callback === 'function') {
            callback(node, isMatch);
        }
    }
    return { matches, nonMatches, query };
}

/**
 * Wraps all occurrences of a search value in a container with a <mark> tag.
 * @param {Element} container - The container node.
 * @param {string} searchValue - All value occurrences in the container will be encapsulated in a <mark> tag.
 * @param {string} [contentSelector] - A selector to filter nodes within the container in which search match markers will be added. If not provided, the container itself will be used, however it is recommended to provide a selector to avoid breaking the HTML.
 * @param {string} [className] - The class name to apply to the <mark> tag.
 */
export function addSearchMatchMarkers(
    container,
    searchValue = '',
    contentSelector = '',
    className = 'searchMatch'
) {
    const selected = container.querySelectorAll(contentSelector);
    /** @type {ElementType[]} */
    // @ts-ignore
    const nodes = contentSelector
        ? Array.from(container instanceof HTMLElement ? selected || [] : [])
        : [container];
    nodes.forEach(node => {
        node.originalContent = node.originalContent ?? node.innerHTML;
        let content = node.originalContent;
        const value = sanitizeSearchInput(searchValue);
        if (value.length > 1) {
            /**
             * Replaces the search value with a <mark> tag.
             * @param {string} match
             * @returns {string}
             */
            const replaceFn = match => `<mark class="${className}">${match}</mark>`;
            content = node.originalContent.replace(new RegExp(value, 'gi'), replaceFn);
        }
        node.innerHTML = content;
    });
}

class SearchTool {
    /** @type {string} */
    _prevValue = '';

    /**
     * Creates a new SearchTool instance.
     * @param {HTMLInputElement} input - The input element.
     * @param {SearchToolType} [config] - The configuration options.
     */
    constructor(input, config = {}) {
        ObserverTool.mixin(this);
        this.onSearchInput = this.onSearchInput.bind(this);
        this.onSearchNode = this.onSearchNode.bind(this);
        /** @type {HTMLInputElement} */
        this.input = input;
        this.setConfig(config);
        this._initialize();
    }
    /** @type {ObserverStoreType} */
    _observerTool = { callbacks: {} };

    _initialize() {
        const { debounceDelay } = this.config || {};
        this.input.removeEventListener('input', this.onSearchInput);
        this.input.addEventListener('input', this.onSearchInput);
        clearTimeout(this.debounceSearchTimeout);
        this.debounceSearchTimeout = setTimeout(this.onSearchInput, debounceDelay);
    }
    /**
     * Sets the configuration.
     * @param {SearchToolType} config - The configuration options.
     * @returns {SearchTool}
     */
    setConfig(config = {}) {
        /** @type {SearchToolType} */
        this.config = mergeObjects(this.getDefaultConfig(), config);
        return this;
    }

    /**
     * Returns the default configuration options.
     * @returns {SearchToolType}
     */
    getDefaultConfig() {
        return {
            matchClass: 'searchMatch',
            debounceDelay: 500,
            searchSelector: '',
            addMarkers: true,
            hideNonMatches: true
        };
    }

    /**
     * Returns the list of nodes to search through.
     * @returns {ElementType[]}
     */
    getNodes() {
        const { getNodes, container } = this.config || {};
        if (typeof getNodes === 'function') {
            return getNodes();
        }
        if (container instanceof HTMLElement) {
            // @ts-ignore
            return Array.from(container?.childNodes || []).filter(node => node instanceof HTMLElement);
        }
        return this.config?.nodes ?? [];
    }

    /**
     * Sends a signal to the observer.
     * @param {string} signalName
     * @param {unknown} payload
     * @returns {void}
     */
    signal(signalName, payload) {
        const text =
            'This method should be overridden by the ObserverTool.mixin method, if not, there is a problem.';
        console.error(text, { signalName, payload });
    }

    /**
     * Executes a search on an input element.
     * @param {Event | undefined} event - The event object.
     * @param {string} [query]
     * @param {Element[]} [nodes] - The list of nodes to search through.
     */
    async doSearch(event, query = this.input.value, nodes = this.getNodes()) {
        const { onSearch } = this.config || {};
        if (typeof onSearch === 'function' && onSearch({ query, event, nodes }) === false) {
            return;
        }
        const { matches, nonMatches } = await searchNodes(query, nodes, (node, isMatch) =>
            this.onSearchNode(node, isMatch, event)
        );
        this.matches = matches;
        this.nonMatches = nonMatches;
        this.signal('search', { query, event, nodes, matches, nonMatches });
    }

    /**
     * Executes a debounced search on the input element.
     * @param {Event} event - The event object.
     */
    onSearchInput(event) {
        event && (this.onSearchEvent = event);
        const { debounceDelay } = this.config || {};
        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
            if (this.input.value !== this._prevValue) {
                this.doSearch(this.onSearchEvent);
            }
            this._prevValue = this.input.value;
            this.onSearchEvent = undefined;
        }, Number(debounceDelay));
    }

    /**
     * Adds search match markers to a node.
     * @param {Element} node - The node to add search match markers to.
     * @param {boolean} isMatch - Whether the node is a match.
     * @param {Event | undefined} event - The event object.
     */
    onSearchNode(node, isMatch = false, event) {
        const { onSearchNode, searchSelector, matchClass, addMarkers, hideNonMatches } = this.config || {};
        if (typeof onSearchNode === 'function' && onSearchNode(node, isMatch) === false) {
            return;
        }
        const value = this.input.value;
        if (addMarkers) {
            addSearchMatchMarkers(node, isMatch ? value : '', searchSelector, matchClass);
        }
        if (node instanceof HTMLElement && event && hideNonMatches) {
            node.style.display = isMatch ? '' : 'none';
        }
    }
}

export default SearchTool;
