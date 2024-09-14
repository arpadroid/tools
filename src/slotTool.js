const VERBOSE = true;
const LOST_SLOTS = [];
const CALLBACKS = [];
const SLOTS = [];
let TIMEOUT = null;
let REPORT_TIMEOUT = null;

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
        if (Array.isArray(node._slots)) {
            return node;
        }
        node = node.parentElement;
    }
}

/**
 * Gets the parent element of a slot.
 * @param {HTMLSlotElement} slot - The slot to search.
 * @returns {HTMLElement | undefined} The parent of the slot.
 */
export function getSlotParent(slot) {
    let parent = slot?.parentNode;
    while (parent && !(parent instanceof HTMLElement)) {
        parent = parent?.parentNode;
    }
    if (!(parent instanceof HTMLElement)) {
        console.warn('Slot has no parent:', slot);
        return;
    }
    return parent;
}

/**
 * Returns an array where the component slots are stored.
 * @param {HTMLSlotElement[]} store
 * @param {HTMLElement} container - The container of the slots.
 * @returns {HTMLSlotElement[]} The store of slots.
 */
export function getStore(store = [], container) {
    if (container?._slots) {
        return container._slots;
    }
    return store;
}

/**
 * Adds a slot.
 * @param {HTMLSlotElement} slot - The slot to add.
 * @param {HTMLSlotElement[]} [slots] - The list of slots to add to.
 * @param {HTMLSlotElement[]} [$store] - An optional store array.
 * @param {HTMLElement} [parentNode] - The container of the slot.
 */
export async function addSlot(slot, slots = SLOTS, $store = [], parentNode = slot.parentNode) {
    if (slot?.tagName !== 'SLOT') {
        console.error('Invalid slot:', slot);
        return;
    }
    if (slots.indexOf(slot) > -1) {
        return;
    }
    const store = getStore($store, parentNode);
    store.push(slot);
    slots.push(slot);
    slot._parentNode = parentNode;
    setTimeout(() => {
        if (parentNode._slots && !parentNode._slots.includes(slot)) {
            parentNode._slots.push(slot);
        }
    }, 0);
}

/**
 * Removes a slot.
 * @param {HTMLSlotElement} slot - The slot to remove.
 * @param {HTMLSlotElement[]} [slots] - The list of slots to remove from.
 * @returns {void}
 */
export function removeSlot(slot, slots = SLOTS) {
    const index = slots.indexOf(slot);
    index > -1 && slots.splice(index, 1);
}

/**
 * Extracts the slots from a node and stores them in an reference object.
 * @param {HTMLElement} node - The node to search.
 * @param {HTMLElement[]} [store] - The key/value store object to add the slots to.
 * @param {HTMLElement} [parentNode] - The parent node of the slots.
 */
export function extractSlots(node, store = [], parentNode) {
    const slots = selectSlots(node);
    slots
        .filter(slot => slot.childNodes.length)
        .forEach(slot => {
            addSlot(slot, SLOTS, store, parentNode);
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
        LOST_SLOTS.indexOf(slot) === -1 && LOST_SLOTS.push(slot);
        return;
    }
    const nodes = slotContainer.childNodes;
    if (typeof slotComponent._onSlotPlaced === 'function') {
        slotComponent._onSlotPlaced({ nodes, slotName, slotComponent, slotContainer });
    }
    removeSlot(slot);
    removeSlot(slot, LOST_SLOTS);
    slotComponent?.promise && (await slotComponent.promise);
    slotContainer.append(...slot.childNodes);
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
    clearTimeout(REPORT_TIMEOUT);
    REPORT_TIMEOUT = setTimeout(() => {
        if (VERBOSE && LOST_SLOTS.length) {
            LOST_SLOTS.forEach(slot => {
                console.warn('The following slot could not be placed:', slot);
            });
        }
    }, 200);
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
    component._slots = component._slots ?? [];
    extractSlots(component, component._slots);
}
