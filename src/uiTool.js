/**
 * Processes a template string and replaces the placeholders with the provided props.
 * @param {string} template - The template string.
 * @param {Record<string, string>} props - The props to replace the placeholders with.
 * @returns {string} The processed template.
 */
export function processTemplate(template, props = {}) {
    return template.replace(/{([^}]+)}/g, (match, p1) => {
        return props[p1] || '';
    });
}

/**
 * Renders an HTML string with the provided variables.
 * @param {boolean | Function} condition - The condition to render the HTML.
 * @param {string} html - The HTML string to render.
 * @param {Record<string, string>} vars - The variables to replace the placeholders with.
 * @returns {string} The rendered HTML string.
 */
export function render(condition, html = '', vars = {}) {
    let canRender = condition;
    if (typeof condition === 'function') {
        canRender = condition();
    }
    if (canRender) {
        processTemplate(html, vars);
        return html;
    }
    return '';
}
