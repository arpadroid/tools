export type PlaceToolOptionsType = Record<string, unknown> & {
    position?: string;
    container?: HTMLElement | null | string;
    offset?: number;
    verticalOffset?: number;
    horizontalOffset?: number;
};
