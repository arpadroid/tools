export interface SearchResult {
    query: string;
    totalResults?: number;
    items?: [];
    event?: Event;
    nodes?: Element[];
}

export interface SearchToolType {
    container?: HTMLElement;
    matchClass?: string;
    debounceDelay?: number;
    onSearch?: (result: SearchResult) => Promise<SearchResult> | boolean | void;
    onSearchNode?: (node: Element, isMatch: boolean) => void | boolean;
    getNodes?: () => HTMLElement[];
    searchSelector?: string;
    addMarkers?: boolean;
    hideNonMatches?: boolean;
    nodes?: HTMLElement[];
}
