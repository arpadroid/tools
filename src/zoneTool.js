const VERBOSE = true;
const LOST_ZONES = [];
const CALLBACKS = [];
const ZONES = [];
let TIMEOUT = null;
let REPORT_TIMEOUT = null;

/**
 * Selects all zones from a node.
 * @param {HTMLElement} node - The node to search.
 * @returns {HTMLElement[]} The list of zones.
 */
export function selectZones(node) {
    return Array.from(node.querySelectorAll('arpa-zone') ?? []);
}

/**
 * Finds the component that owns a zone.
 * @param {HTMLElement} zone - The zone to search.
 * @returns {HTMLElement | undefined} The component that owns the zone.
 */
export function findNodeComponent(zone) {
    let node = zone;
    while (node) {
        if (Array.isArray(node._zones)) {
            return node;
        }
        node = node.parentElement;
    }
}

/**
 * Gets the parent element of a zone.
 * @param {HTMLElement} zone - The zone to search.
 * @returns {HTMLElement | undefined} The parent of the zone.
 */
export function getZoneParent(zone) {
    let parent = zone?.parentNode;
    while (parent && !(parent instanceof HTMLElement)) {
        parent = parent?.parentNode;
    }
    if (!(parent instanceof HTMLElement)) {
        console.warn('Zone has no parent:', zone);
        return;
    }
    return parent;
}

/**
 * Returns an array where the component zones are stored.
 * @param {HTMLElement[]} store
 * @param {HTMLElement} container - The container of the zones.
 * @returns {HTMLElement[]} The store of zones.
 */
export function getStore(store = [], container) {
    if (container?._zones) {
        return container._zones;
    }
    return store;
}

/**
 * Adds a zone.
 * @param {HTMLElement} zone - The zone to add.
 * @param {HTMLElement[]} [zones] - The list of zones to add to.
 * @param {HTMLElement[]} [$store] - An optional store array.
 * @param {HTMLElement} [parentNode] - The container of the zone.
 */
export async function addZone(zone, zones = ZONES, $store = [], parentNode = zone.parentNode) {
    if (zone?.tagName?.toLocaleLowerCase() !== 'arpa-zone') {
        console.error('Invalid zone:', zone);
        return;
    }
    if (zones.indexOf(zone) > -1) {
        return;
    }
    const store = getStore($store, parentNode);
    store.push(zone);
    zones.push(zone);
    zone._parentNode = parentNode;
    setTimeout(() => {
        if (parentNode._zones && !parentNode._zones.includes(zone)) {
            parentNode._zones.push(zone);
        }
    }, 0);
}

/**
 * Removes a zone.
 * @param {HTMLElement} zone - The zone to remove.
 * @param {HTMLElement[]} [zones] - The list of zones to remove from.
 * @returns {void}
 */
export function removeZone(zone, zones = ZONES) {
    const index = zones.indexOf(zone);
    index > -1 && zones.splice(index, 1);
}

/**
 * Extracts the zones from a node and stores them in an reference object.
 * @param {HTMLElement} node - The node to search.
 * @param {HTMLElement[]} [store] - The key/value store object to add the zones to.
 * @param {HTMLElement} [parentNode] - The parent node of the zones.
 */
export function extractZones(node, store = [], parentNode) {
    const zones = selectZones(node);
    zones
        .filter(zone => zone.childNodes.length)
        .forEach(zone => {
            addZone(zone, ZONES, store, parentNode);
            zone.remove();
        });
}

/**
 * Removes empty zone nodes from a container.
 * @param {HTMLElement} container - The container to search.
 */
export function removeEmptyZoneNodes(container) {
    selectZones(container)?.forEach(node => !node.hasChildNodes() && node.remove());
}

/**
 * Places the zone content into its corresponding container.
 * @param {HTMLElement} zone
 */
export async function placeZone(zone) {
    const zoneName = zone.getAttribute('name');
    const component = findNodeComponent(zone?._parentNode);
    component?.promise && (await component.promise);
    const zoneContainer = component?.querySelector(`[zone="${zoneName}"]`);
    const zoneComponent = findNodeComponent(zoneContainer);
    if (!zoneContainer || !zoneComponent) {
        LOST_ZONES.indexOf(zone) === -1 && LOST_ZONES.push(zone);
        return;
    }
    const nodes = zoneContainer.childNodes;
    if (typeof zoneComponent._onZonePlaced === 'function') {
        zoneComponent._onZonePlaced({ nodes, zoneName, zoneComponent, zoneContainer });
    }
    removeZone(zone);
    removeZone(zone, LOST_ZONES);
    zoneComponent?.promise && (await zoneComponent.promise);
    zoneContainer.append(...zone.childNodes);
}

/**
 * Places the zones contents in their corresponding containers.
 * @param {Record<string, unknown>[]} zones
 */
export async function placeZones(zones = ZONES ?? []) {
    zones.forEach(zone => placeZone(zone));
    while (CALLBACKS.length) {
        CALLBACKS.pop()();
    }
    clearTimeout(REPORT_TIMEOUT);
    REPORT_TIMEOUT = setTimeout(() => {
        if (VERBOSE && LOST_ZONES.length) {
            LOST_ZONES.forEach(zone => {
                if (zone.innerHTML.trim() === '') {
                    removeZone(zone, LOST_ZONES);
                } else {
                    console.warn('The following zone could not be placed:', zone);
                }
            });
        }
    }, 200);
}

/**
 * Handles zones for a node.
 * @param {() => void} onZonesHandled - The callback to call when the zones are handled.
 */
export function handleZones(onZonesHandled) {
    clearTimeout(TIMEOUT);
    TIMEOUT = setTimeout(() => placeZones(), 70);
    typeof onZonesHandled === 'function' && CALLBACKS.push(onZonesHandled);
}

/**
 * Checks if a node has a zone.
 * @param {HTMLElement} node - The node to search.
 * @param {string} name - The zone name.
 * @returns {boolean} The result.
 */
export function hasZone(node, name) {
    return Boolean(node.querySelector(`[zone="${name}"]`));
}

/**
 * Mixin for zone functionality.
 * @param {HTMLElement} component
 */
export function zoneMixin(component) {
    component.placeZone = placeZone;
    component._zones = component._zones ?? [];
    extractZones(component, component._zones);
}
