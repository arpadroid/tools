export type FilePayloadType = File | {
    file?: File;
    name?: string;
    extension?: string;
    size?: number;
}