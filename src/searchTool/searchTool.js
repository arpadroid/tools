/* eslint-disable security/detect-non-literal-regexp */
import { mergeObjects } from '../objectTool/objectTool.js';
import { dummySignal, observerMixin } from '../observerTool/observerTool.js';
import { sanitizeSearchInput } from '../stringTool/stringTool.js';
/**
 * @typedef {import('../observerTool/observerTool.types').ObserverType} ObserverType
 * @typedef {import('../observerTool/observerTool.types').ObserverStoreType} ObserverStoreType
 * @typedef {import('../observerTool/observerTool.types').ListenerType} ListenerType
 * @typedef {import('./searchTool.types').SearchToolConfigType} SearchToolConfigType
 * @typedef {import('../zoneTool/zoneTool.types').ElementType} ElementType
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
    const selected = (container instanceof HTMLElement && container?.querySelectorAll(contentSelector)) || [];
    /** @type {ElementType[]} */
    let nodes = [];
    if (contentSelector) {
        nodes = Array.from(container instanceof HTMLElement ? selected || [] : []);
    } else {
        nodes = [container];
    }
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

export class SearchTool {
    /** @type {string} */
    _prevValue = '';

    /**
     * Creates a new SearchTool instance.
     * @param {HTMLInputElement} input - The input element.
     * @param {SearchToolConfigType} [config] - The configuration options.
     */
    constructor(input, config = {}) {
        this.signal = dummySignal;
        observerMixin(this);
        this.onSearchInput = this.onSearchInput.bind(this);
        this.onSearchNode = this.onSearchNode.bind(this);
        /** @type {HTMLInputElement} */
        this.setConfig(config);
        this._initialize(input);
    }
    /** @type {ObserverStoreType} */
    _observerTool = { callbacks: {} };

    /**
     * Initializes the search tool private.
     * @param {HTMLInputElement} input - The input element.
     */
    _initialize(input) {
        const { debounceDelay } = this.config || {};
        this.initialize(input);
        clearTimeout(this.debounceSearchTimeout);
        this.debounceSearchTimeout = setTimeout(this.onSearchInput, debounceDelay);
    }

    /**
     * Initializes the search tool.
     * @param {HTMLInputElement} input - The input element.
     */
    initialize(input) {
        this.input = input;
        input.removeEventListener('input', this.onSearchInput);
        input.addEventListener('input', this.onSearchInput);
    }

    /**
     * Sets the configuration.
     * @param {SearchToolConfigType} config - The configuration options.
     * @returns {SearchTool}
     */
    setConfig(config = {}) {
        /** @type {SearchToolConfigType} */
        this.config = mergeObjects(this.getDefaultConfig(), config);
        return this;
    }

    /**
     * Returns the default configuration options.
     * @returns {SearchToolConfigType}
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
     * @returns {HTMLElement[]}
     */
    getNodes() {
        const { getNodes, container } = this.config || {};
        if (typeof getNodes === 'function') {
            return getNodes();
        }
        if (container instanceof HTMLElement) {
            return /** @type {HTMLElement[]} */ (
                Array.from(container?.childNodes || []).filter(node => node instanceof Node)
            );
        }
        return this.config?.nodes ?? [];
    }

    /**
     * Executes a search on an input element.
     * @param {Event | undefined} [event] - The event object.
     * @param {string} [query]
     * @param {Element[]} [nodes] - The list of nodes to search through.
     */
    async doSearch(event, query = this.input?.value || '', nodes = this.getNodes()) {
        const { onSearch } = this.config || {};
        const onSearchRv = onSearch && (await onSearch({ query, event, nodes }));
        if (typeof onSearch === 'function' && onSearchRv === false) {
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
            if (this.input?.value && this.input?.value !== this._prevValue) {
                this.doSearch(this.onSearchEvent);
            }
            this._prevValue = this.input?.value || '';
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
        const value = this.input?.value;
        if (addMarkers) {
            addSearchMatchMarkers(node, isMatch ? value : '', searchSelector, matchClass);
        }
        if (node instanceof HTMLElement && event && hideNonMatches) {
            node.style.display = isMatch ? '' : 'none';
        }
    }
}

export default SearchTool;
