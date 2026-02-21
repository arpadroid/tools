export type SettableType<T = any> = T & {
    [key: string]: any;
};

export type CallableType<T = any> = T & {
    [key: string]: any;
};

export type AbstractContentInterface = string | number | HTMLElement;

declare global {
    interface Window {
        arpaSafeIDs: Record<string, boolean>;
    }
}
