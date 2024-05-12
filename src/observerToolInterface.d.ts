export type SignalInterface = (signalName: string, value: unknown, event: unknown) => void;

export type ListenerInterface = (
    signalName: string,
    callback: (value: unknown, event: unknown) => void
) => void;

export type initializeListenerInterface = (signalName, callback) => void;