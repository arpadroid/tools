import { camelToDashed } from './stringTool.js';

/**
 * Processes a template string and replaces the placeholders with the provided props.
 * @param {string} template - The template string.
 * @param {Record<string, string>} props - The props to replace the placeholders with.
 * @returns {string} The processed template.
 */
export function processTemplate(template, props = {}) {
    if (!template) {
        return '';
    }
    const result = [];
    let startIndex = 0;
    let matchIndex = 0;
    while ((matchIndex = template.indexOf('{', startIndex)) !== -1) {
        result.push(template.slice(startIndex, matchIndex));
        const endIndex = template.indexOf('}', matchIndex);
        if (endIndex === -1) {
            break;
        }
        const placeholder = template.slice(matchIndex + 1, endIndex);
        result.push(props[placeholder] || '');
        startIndex = endIndex + 1;
    }
    result.push(template.slice(startIndex));
    return result.join('');
}

/**
 * Processes a template string using a regular expression and replaces the placeholders with the provided props.
 * It should be less efficient than the processTemplate function.
 * @param {string} template - The template string.
 * @param {Record<string, string>} props - The props to replace the placeholders with.
 * @returns {string} The processed template.
 * @todo Measure the performance difference between this function and processTemplate.
 */
export function processTemplateRegex(template, props = {}) {
    return template?.replace(/{([^}]+)}/g, (match, p1) => {
        return props[p1] || '';
    });
}

/**
 * Maps an array of items to an HTML string.
 * @param {Array<unknown>} items - The items to map.
 * @param {Function} callback - The callback function to process the items.
 * @returns {string} The HTML string.
 */
export function mapHTML(items, callback) {
    return items.map(callback).join('');
}

/**
 * Renders an HTML string with the provided variables.
 * @param {boolean | Function} condition - The condition to render the HTML.
 * @param {string} html - The HTML string to render.
 * @returns {string} The rendered HTML string.
 */
export function render(condition, html = '') {
    const canRender = typeof condition === 'function' ? condition() : condition;
    return Boolean(canRender) ? html?.trim() : '';
}

/**
 * Renders an HTML node from a string.
 * @param {string} html
 * @returns {HTMLElement}
 */
export function renderNode(html = '') {
    const template = document.createElement('template');
    template.innerHTML = html?.trim() ?? '';
    return template.innerHTML ? template.content.firstChild : null;
}

/**
 * Removes HTML tags from a string.
 * @param {string} str - The input string.
 * @returns {string} The string without HTML tags.
 */
export function removeHTML(str) {
    const node = document.createElement('div');
    node.innerHTML = str;
    return node.textContent || node.innerText || '';
}

/**
 * Renders an HTML attribute.
 * @param {string} attr - The attribute name.
 * @param {string} value - The attribute value.
 * @returns {string} The rendered attribute.
 */
export function renderAttr(attr, value) {
    return render(value, `${attr}="${removeHTML(value)}"`);
}

/**
 * Renders attributes to a node.
 * @param {Record<string, unknown>} attributes
 * @returns {string}
 */
export function attrString(attributes = {}) {
    const attrArray = [];

    for (const [key, value] of Object.entries(attributes)) {
        const attrName = camelToDashed(key);

        if (value === true) {
            attrArray.push(attrName);
        } else if (typeof value === 'string' && value.length > 0) {
            attrArray.push(`${attrName}="${value}"`);
        } else if (typeof value === 'number' && value !== 0) {
            attrArray.push(`${attrName}="${value}"`);
        }
    }

    return attrArray.join(' ');
}

/**
 * Renders a class attribute.
 * @param {string | Record<string, boolean | string[]>} classes
 * @returns {string}
 */
export function classNames(...classes) {
    return classes
        .map(_class => {
            if (typeof _class === 'string') {
                return _class;
            }
            if (typeof _class === 'object') {
                return Object.entries(_class)
                    .map(([key, value]) => value && key)
                    .join(' ');
            }
            if (Array.isArray(_class)) {
                return classNames(..._class);
            }
        })
        .filter(Boolean)
        .join(' ');
}
