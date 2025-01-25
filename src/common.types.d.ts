/* eslint-disable @typescript-eslint/no-explicit-any */
export type SettableType<T = any> = T & {
    [key: string]: any;
};

export type CallableType<T = any> = T & {
    [key: string]: any;
};