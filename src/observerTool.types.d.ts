export type SignalType = (value?: unknown, param1?: unknown, param2?: unknown) => void;

export type UnsubscribeType = () => void;

export type ListenerType = (
    signalName: string,
    callback: SignalType,
    unsubscribes: UnsubscribeType[] | undefined
) => UnsubscribeType | undefined;

export type OffType = (signalName: string, callback: SignalType) => void;

export type ObserverType = {
    on?: ListenerType;
    off?: OffType;
    signal?: (signalName: string, value?: unknown, param1?: unknown, param2?: unknown) => void | undefined;
    unsubscribe?: (signalName: string, callback: SignalType) => UnsubscribeType;
    _observerTool?: {
        callbacks?: Record<string, Set<SignalType>>;
    };
};
