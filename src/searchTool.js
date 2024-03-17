import { sanitizeSearchInput } from './stringTool.js';

/**
 * Searches through an array of nodes and returns a list of matches and non-matches.
 * @param {string} searchValue
 * @param {HTMLElement[]} nodes
 * @returns {{matches: HTMLElement[], nonMatches: HTMLElement[], query: string}}
 */
export function searchNodes(searchValue, nodes) {
    const query = searchValue.toString().toLowerCase();
    const matches = [];
    const nonMatches = [];
    for (const [, node] of Object.entries(nodes)) {
        const text = node.textContent.toLowerCase();
        if (text.indexOf(query) !== -1) {
            matches.push(node);
        } else {
            nonMatches.push(node);
        }
    }
    return { matches, nonMatches, query };
}

/**
 * Adds search match markers to an HTML node.
 * @param {HTMLElement} container - The container node.
 * @param {string} searchValue - All value occurrences in the container will be encapsulated in a <mark> tag.
 * @param {string} [contentSelector] - A selector to filter nodes within the container in which search match markers will be added. If not provided, the container itself will be used, however it is recommended to provide a selector to avoid breaking the HTML.
 */
export function addSearchMatchMarkers(container, searchValue = '', contentSelector = '') {
    const nodes = contentSelector
        ? Array.from(container?.querySelectorAll(contentSelector) ?? [])
        : [container];
    nodes.forEach(node => {
        node.originalContent = node.originalContent ?? node.innerHTML;
        let content = node.originalContent;
        const value = sanitizeSearchInput(searchValue);
        if (value.length > 2) {
            // eslint-disable-next-line security/detect-non-literal-regexp
            content = node.originalContent.replace(new RegExp(value, 'gi'), match => {
                return `<mark class="searchMatch">${match}</mark>`;
            });
        }
        node.innerHTML = content;
    });
}
