export interface SearchResult {
    query: string;
    totalResults: number;
    items: SearchResultItem[];
    event?: Event;
}

export interface SearchToolInterface {
    container?: HTMLElement;
    matchClass?: string;
    debounceDelay?: number;
    onSearch?: (result: SearchResult) => Promise<SearchResult> | boolean | void;
    onSearchNode?: (node: HTMLElement, isMatch) => void;
    getNodes?: () => HTMLElement[];
    searchSelector?: string;
    addMarkers?: boolean;
    hideNonMatches?: boolean;
}
