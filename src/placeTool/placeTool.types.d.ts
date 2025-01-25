declare global {
    interface Window {
        arpaSafeIDs: Record<string, boolean>;
        i18nInstance: any;
    }
}

export type PlaceToolOptionsType = Record<string, unknown> & {
    position?: string;
    container?: HTMLElement;
    offset?: number;
    verticalOffset?: number;
    horizontalOffset?: number;
};
