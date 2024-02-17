/* eslint-disable sonarjs/no-duplicate-string */
import {
    getExtension,
    getFileName,
    getMimeType,
    megaBytesToBytes,
    formatBytes,
    eventContainsFiles,
    processFile
} from './fileTool';

describe('fileTool', () => {
    describe('getExtension', () => {
        it('should return the extension of a file', () => {
            const file = new File([''], 'example.txt');
            expect(getExtension(file)).toBe('txt');
        });
    });

    describe('getFileName', () => {
        it('should return the name of a file', () => {
            const file = new File([''], 'example.txt');
            expect(getFileName(file)).toBe('example');
        });
    });

    describe('getMimeType', () => {
        it('should return the MIME type of a file', () => {
            const file = new File([''], 'example.txt', { type: 'text/plain' });
            expect(getMimeType(file)).toBe('text/plain');
        });
    });

    describe('megaBytesToBytes', () => {
        it('should convert megabytes to bytes', () => {
            expect(megaBytesToBytes(1)).toBe(1048576);
            expect(megaBytesToBytes(2.5)).toBe(2621440);
        });
    });

    describe('formatBytes', () => {
        it('should format bytes to a human-readable string', () => {
            expect(formatBytes(1024)).toBe('1 KB');
            expect(formatBytes(1048576)).toBe('1 MB');
            expect(formatBytes(1073741824)).toBe('1 GB');
            expect(formatBytes(1099511627776)).toBe('1 TB');
        });

        it('should format bytes with custom precision', () => {
            expect(formatBytes(1024, 2)).toBe('1 KB');
            expect(formatBytes(1048576, 3)).toBe('1 MB');
        });
    });

    describe('eventContainsFiles', () => {
        it('should check if an event contains files', () => {
            const eventWithoutFiles = { dataTransfer: { types: [] } };
            const eventWithFiles = { dataTransfer: { types: ['Files'] } };
            
            expect(eventContainsFiles(eventWithoutFiles)).toBe(false);
            expect(eventContainsFiles(eventWithFiles)).toBe(true);
        });
    });

    describe('processFile', () => {
        it('should process a file and return a new object with processed data', () => {
            const file = new File(['s'], 'example.txt', { type: 'text/plain' }, 1);
            const processedFile = processFile(file);
            expect(processedFile.name).toBe('example.txt');
            expect(processedFile.size).toBe('1 bytes');
            expect(processedFile.extension).toBe('txt');
            
        });
    });
});
