/**
 * @typedef {import('./zoneTool.type.d.ts').ZoneToolPlaceZoneType} ZoneToolPlaceZoneType
 */

import { debounce, throttle } from './functionTool.js';
import { appendNodes } from './nodeTool.js';

const VERBOSE = true;
const LOST_ZONES = new Set();
const ZONES = new Set();
let START_TIME = 0;
let END_TIME = 0;
let DURATION = 0;

/**
 * Selects all zones from a node.
 * @param {HTMLElement} node - The node to search.
 * @returns {HTMLElement[]} The list of zones.
 */
export function selectZones(node) {
    return Array.from(node.querySelectorAll('zone'));
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
    const store = findNodeComponent(zone)?._zones || $store;
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
    if (!parent) {
        return;
    }
    const zoneName = zone.getAttribute('name');
    const component = findNodeComponent(parent);
    const zoneContainer = component?.querySelector(`[zone="${zoneName}"]`);
    const zoneComponent = findNodeComponent(zoneContainer);
    if (!zoneContainer || !zoneComponent) {
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
    appendNodes(zoneContainer, zone.childNodes);
    return true;
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

const benchmark = debounce(() => {
    LOST_ZONES.size &&
        console.warn(
            `${LOST_ZONES.size} zones could not be placed:`,
            Array.from(LOST_ZONES).map(zone => ({
                name: zone.getAttribute('name'),
                zoneHTML: zone.outerHTML
            }))
        );
    DURATION = Math.round(END_TIME - START_TIME);
    START_TIME = 0;
    console.info('\x1b[94m%s\x1b[0m', 'All zones placed in', Math.round(DURATION), 'ms', {
        ZONES,
        LOST_ZONES
    });
}, 500);

/**
 * Inserts zones into the DOM.
 * @param {Set<HTMLElement>} [zones] - The zones to insert.
 * @param {number} [maxBatchSize] - The maximum batch size.
 */
export function insertZones(zones = ZONES, maxBatchSize = 46) {
    if (zones.size) {
        let batch = 0;
        for (const zone of zones) {
            placeZone(zone);
            batch++;
            if (batch >= maxBatchSize) break;
        }
    }
    setTimeout(() => {
        if (ZONES.size) {
            insertZones(zones, maxBatchSize);
        } else {
            for (const zone of LOST_ZONES) placeZone(zone);
            if (VERBOSE) {
                END_TIME = performance.now();
                benchmark();
            }
        }
    });
}

export const insertZonesThrottled = throttle(insertZones, 10);

/**
 * Handles zones for a node.
 */
export function handleZones() {
    !START_TIME && (START_TIME = performance.now());
    insertZonesThrottled();
}

/**
 * Destroys the zones of a component.
 * @param {HTMLElement} component - The component to destroy.
 */
export function onDestroy(component) {
    for (const zone of component?._zones || []) {
        removeZone(zone);
        removeZone(zone, LOST_ZONES);
    }
    component._zones = new Set();
}

/**
 * Mixin for zone functionality.
 * @param {HTMLElement} component
 */
export function zoneMixin(component) {
    !(component?._zones instanceof Set) && (component._zones = new Set());
    const originalCallback = component._onDestroy || (() => {});
    component._onDestroy = function () {
        onDestroy(component);
        originalCallback.call(component);
    }.bind(component);
    extractZones(component, component._zones);
}
