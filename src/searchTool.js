/* eslint-disable security/detect-non-literal-regexp */
import { mergeObjects } from './objectTool.js';
import ObserverTool from './observerTool.js';
import { sanitizeSearchInput } from './stringTool.js';
/**
 * @typedef {import('./searchToolInterface').SearchToolInterface} SearchToolInterface
 */

/**
 * Searches through an array of nodes and returns a list of matches and non-matches.
 * @param {string} searchValue
 * @param {HTMLElement[]} nodes
 * @param {(node: HTMLElement, isMatch: boolean) => void} callback - The callback function to execute on search.
 * @returns {{matches: HTMLElement[], nonMatches: HTMLElement[], query: string}}
 */
export function searchNodes(searchValue, nodes, callback) {
    const query = searchValue.toString().toLowerCase();
    const matches = [];
    const nonMatches = [];
    for (const [, node] of Object.entries(nodes)) {
        const text = node.textContent.toLowerCase();
        const isMatch = text.includes(query);
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
 * @param {HTMLElement} container - The container node.
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
    const nodes = contentSelector
        ? Array.from((container instanceof HTMLElement && container?.querySelectorAll(contentSelector)) ?? [])
        : [container];
    nodes.forEach(node => {
        node.originalContent = node.originalContent ?? node.innerHTML;
        let content = node.originalContent;
        const value = sanitizeSearchInput(searchValue);
        if (value.length > 1) {
            content = node.originalContent.replace(new RegExp(value, 'gi'), match => {
                return `<mark class="${className}">${match}</mark>`;
            });
        }
        node.innerHTML = content;
    });
}

class SearchTool {
    /**
     * Creates a new SearchTool instance.
     * @param {HTMLInputElement} input - The input element.
     * @param {SearchToolInterface} [config] - The configuration options.
     */
    constructor(input, config = {}) {
        ObserverTool.mixin(this);
        this._onSearchInput = this._onSearchInput.bind(this);
        this._onSearchNode = this._onSearchNode.bind(this);
        this.input = input;
        this.setConfig(config);
        this._initialize();
    }

    _initialize() {
        const { debounceDelay } = this.config;
        this.input.removeEventListener('input', this._onSearchInput);
        this.input.addEventListener('input', this._onSearchInput);
        clearTimeout(this.debounceSearchTimeout);
        this.debounceSearchTimeout = setTimeout(this._onSearchInput, debounceDelay);
    }

    /**
     * Sets the configuration.
     * @param {SearchToolInterface} config - The configuration options.
     * @returns {SearchTool}
     */
    setConfig(config) {
        /** @type {SearchToolInterface} */
        this.config = mergeObjects(this.getDefaultConfig(), config);
        return this;
    }

    /**
     * Returns the default configuration options.
     * @returns {SearchToolInterface}
     */
    getDefaultConfig() {
        return {
            matchClass: 'searchMatch',
            debounceDelay: 500,
            searchSelector: '',
            callback: null,
            addMarkers: true,
            hideNonMatches: true
        };
    }

    setNodes(nodes) {
        this.nodes = Array.from(nodes);
        return this;
    }

    getNodes() {
        const { getNodes, container } = this.config;
        if (typeof getNodes === 'function') {
            return getNodes();
        }
        if (container instanceof HTMLElement) {
            return Array.from(container.childNodes);
        }
        return this.config.nodes ?? [];
    }

    /**
     * Executes a search on an input element.
     * @param {Event} event - The event object.
     * @param {string} [query]
     * @param {HTMLElement[]} [nodes] - The list of nodes to search through.
     */
    _doSearch(event, query = this.input.value, nodes = this.getNodes()) {
        const { onSearch } = this.config;
        if (typeof onSearch === 'function' && onSearch({ query, event, nodes }) === false) {
            return;
        }
        const { matches, nonMatches } = searchNodes(query, nodes, (node, isMatch) =>
            this._onSearchNode(node, isMatch, event)
        );
        this.matches = matches;
        this.nonMatches = nonMatches;
        this.signal('onSearch', { query, event, nodes, matches, nonMatches });
    }

    _onSearchInput(event) {
        const { debounceDelay } = this.config;
        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
            if (this.input.value !== this._prevValue) {
                this._doSearch(event);
            }
            this._prevValue = this.input.value;
        }, debounceDelay);
    }

    _onSearchNode(node, isMatch, event) {
        const { onSearchNode, searchSelector, matchClass, addMarkers, hideNonMatches } = this.config;
        if (typeof onSearchNode === 'function' && onSearchNode(node, isMatch) === false) {
            return;
        }
        const value = this.input.value;
        if (addMarkers) {
            addSearchMatchMarkers(node, isMatch ? value : '', searchSelector, matchClass);
        }
        if (event && hideNonMatches) {
            node.style.display = isMatch ? '' : 'none';
        }
    }
}

export default SearchTool;
