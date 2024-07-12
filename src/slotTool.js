const SLOTS_BY_NAME = {};
let SLOTS = [];
let TIMEOUT = null;
const CALLBACKS = [];
/**
 * Selects all slots from a node.
 * @param {HTMLElement} node - The node to search.
 * @returns {HTMLElement[]} The list of slots.
 */
export function selectSlots(node) {
    return Array.from(node.querySelectorAll('slot') ?? []);
}

/**
 * Finds the component that owns a slot.
 * @param {HTMLElement} slot - The slot to search.
 * @returns {HTMLElement | undefined} The component that owns the slot.
 */
export function findSlotComponent(slot) {
    let node = slot.parentNode;
    while (node) {
        if (typeof node.placeSlot === 'function') {
            return node;
        }
        node = node.parentElement;
    }
}

/**
 * Extracts the slots from a node and stores them in an reference object.
 * @param {HTMLElement} node - The node to search.
 * @param {Record<string, HTMLElement>} [store] - The key/value store object to add the slots to.
 */
export function extractSlots(node, store = {}) {
    const slots = selectSlots(node);
    slots.forEach(slot => {
        const name = slot.getAttribute('name');
        store[name] = slot;
        slot._parentNode = slot.parentNode;
        slot.arpaElement = findSlotComponent(slot);
        SLOTS.push(slot);
        SLOTS_BY_NAME[name] = slot;
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
 * Reconciles a lost slot that was not found during first run.
 * @param {HTMLElement} slot
 */
export function placeLostSlot(slot) {
    const slotName = slot.getAttribute('name');
    const component = findSlotComponent(slot._parentNode);
    const slotContainer = component?.querySelector(`[slot="${slotName}"]`);
    if (slotContainer) {
        slotContainer.append(...slot.childNodes);
    } else {
        console.warn('LOST SLOT', slot);
    }
}

/**
 * Places a slot in its corresponding container.
 * @param {HTMLElement} slot
 */
function _placeSlot(slot) {
    const slotName = slot.getAttribute('name');
    const component = slot?.arpaElement;
    const slotContainer = component.querySelector(`[slot="${slotName}"]`);
    if (!slotContainer) {
        placeLostSlot(slot);
        return;
    }
    slotContainer.append(...slot.childNodes);
    if (SLOTS_BY_NAME[slotName]) {
        delete SLOTS_BY_NAME[slotName];
        SLOTS = Object.values(SLOTS_BY_NAME);
    }
}

/**
 * Adds content to a slot.
 * @param {HTMLElement} slot
 */
export async function placeSlot(slot) {
    const component = slot?.arpaElement;
    if (typeof component.onRendered === 'function') {
        component.onRendered(() => _placeSlot(slot));
        return;
    }
    _placeSlot(slot);
}

/**
 * Places the slots contents in their corresponding containers.
 * @param {Record<string, unknown>[]} slots
 */
export async function placeSlots(slots = SLOTS ?? []) {
    // const slots = [..._slots];
    // slots.reverse();
    slots.forEach(slot => placeSlot(slot));
    while (CALLBACKS.length) {
        CALLBACKS.pop()();
    }
}

/**
 * Handles slots for a node.
 * @param {() => void} onSlotsHandled - The callback to call when the slots are handled.
 */
export function handleSlots(onSlotsHandled) {
    clearTimeout(TIMEOUT);
    TIMEOUT = setTimeout(() => placeSlots(), 80);
    typeof onSlotsHandled === 'function' && CALLBACKS.push(onSlotsHandled);
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
 * Mixin for slot functionality.
 * @param {HTMLElement} component
 */
export function slotMixin(component) {
    component.placeSlot = placeSlot;
    component.slotsByName = {};
    extractSlots(component, component.slotsByName);
}
