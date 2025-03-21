export type CustomElementChildOptionsType = {
    tag?: string;
    attr?: Record<string, string>;
    className?: string;
    content?: string;
    hasZone?: boolean;
    zoneName?: string;
    propName?: string;
    canRender?: (component) => boolean;
};

export interface CustomElementConstructor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): HTMLElement;
}
