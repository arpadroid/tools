/**
 * @typedef {import('./zoneTool.types').ZoneToolPlaceZoneType} ZoneToolPlaceZoneType
 * @typedef {import('./zoneTool.types').ZoneType} ZoneType
 * @typedef {import('../searchTool/searchTool.js').ElementType} ElementType
 */

import { getProperty } from '../customElementTool/customElementTool.js';
import { debounce, throttle } from '../functionTool/functionTool.js';
import { appendNodes } from '../nodeTool/nodeTool.js';

/** @type {boolean} */
const VERBOSE = true;
/** @type {Set<ZoneType>} */
export const LOST_ZONES = new Set();
/** @type {Set<ZoneType>} */
export const ZONES = new Set();
/** @type {string} */
export const ZONE_SELECTOR = 'zone';
export const ZONE_INSERTION_INTERVAL = 10;
export const ZONE_BENCHMARK_INTERVAL = 500;

/**
 * Returns the zones in a nice printable format.
 * @param {Set<ZoneType> | ZoneType[]} [zones] - The zones to print.
 * @returns {Record<string, unknown>[]}
 */
export function getPrintableZones(zones = ZONES) {
    return Array.from(zones).map(zone => ({
        name: zone.getAttribute('name'),
        zoneHTML: zone.outerHTML,
        zoneText: zone.innerText,
        parentHTML: zone._parentNode
    }));
}

/**
 * Filters zones.
 * @param {ZoneType[]} zones - The zones to filter.
 * @param {ElementType} component - The component to filter the zones for.
 * @param {import('./zoneTool.types').ZoneFilterType} [filter] - The filter function.
 * @returns {ZoneType[]} The filtered zones.
 */
export function filterZones(zones, component, filter = component._config?.zoneFilter) {
    if (typeof filter === 'function') {
        return filter(zones, component);
    }
    return zones;
}

/**
 * Selects all zones from a node.
 * @param {ElementType} node - The node to search.
 * @returns {ZoneType[]} The list of zones.
 */
export function selectZones(node) {
    const zoneSelector = getProperty(node, 'zone-selector') || ZONE_SELECTOR;
    return filterZones(Array.from(node.querySelectorAll(zoneSelector)), node);
}

/**
 * Finds the component that owns a zone.
 * @param {ElementType | any} zone - The zone to search.
 * @returns {ElementType | undefined} The component that owns the zone.
 */
export function findNodeComponent(zone) {
    /** @type {ElementType | null} */
    if (!zone) return;
    let node = zone;
    while (node) {
        if (node?._zones instanceof Set) {
            return node;
        }
        node = node.parentElement;
    }
}

/**
 * Returns the zone registry of a zone.
 * @param {ZoneType} zone - The zone to register.
 * @returns {string[]} The zone registry.
 */
export function getZoneRegistry(zone) {
    if (!(zone?._parentNode instanceof HTMLElement)) {
        return [];
    }
    return zone._parentNode.getAttribute('zone-registry')?.trim().split(',').filter(Boolean) || [];
}

/**
 * Adds a zone to the registry.
 * @param {ZoneType} zone - The zone to register.
 */
export function registerZoneInParentNode(zone) {
    if (!(zone?._parentNode instanceof HTMLElement)) {
        console.error('Zone has no parent:', zone);
        return;
    }
    const registry = getZoneRegistry(zone);
    const zoneName = zone.getAttribute('name');
    if (zoneName && !registry.includes(zoneName)) {
        registry.push(zoneName);
        zone._parentNode.setAttribute('zone-registry', registry.join(','));
    }
}

/**
 * Checks if a component has a zone registered.
 * @param {ElementType} component
 * @param {string} zoneName
 * @returns {boolean} Whether the zone is registered.
 */
export function hasRegisteredZone(component, zoneName) {
    return component?.getAttribute('zone-registry')?.split(',').includes(zoneName);
}

/**
 * Adds a zone.
 * @param {ZoneType} zone - The zone to add.
 * @param {Set<ZoneType>} [zones] - The list of zones to add to.
 * @param {Set<ZoneType>} [$store] - An optional store array.
 * @param {ElementType} [parentNode] - The container of the zone.
 */
export async function addZone(zone, zones = ZONES, $store = new Set(), parentNode) {
    if (zone?.tagName?.toLowerCase() !== 'zone' || zones.has(zone)) {
        console.error('Invalid or existing zone:', zone);
        return;
    }

    zone._parentNode = parentNode || zone.parentNode;
    const nodeComponent = findNodeComponent(zone);
    const store = nodeComponent && '_zones' in nodeComponent ? nodeComponent._zones : $store;
    /** @type {string | null} */
    const zoneName = zone.getAttribute('name');
    if (zoneName) {
        nodeComponent?.zonesByName?.add(zoneName);
        registerZoneInParentNode(zone);
        store?.add(zone);
        zones?.add(zone);
    } else {
        console.warn('Zone has no name:', zone);
    }
}

/**
 * Removes a zone.
 * @param {ZoneType} zone - The zone to remove.
 * @param {Set<ZoneType>} [zones] - The list of zones to remove from.
 * @returns {void}
 */
export function removeZone(zone, zones = ZONES) {
    zones.delete(zone);
}

/**
 * Extracts the zones from a node and stores them in an reference object.
 * @param {ElementType} node - The node to search.
 * @param {Set<ZoneType>} [store] - The key/value store object to add the zones to.
 * @param {ElementType} [parentNode]
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
 * @param {ZoneType} zone
 * @returns {Promise<boolean | undefined>} Whether the zone was placed.
 */
export async function placeZone(zone) {
    const parent = zone?._parentNode;
    if (!parent) return;
    const zoneName = zone.getAttribute('name');
    const component = parent && findNodeComponent(parent);
    const zoneContainer = component?.querySelector(`[zone="${zoneName}"]`);
    const nodes = zoneContainer?.childNodes;
    const zoneComponent = findNodeComponent(zoneContainer);
    /** @type {ZoneToolPlaceZoneType} */
    const payload = { nodes, zoneName, zoneComponent, zoneContainer, zone };

    if (!zoneContainer || !zoneComponent) {
        component && zoneName && component?.zonesByName?.add(zoneName);
        let registerLostZone = true;
        if (typeof component?._onLostZone === 'function' && component._onLostZone(payload) === true) {
            registerLostZone = false;
        }
        registerLostZone && LOST_ZONES.add(zone);
        return;
    }

    if (typeof zoneComponent?._onPlaceZone === 'function') {
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
 * @param {ElementType & HTMLElement} component - An HTML node.
 * @param {string} name
 * @returns {boolean} Whether the node has the zone.
 */
export function hasZone(component, name) {
    return (
        hasRegisteredZone(component, name) ||
        component?.zonesByName?.has(name) ||
        component?.parentElement?.zonesByName?.has(name)
    );
}

/**
 * Gets a zone from a component.
 * @param {ElementType} component - The component to search.
 * @param {string} name
 * @returns {ZoneType | null} The zone or false if not found.
 */
export function getZone(component, name) {
    if (component._zones) {
        for (const zone of component._zones) {
            if (zone.getAttribute('name') === name) return zone;
        }
    }
    return null;
}

/**
 * Benchmarks zone placement.
 * @param {number} start - The start time.
 * @param {number} end - The end time.
 */
export const benchmark = (start, end) => {
    if (LOST_ZONES.size) {
        const zoneMap = getPrintableZones(LOST_ZONES);
        console.warn(`${LOST_ZONES.size} zones could not be placed:`, zoneMap);
    }

    console.info('\x1b[94m%s\x1b[0m', 'All zones placed in', Math.round(end - start), 'ms', {
        ZONES,
        LOST_ZONES
    });
    // for (const zone of LOST_ZONES) ZONES.delete(zone);
    // LOST_ZONES.clear();
};

/**
 * Benchmarks zone placement.
 */
/**
 * @callback BenchmarkCallback
 * @param {number} start
 * @param {number} end
 */

/**
 * Benchmarks zone placement.
 * @type {BenchmarkCallback}
 */
const benchMarkCallback = (start, end) => benchmark(start, end);

/**
 * Debounces the benchmark function.
 * @type {BenchmarkCallback}
 */
// @ts-ignore
const benchmarkDebounced = debounce(benchMarkCallback, ZONE_BENCHMARK_INTERVAL);

/**
 * Inserts zones into the DOM.
 * @param {Set<ZoneType>} [zones] - The zones to insert.
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
                benchmarkDebounced(start, performance.now());
            }
        }
    });
}

export const insertZonesThrottled = throttle(insertZones, ZONE_INSERTION_INTERVAL);

/**
 * Handles zones for a node.
 */
export function handleZones() {
    insertZonesThrottled();
}

/**
 * Mixin for zone functionality.
 * @param {ElementType | undefined} component
 * @param {ElementType | undefined} [parent]
 */
export function zoneMixin(component, parent) {
    if (!component) return;
    !(component?._zones instanceof Set) && (component._zones = new Set());
    if (!component.zonesByName) {
        component.zonesByName = new Set();
    }
    extractZones(component, component._zones, parent);
}

/**
 * Destroys the zones of a component.
 * @param {ElementType} component
 */
export function destroyComponentZones(component) {
    const zones = component?._zones || new Set();
    if (!component?._zones?.size) return;
    setTimeout(() => {
        if (!component.isConnected) {
            for (const zone of zones) {
                removeZone(zone);
                removeZone(zone, LOST_ZONES);
            }
            component._zones = new Set();
        }
    }, 5);
}
