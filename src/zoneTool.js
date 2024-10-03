const VERBOSE = true;
const LOST_ZONES = new Set();
const ZONES = new Set();
let TIMEOUT = null;
let START_TIME = 0;
let END_TIME = 0;
let DURATION = 0;

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
        if (node._zones instanceof Set) {
            return node;
        }
        node = node.parentElement;
    }
}

/**
 * Adds a zone.
 * @param {HTMLElement} zone - The zone to add.
 * @param {HTMLElement} [parentNode] - The container of the zone.
 * @param {HTMLElement[]} [zones] - The list of zones to add to.
 * @param {HTMLElement[]} [$store] - An optional store array.
 */
export async function addZone(zone, zones = ZONES, $store = new Set(), parentNode) {
    if (zone?.tagName?.toLowerCase() !== 'arpa-zone') {
        console.error('Invalid zone:', zone);
        return;
    }
    if (zones.has(zone)) {
        return;
    }
    zone._parentNode = parentNode || zone.parentNode;
    const parentComponent = findNodeComponent(zone);
    const store = parentComponent?._zones || $store;
    // setTimeout(() => {
    //     if (parentNode._zones && !parentNode._zones.has(zone)) {
    //         parentNode._zones.add(zone);
    //     }
    // }, 0);

    store.add(zone);
    zones.add(zone);
}

/**
 * Removes a zone.
 * @param {HTMLElement} zone - The zone to remove.
 * @param {HTMLElement[]} [zones] - The list of zones to remove from.
 * @returns {void}
 */
export function removeZone(zone, zones = ZONES) {
    zones.delete(zone);
}

/**
 * Extracts the zones from a node and stores them in an reference object.
 * @param {HTMLElement} node - The node to search.
 * @param {HTMLElement[]} [store] - The key/value store object to add the zones to.
 * @param {HTMLElement} [parentNode] - The parent node of the zones.
 */
export function extractZones(node, store = new Set(), parentNode) {
    const zones = selectZones(node);
    zones.forEach(zone => {
        addZone(zone, ZONES, store, parentNode);
        zone.remove();
    });
}

/**
 * Places the zone content into its corresponding container.
 * @param {HTMLElement} zone
 */
export async function placeZone(zone) {
    !START_TIME && (START_TIME = performance.now());
    const parent = zone?._parentNode;
    const zoneName = zone.getAttribute('name');
    const component = findNodeComponent(parent);
    const zoneContainer = component?.querySelector(`[zone="${zoneName}"]`);
    const zoneComponent = findNodeComponent(zoneContainer);
    if (!zoneContainer || !zoneComponent) {
        LOST_ZONES.add(zone);
        return;
    }
    const nodes = zoneContainer.childNodes;
    if (typeof zoneComponent._onZonePlaced === 'function') {
        zoneComponent._onZonePlaced({ nodes, zoneName, zoneComponent, zoneContainer });
    }
    ZONES.delete(zone);
    LOST_ZONES.delete(zone);
    const fragment = document.createDocumentFragment();
    fragment.append(...zone.childNodes);
    zoneContainer.appendChild(fragment);
}

/**
 * Checks if a node has a zone with a specific name.
 * @param {HTMLElement} component - An HTML node.
 * @param {string} name - The name of the zone.
 * @returns {boolean} Whether the node has the zone.
 */
export function hasZone(component, name) {
    for (const zone of component._zones) {
        if (zone.getAttribute('name') === name) {
            return zone;
        }
    }
    return false;
}

/**
 * Places the zones contents in their corresponding containers.
 * @param {Record<string, unknown>[]} zones
 */
export async function placeZones(zones = ZONES) {
    zones.forEach(zone => placeZone(zone));
}

/**
 * Handles zones for a node.
 * @param {HTMLElement[]} _zones - The node to search.
 */
export function handleZones(_zones) {
    requestAnimationFrame(() => placeZones(_zones));
    clearTimeout(TIMEOUT);
    TIMEOUT = setTimeout(() => {
        if (VERBOSE && !LOST_ZONES.size && !ZONES.size) {
            END_TIME = performance.now();
            DURATION = END_TIME - START_TIME;
            START_TIME = 0;
            console.info('All zones placed in', DURATION, 'ms');
        }
        LOST_ZONES.size && placeZones(LOST_ZONES);
        if (VERBOSE && LOST_ZONES.size) {
            LOST_ZONES.forEach(zone => {
                const html = zone.innerHTML.trim();
                console.warn('The following zone could not be placed:', zone, html);
            });
        }
    }, 30);
}

/**
 * Destroys the zones of a component.
 * @param {HTMLElement} component - The component to destroy.
 */
export function onDestroy(component) {
    component?._zones?.forEach(zone => removeZone(zone));
    component._zones = new Set();
}

/**
 * Mixin for zone functionality.
 * @param {HTMLElement} component
 * @param {Set[]} [store]
 */
export function zoneMixin(component) {
    if (!(component?._zones instanceof Set)) {
        component._zones = new Set();
    }
    const originalCallback = component._onDestroy || (() => {});
    component._onDestroy = function () {
        onDestroy(component);
        originalCallback.call(component);
    }.bind(component);
    extractZones(component, component._zones);
}
