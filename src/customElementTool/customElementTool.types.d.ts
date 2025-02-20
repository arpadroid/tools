export type CustomElementChildOptionsType = {
    tag?: string;
    attr?: Record<string, string>;
    className?: string;
    content?: string;
    hasZone?: boolean;
};

export interface CustomElementConstructor {
    new (...args: any[]): HTMLElement;
}
