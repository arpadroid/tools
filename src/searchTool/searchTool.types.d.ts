export type SearchResultType = {
    query: string;
    totalResults?: number;
    items?: [];
    event?: Event;
    nodes?: Element[];
}

export type SearchToolCallbackType = (result: SearchResultType) => Promise<SearchResultType | boolean | void>;

export type SearchToolConfigType = {
    container?: HTMLElement | Element | null;
    matchClass?: string;
    debounceDelay?: number;
    onSearch?: SearchToolCallbackType;
    onSearchNode?: (node: Element, isMatch: boolean) => void | boolean;
    getNodes?: () => HTMLElement[];
    searchSelector?: string;
    addMarkers?: boolean;
    hideNonMatches?: boolean;
    nodes?: HTMLElement[];
}
