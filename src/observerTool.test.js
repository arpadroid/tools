import ObserverTool from './observerTool';

class TestClass {
    testProperty = false;
    /** @type {Function} */
    signal;
    /** @type {Function} */
    on;

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
        const unsubscribe = instance.on('TEST_PROPERTY', callback);

        instance.changeTestProperty(true);
        expect(callback).toHaveBeenCalledWith(true, undefined, undefined);

        instance.changeTestProperty(false);
        expect(callback).toHaveBeenCalledWith(false, undefined, undefined);

        unsubscribe();
        expect(callback).toHaveBeenCalledTimes(2);

        instance.changeTestProperty(false);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('Checks that no duplicate subscribes are made for the same signal and callback for the instance', () => {
        const callback = jest.fn();
        const instance = new TestClass();
        const unsubscribe = instance.on('TEST_PROPERTY', callback);
        instance.on('TEST_PROPERTY', callback);
        instance.changeTestProperty(true);
        expect(callback).toHaveBeenCalledTimes(1);

        unsubscribe();
        instance.changeTestProperty(true);
        instance.changeTestProperty(true);
        instance.changeTestProperty(true);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
