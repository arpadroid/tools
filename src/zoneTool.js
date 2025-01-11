/**
 * @typedef {import('./zoneTool.type.d.ts').ZoneToolPlaceZoneType} ZoneToolPlaceZoneType
 * @typedef {import('@arpadroid/arpadroid/node_modules/@arpadroid/ui/dist/arpadroid-ui.js').ArpaElement} ArpaElement
 */

import { debounce, throttle } from './functionTool.js';
import { appendNodes } from './nodeTool.js';

const VERBOSE = false;
export const LOST_ZONES = new Set();
export const ZONES = new Set();
export const ZONE_SELECTOR = 'zone';

/**
 * Selects all zones from a node.
 * @param {HTMLElement} node - The node to search.
 * @returns {HTMLElement[]} The list of zones.
 */
export function selectZones(node) {
    const zoneSelector =
        (typeof node?.getProperty === 'function' && node?.getProperty('zone-selector')) || ZONE_SELECTOR;

    return Array.from(node.querySelectorAll(zoneSelector));
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
 * @param {HTMLElement[]} [zones] - The list of zones to add to.
 * @param {HTMLElement[]} [$store] - An optional store array.
 * @param {HTMLElement} [parentNode] - The container of the zone.
 */
export async function addZone(zone, zones = ZONES, $store = new Set(), parentNode) {
    if (zone?.tagName?.toLowerCase() !== 'zone' || zones.has(zone)) {
        console.error('Invalid or existing zone:', zone);
        return;
    }
    zone._parentNode = parentNode || zone.parentNode;
    const nodeComponent = findNodeComponent(zone);
    const store = nodeComponent?._zones || $store;
    nodeComponent?.zonesByName?.add(zone.getAttribute('name'));
    store?.add(zone);
    zones?.add(zone);
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
    for (const zone of zones) {
        zone.innerHTML.trim() && addZone(zone, ZONES, store, parentNode);
        zone.remove();
    }
}

/**
 * Places the zone content into its corresponding container.
 * @param {HTMLElement} zone
 * @returns {boolean} Whether the zone was placed.
 */
export async function placeZone(zone) {
    const parent = zone?._parentNode;
    if (!parent) return;
    const zoneName = zone.getAttribute('name');
    /** @type {ArpaElement | HTMLElement} */
    const component = findNodeComponent(parent);
    /** @type {HTMLElement} */
    const zoneContainer = component?.querySelector(`[zone="${zoneName}"]`);
    /** @type {ArpaElement | HTMLElement} */
    const zoneComponent = findNodeComponent(zoneContainer);
    if (!zoneContainer || !zoneComponent) {
        component?.zonesByName?.add(zoneName);
        LOST_ZONES.add(zone);
        return;
    }

    if (typeof zoneComponent._onPlaceZone === 'function') {
        const nodes = zoneContainer.childNodes;
        /** @type {ZoneToolPlaceZoneType} */
        const payload = { nodes, zoneName, zoneComponent, zoneContainer, zone };
        zoneComponent._onPlaceZone(payload);
    }
    ZONES.delete(zone);
    LOST_ZONES.delete(zone);
    const append = () => appendNodes(zoneContainer, zone.childNodes);
    if (typeof zoneComponent.onRendered === 'function') {
        zoneComponent.onRendered(append);
    } else {
        append();
    }
}

/**
 * Checks if a node has a zone with a specific name.
 * @param {HTMLElement} component - An HTML node.
 * @param {string} name - The name of the zone.
 * @returns {boolean} Whether the node has the zone.
 */
export function hasZone(component, name) {
    return component.zonesByName.has(name) || component?.parentNode?.zonesByName?.has(name);
}

/**
 * Gets a zone from a component.
 * @param {HTMLElement} component - The component to search.
 * @param {string} name - The name of the zone.
 * @returns {HTMLElement | boolean} The zone or false if not found.
 */
export function getZone(component, name) {
    for (const zone of component._zones) {
        if (zone.getAttribute('name') === name) return zone;
    }
    return false;
}

const benchmark = debounce((start, end) => {
    if (LOST_ZONES.size) {
        const zoneMap = Array.from(LOST_ZONES).map(zone => ({
            name: zone.getAttribute('name'),
            zoneHTML: zone.outerHTML,
            parentHTML: zone._parentNode
        }));
        console.warn(`${LOST_ZONES.size} zones could not be placed:`, zoneMap);
    }

    console.info('\x1b[94m%s\x1b[0m', 'All zones placed in', Math.round(end - start), 'ms', {
        ZONES,
        LOST_ZONES
    });
    // for (const zone of LOST_ZONES) ZONES.delete(zone);
    // LOST_ZONES.clear();
}, 500);

/**
 * Inserts zones into the DOM.
 * @param {Set<HTMLElement>} [zones] - The zones to insert.
 * @param {number} [maxBatchSize] - The maximum batch size.
 * @param {boolean} [isRetry] - Whether it is a retry.
 * @param {number} [start] - The start time.
 */
export function insertZones(zones = ZONES, maxBatchSize = 25, isRetry = false, start = performance.now()) {
    const originalSize = zones.size;
    let batch = 0;
    for (const zone of zones) {
        placeZone(zone);
        batch++;
        if (batch >= maxBatchSize) break;
    }

    const doRetry = !isRetry || ZONES.size < originalSize;
    setTimeout(() => {
        if (ZONES.size && doRetry) {
            insertZones(zones, maxBatchSize, true, start);
        } else {
            for (const zone of LOST_ZONES) placeZone(zone);
            if (VERBOSE) {
                benchmark(start, performance.now());
            }
        }
    });
}

export const insertZonesThrottled = throttle(insertZones, 10);

/**
 * Handles zones for a node.
 */
export function handleZones() {
    insertZonesThrottled();
}

/**
 * Mixin for zone functionality.
 * @param {HTMLElement} component
 * @param {HTMLElement} parent
 */
export function zoneMixin(component, parent) {
    !(component?._zones instanceof Set) && (component._zones = new Set());
    if (!component.zonesByName) {
        component.zonesByName = new Set();
    }
    extractZones(component, component._zones, parent);
}

/**
 * Destroys the zones of a component.
 * @param {HTMLElement} component
 */
export function destroyComponentZones(component) {
    if (!component?._zones?.size) return;
    setTimeout(() => {
        if (!component.isConnected) {
            for (const zone of component?._zones) {
                removeZone(zone);
                removeZone(zone, LOST_ZONES);
            }
            component._zones = new Set();
        }
    }, 5);
}
