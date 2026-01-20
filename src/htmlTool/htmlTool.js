/**
 * @typedef {import('./htmlTool.types.js').ClassNamesValueType} ClassNamesValueType
 */
import { camelToDashed } from '@arpadroid/tools-iso';

/**
 * Processes a template string using a regular expression and replaces the placeholders with the provided props.
 * It should be less efficient than the processTemplate function.
 * @param {string} template - The template string.
 * @param {Record<string, string>} props - The props to replace the placeholders with.
 * @returns {string} The processed template.
 * @todo Measure the performance difference between this function and processTemplate.
 */
export function processTemplateRegex(template, props = {}) {
    return template?.replace(/{([^{}]*)}/g, (match, p1) => {
        return props[p1] || '';
    });
}

/**
 * Maps an array of items to an HTML string.
 * @param {unknown[]} items - The items to map.
 * @param {() => void} callback - The callback function to process the items.
 * @returns {string} The HTML string.
 */
export function mapHTML(items, callback) {
    return items.map(callback).join('');
}

/**
 * Renders an HTML string with the provided variables.
 * @param {unknown | (() => unknown)} condition - The condition to render the HTML.
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
 * @returns {HTMLElement | null}
 */
export function renderNode(html = '') {
    const trimmedHtml = html?.trim() ?? '';
    if (!trimmedHtml) return null;
    const div = document.createElement('div');
    div.innerHTML = trimmedHtml;
    return /** @type {HTMLElement | null} */ (div?.firstChild);
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
        } else if (Array.isArray(value) && value.length > 0) {
            attrArray.push(`${attrName}="${value.join(',')}"`);
        }
    }

    return attrArray.join(' ');
}

/**
 * Renders a class attribute.
 * @param {...ClassNamesValueType} classes
 * @returns {string}
 */
export function classNames(...classes) {
    /**
     * Maps a class to a string.
     * @param {ClassNamesValueType} _class
     * @returns {string[] | string | undefined}
     */
    const classArr = classes
        .map(item => {
            if (typeof item === 'string') return item.trim();
            if (Array.isArray(item)) return classNames(...item);
            if (typeof item === 'object' && item !== null) {
                let out = '';
                for (const [key, value] of Object.entries(item)) {
                    if (value) out += ` ${key}`;
                }
                return out.trim();
            }
            return '';
        })
        .filter(Boolean)
        .join(' ')
        .split(' ');

    return [...new Set(classArr)].join(' ').replace(/\s+/g, ' ').trim();
}
