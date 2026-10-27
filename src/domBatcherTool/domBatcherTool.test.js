import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { DomBatcherTool } from './domBatcherTool.js';
/** @typedef {import('./domBatcherTool.types').BatchWriteType} BatchWriteType */

describe('DomBatcherTool', () => {
    /** @type {DomBatcherTool} */
    let batcher;
    /** @type {HTMLDivElement} */
    let element;

    beforeEach(() => {
        batcher = new DomBatcherTool();
        element = document.createElement('div');
        jest.spyOn(batcher, 'flushWrites').mockImplementation(async () => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('executes queued callbacks once', async () => {
        const callback = jest.fn();
        const promise = batcher.write(element, { fn: callback });
        const write = batcher.getWriteStub(element);

        batcher.doWrite(write);
        await expect(promise).resolves.toBeUndefined();
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('applies replaceWith writes and settles the write promise', async () => {
        const parent = document.createElement('div');
        const replacement = document.createElement('span');
        parent.append(element);

        const promise = batcher.writeMethod(element, 'replaceWith', replacement);
        const write = batcher.getWriteStub(element);

        batcher.doWrite(write);
        await expect(promise).resolves.toBeUndefined();
        expect(parent.firstElementChild).toBe(replacement);
        expect(batcher.getWrite(element)).toBeUndefined();
    });

    it('passes per-write batching options to the flush', async () => {
        const promise = batcher.innerHTML(element, '<span>batched</span>', { batchSize: 12, timeout: 1 });
        const write = batcher.getWriteStub(element);

        expect(batcher.flushWrites).toHaveBeenCalledWith(expect.objectContaining({ batchSize: 12, timeout: 1 }));
        batcher.doWrite(write);
        await expect(promise).resolves.toBeUndefined();
        expect(element.querySelector('span')?.textContent).toBe('batched');
    });

    it('coalesces property and attribute writes for the same element', async () => {
        const firstPromise = batcher.write(element, { prop: 'textContent', value: 'first' });
        const secondPromise = batcher.write(element, {
            prop: 'textContent',
            value: 'last',
            attributes: { 'data-state': 'ready' }
        });
        const write = batcher.getWriteStub(element);

        batcher.doWrite(write);
        await expect(Promise.all([firstPromise, secondPromise])).resolves.toEqual([undefined, undefined]);
        expect(element.textContent).toBe('last');
        expect(element.getAttribute('data-state')).toBe('ready');
    });
});
