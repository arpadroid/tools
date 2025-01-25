export type NodeType = HTMLElement & {
    webkitExitFullscreen: () => void;
    webkitRequestFullscreen: () => void;
    msRequestFullscreen: () => void;
    msExitFullscreen: () => void;
    exitFullscreen: () => void;
};

export type DocumentType = Document & {
    webkitExitFullscreen: () => void;
    webkitRequestFullscreen: () => void;
    msRequestFullscreen: () => void;
    msExitFullscreen: () => void;
    exitFullscreen: () => void;
};