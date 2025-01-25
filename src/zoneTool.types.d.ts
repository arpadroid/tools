export type ZoneToolPlaceZoneType = {
    nodes?: NodeList;
    zoneName?: string | null;
    zoneComponent?: ElementType | null | undefined;
    zoneContainer?: Element | null | undefined;
    zone?: ZoneType;
};

export type ZoneType = HTMLElement & {
    _parentNode?: ParentNode | null;
    name: string;
    _onPlaceZone?: (zone: ZoneToolPlaceZoneType) => void;
};

export type ComponentType = HTMLElement & {
    _parentNode?: ParentNode | null;
    _onPlaceZone?: (zone: ZoneToolPlaceZoneType) => void;
    getProperty?: (name: string) => string | null | undefined;
    _zones?: Set<ZoneType>;
    zonesByName?: Set<string>;
    originalContent?: string;
    _hasRendered?: boolean;
    _lastRendered?: number;
    _config?: Record<string, unknown>;
    [key: string]: any;
};

export type ElementType = ComponentType & (Element | HTMLElement | ZoneType | ParentNode);
