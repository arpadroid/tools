const VERBOSE = true;
const SLOTS_BY_NAME = {};
const LOST_SLOTS = {};
const CALLBACKS = [];
let SLOTS = [];
let TIMEOUT = null;

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
export function findNodeComponent(slot) {
    let node = slot;
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
    slots
        .filter(slot => slot.childNodes.length)
        .forEach(slot => {
            const name = slot.getAttribute('name');
            store[name] = slot;
            slot._parentNode = slot.parentNode;
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
 * Places the slotted content into its corresponding container.
 * @param {HTMLElement} slot
 */
export async function placeSlot(slot) {
    const slotName = slot.getAttribute('name');
    const component = findNodeComponent(slot?._parentNode);
    component?.promise && (await component.promise);
    const slotContainer = component?.querySelector(`[slot="${slotName}"]`);
    const slotComponent = findNodeComponent(slotContainer);
    if (!slotContainer || !slotComponent) {
        LOST_SLOTS[slotName] = slot;
        return;
    }
    
    slotContainer.append(...slot.childNodes);
    if (typeof slotComponent._onSlotPlaced === 'function') {
        slotComponent._onSlotPlaced({
            nodes: slotContainer.childNodes,
            slotName,
            slotComponent,
            slotContainer
        });
    }
    SLOTS_BY_NAME[slotName] && delete SLOTS_BY_NAME[slotName];
    SLOTS = Object.values(SLOTS_BY_NAME);
    LOST_SLOTS[slotName] && delete LOST_SLOTS[slotName];
}

/**
 * Places the slots contents in their corresponding containers.
 * @param {Record<string, unknown>[]} slots
 */
export async function placeSlots(slots = SLOTS ?? []) {
    slots.forEach(slot => placeSlot(slot));
    while (CALLBACKS.length) {
        CALLBACKS.pop()();
    }
    const lostSlots = Object.keys(LOST_SLOTS);
    if (VERBOSE && lostSlots.length) {
        console.warn('The following slots could not be placed.', lostSlots);
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
