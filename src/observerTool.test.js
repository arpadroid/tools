import ObserverTool from './observerTool';

class TestClass {
    testProperty = false;
    /** @type {(property: string, value: unknown) => void} signal */
    signal;
    /** @type {(property: string, callback: () => unknown) => () => void} listen */
    listen;
    /** @type {(id: string, callback: () => unknown) => void} listen */
    initializeObservers;

    constructor() {
        ObserverTool.mixin(this);
    }

    changeTestProperty(value) {
        this.testProperty = value;
        this.signal('TEST_PROPERTY', value);
    }
}

describe('Observer tool', () => {
    it('Subscribes to a property, receives callbacks and unsubscribes', () => {
        const callback = jest.fn();
        const instance = new TestClass();
        const unsubscribe = instance.listen('TEST_PROPERTY', callback);

        instance.changeTestProperty(true);
        expect(callback).toHaveBeenCalledWith(true, undefined);

        instance.changeTestProperty(false);
        expect(callback).toHaveBeenCalledWith(false, undefined);

        unsubscribe();
        expect(callback).toHaveBeenCalledTimes(2);

        instance.changeTestProperty(false);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('Prevents running duplicate subscriptions with initializeObservers', () => {
        const callback = jest.fn();
        const instance = new TestClass();
        const unsubscribe = instance.listen('TEST_PROPERTY', callback);
        const unsubscribe2 = instance.listen('TEST_PROPERTY', callback);
        instance.changeTestProperty(true);
        expect(callback).toHaveBeenCalledTimes(2);
        unsubscribe();
        instance.changeTestProperty(true);
        expect(callback).toHaveBeenCalledTimes(3);
        unsubscribe2();
        instance.changeTestProperty(true);
        expect(callback).toHaveBeenCalledTimes(3);
        /**
         * We subscribe to the property thrice with initializeObservers, but the callback should only be called once.
         */
        const callback2 = jest.fn();
        const doSubscribe = () => {
            instance.initializeObservers('test_subscriptions', () => {
                instance.listen('TEST_PROPERTY', callback2);
            });
        };
        doSubscribe();
        doSubscribe();
        doSubscribe();
        instance.changeTestProperty(true);
        expect(callback2).toHaveBeenCalledTimes(1);
    });
});
