export interface SearchResultType {
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
    onSearch?: (result: SearchResultType) => Promise<SearchResultType> | boolean | void;
    onSearchNode?: (node: Element, isMatch: boolean) => void | boolean;
    getNodes?: () => HTMLElement[];
    searchSelector?: string;
    addMarkers?: boolean;
    hideNonMatches?: boolean;
    nodes?: HTMLElement[];
}
