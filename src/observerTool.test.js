import ObserverTool from './observerTool';

class TestClass {
    testProperty = false;
    /** @type {Function} */
    signal;
    /** @type {Function} */
    listen;
    /** @type {Function} */
    initializeListener;

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
        expect(callback).toHaveBeenCalledWith(true, undefined, undefined);

        instance.changeTestProperty(false);
        expect(callback).toHaveBeenCalledWith(false, undefined, undefined);

        unsubscribe();
        expect(callback).toHaveBeenCalledTimes(2);

        instance.changeTestProperty(false);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('Prevents running duplicate subscriptions with initializeListener', () => {
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
         * We subscribe to the property thrice with initializeListener, but the callback should only be called once.
         */
        const callback2 = jest.fn();
        const doSubscribe = () => {
            instance.initializeListener('test_subscriptions', () => {
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
