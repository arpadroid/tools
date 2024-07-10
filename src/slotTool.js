import { CustomElementTool } from './index.js';
const LOST_SLOTS = {};

/**
 * Selects all slots from a node.
 * @param {HTMLElement} node - The node to search.
 * @returns {HTMLElement[]} The list of slots.
 */
export function selectSlots(node) {
    return Array.from(node.querySelectorAll('slot') ?? []);
}

/**
 * Extracts the slots from a node and stores them in an reference object.
 * @param {HTMLElement} node - The node to search.
 * @param {Record<string, HTMLElement>} [store] - The key/value store object to add the slots to.
 */
export function extractSlots(node, store = {}) {
    const slots = selectSlots(node);
    slots.forEach(slot => {
        store[slot.getAttribute('name')] = slot;
        slot._parentNode = slot.parentNode;
        slot.remove();
    });
}

/**
 * Removes empty slot nodes from a container.
 * @param {HTMLElement} container - The container to search.
 */
export function removeEmptySlotNodes(container) {
    selectSlots(container)?.forEach(node => !node.hasChildNodes() && node.remove());
}

/**
 * Assigns a slot to a component.
 * @param {HTMLElement} component - The component to assign the slot to.
 * @param {HTMLElement} slot - The slot to assign.
 */
export function assignSlotToComponent(component, slot) {
    let parent = slot._parentNode;
    const slotName = slot.getAttribute('name');
    while (parent) {
        if (typeof parent.addContentToSlot === 'function') {
            const slotContainer = parent.querySelector(`[slot="${slotName}"]`);
            if (slotContainer) {
                parent.addContentToSlot(component, slot, '', slotContainer);
                return;
            }
        }
        parent = parent.parentElement;
    }
    LOST_SLOTS[slotName] = slot;
}

/**
 * Handles slots for a node.
 * @param {HTMLElement} node - The node to search.
 * @param {Record<string, unknown>} [config] - The configuration object.
 */
export async function handleSlots(node, config = {}) {
    const {
        removeEmpty = true,
        slots = Object.values(node?.slotsByName ?? {}),
        waitForContentLoaded = false
    } = config;
    if (waitForContentLoaded) {
        await CustomElementTool.onContentLoaded(node);
    }
    [...slots, ...Object.values(LOST_SLOTS)].forEach(slot => assignSlotToComponent(node, slot));
    removeEmpty && removeEmptySlotNodes(node);
}

/**
 * Checks if a node has a slot.
 * @param {HTMLElement} node - The node to search.
 * @param {string} name - The slot name.
 * @returns {boolean} The result.
 */
export function hasSlot(node, name) {
    return Boolean(node.querySelector(`[slot="${name}"]`));
}

/**
 * Adds content to a slot.
 * @param {HTMLElement} node - The node to search.
 * @param {HTMLElement} content - The content to add.
 * @param {string} slotName
 * @param {HTMLElement} [_slotContainer] - The slot container.
 */
export function addContentToSlot(node, content, slotName, _slotContainer) {
    const slotContainer = _slotContainer ?? node.querySelector(`[slot="${slotName}"]`);
    if (!slotContainer) {
        return;
    }
    if (content?.tagName?.toLowerCase() === 'slot') {
        const slotNode = content;
        slotName = slotNode.getAttribute('name');
        slotContainer.append(...slotNode.childNodes);
        if (LOST_SLOTS[slotName]) {
            delete LOST_SLOTS[slotName];
        }
    }
}

/**
 * Mixin for slot functionality.
 * @param {HTMLElement} node - The node to search.
 */
export function slotMixin(node) {
    node.addContentToSlot = addContentToSlot;
    node.slotsByName = {};
    extractSlots(node, node.slotsByName);
}
