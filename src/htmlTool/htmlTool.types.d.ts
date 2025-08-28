export type ClassNamesValueType =
    | string
    | string[]
    | Record<string, ClassNamesValueType>
    | undefined
    | null
    | false;
