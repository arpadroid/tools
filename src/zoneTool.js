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
    !START_TIME && (START_TIME = performance.now());
    for (const zone of zones) {
        placeZone(zone);
    }
}

const benchmark = debounce(time => {
    if (VERBOSE && LOST_ZONES.size) {
        console.warn(`${LOST_ZONES.size} zones could not be placed:`, {
            LOST_ZONES,
            contents: Array.from(LOST_ZONES).map(zone => zone.innerHTML.trim())
        });
    }
    if (VERBOSE) {
        const diff = performance.now() - time;
        END_TIME = performance.now();
        DURATION = END_TIME - START_TIME - diff;
        START_TIME = 0;
        console.info('All zones placed in', Math.round(DURATION), 'ms', { ZONES, LOST_ZONES });
    }
}, 400);

const placeLostZones = throttle(() => {
    VERBOSE && console.log('LOST_ZONES', [...LOST_ZONES]);
    LOST_ZONES.size && placeZones(LOST_ZONES);
}, 30);

/**
 * Handles zones for a node.
 * @param {HTMLElement[]} _zones - The node to search.
 */
export function handleZones(_zones) {
    requestAnimationFrame(() => placeZones(_zones));
    placeLostZones();
    benchmark(performance.now());
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
