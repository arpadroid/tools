export interface ClassNamesRecord {
    [key: string]: ClassNamesValueType;
}

export type ClassNamesValueType = string | string[] | ClassNamesRecord | undefined | null | false;
