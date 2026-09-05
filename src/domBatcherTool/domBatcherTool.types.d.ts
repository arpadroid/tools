export type DomBatcherToolConfigType = {
    batchSize?: number;
    timeout?: number;
};

export type BatchWriteType = {
    element: Element;
    attributes: Record<string, string>;
    props: Record<string, string>;
    promise: Promise<boolean | void>;
    resolve?: (value: boolean | void) => void;
    reject?: (reason?: unknown) => void;
    methods: {
        append?: Set<Element>;
        prepend?: Set<Element>;
        remove?: boolean;
        removeAttribute?: Set<string>;
        setAttribute?: Record<string, string>;
        textContent?: string;
        replaceChildren?: Element;
    };
};

export type BatchWriteMapType = Map<Element, BatchWriteType>;

export type BatchValueType =
    | string
    | Record<string, string>
    | boolean
    | Element[]
    | DocumentFragment
    | Set<Element>;

export type BatchAttributesType = Record<string, string>;

export type WriteType = {
    element?: Element;
    method?: MethodWriteType;
    prop?: PropWriteType;
    value?: BatchValueType | (() => BatchValueType);
    attributes?: BatchAttributesType | (() => BatchAttributesType);
    callback?: () => boolean | void | Promise<boolean | void>;
};

export type MethodWriteType =
    | 'removeAttribute'
    | 'appendChild'
    | 'replaceChild'
    | 'replaceChildren'
    | 'append'
    | 'prepend'
    | 'remove'
    | 'removeChild'
    | 'after'
    | 'before';

export type PropWriteType = 'innerHTML' | 'textContent' | 'insertAdjacentHTML';
