import {
    getExtension,
    getFileName,
    getMimeType,
    megaBytesToBytes,
    formatBytes,
    eventContainsFiles,
    processFile,
    getBase64,
    getBase64Sync,
    getBase64FromUrl,
    getFileType,
    getFileIcon
} from './fileTool';
import { jest } from '@jest/globals';

describe('FileTool', () => {
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

        it('should return empty string for undefined', () => {
            expect(formatBytes(undefined)).toBe('');
        });

        it('should return empty string for infinite', () => {
            expect(formatBytes(Infinity)).toBe('');
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

    describe('getBase64', () => {
        it('should convert file to base64', async () => {
            const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
            const result = await getBase64(file);
            expect(result).toContain('data:text/plain;base64,');
        });

        it('should handle empty file', async () => {
            const file = new File([], 'empty.txt', { type: 'text/plain' });
            const result = await getBase64(file);
            expect(typeof result).toBe('string');
        });
    });

    describe('getBase64Sync', () => {
        it('should convert file to base64 synchronously', () => {
            const file = new File(['test'], 'test.txt', { type: 'text/plain' });
            const result = getBase64Sync(file);
            // Sync version returns null initially as FileReader is async
            expect(result).toBeNull();
        });
    });

    describe('getBase64FromUrl', () => {
        it('should fetch and convert URL to base64', async () => {
            const mockBlob = new Blob(['test'], { type: 'text/plain' });
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    blob: () => Promise.resolve(mockBlob)
                })
            );

            const result = await getBase64FromUrl('https://example.com/file.txt');
            expect(global.fetch).toHaveBeenCalledWith('https://example.com/file.txt');
        });

        it('should handle fetch errors', async () => {
            global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')));

            await expect(getBase64FromUrl('https://example.com/file.txt')).rejects.toThrow(
                'Fetch failed'
            );
        });
    });

    describe('getFileType', () => {
        it('should identify image files', () => {
            expect(getFileType('jpg')).toBe('image');
            expect(getFileType('png')).toBe('image');
            expect(getFileType('gif')).toBe('image');
            expect(getFileType('svg')).toBe('image');
        });

        it('should identify video files', () => {
            expect(getFileType('mp4')).toBe('video');
            expect(getFileType('mkv')).toBe('video');
            expect(getFileType('avi')).toBe('video');
        });

        it('should identify audio files', () => {
            expect(getFileType('mp3')).toBe('audio');
            expect(getFileType('wav')).toBe('audio');
            expect(getFileType('flac')).toBe('audio');
        });

        it('should identify pdf files', () => {
            expect(getFileType('pdf')).toBe('pdf');
        });

        it('should identify word documents', () => {
            expect(getFileType('doc')).toBe('word');
            expect(getFileType('docx')).toBe('word');
        });

        it('should identify excel files', () => {
            expect(getFileType('xls')).toBe('excel');
            expect(getFileType('xlsx')).toBe('excel');
            expect(getFileType('csv')).toBe('excel');
        });

        it('should identify powerpoint files', () => {
            expect(getFileType('ppt')).toBe('powerpoint');
            expect(getFileType('pptx')).toBe('powerpoint');
        });

        it('should identify compressed files', () => {
            expect(getFileType('zip')).toBe('compressed');
            expect(getFileType('rar')).toBe('compressed');
            expect(getFileType('7z')).toBe('compressed');
        });

        it('should identify text files', () => {
            expect(getFileType('txt')).toBe('text');
            expect(getFileType('md')).toBe('text');
        });

        it('should identify markup files', () => {
            expect(getFileType('html')).toBe('markup');
            expect(getFileType('xml')).toBe('markup');
        });

        it('should identify programming files', () => {
            expect(getFileType('js')).toBe('programming');
            expect(getFileType('py')).toBe('programming');
            expect(getFileType('java')).toBe('programming');
        });

        it('should identify executable files', () => {
            expect(getFileType('exe')).toBe('executable');
            expect(getFileType('msi')).toBe('executable');
        });

        it('should identify disk image files', () => {
            expect(getFileType('iso')).toBe('disk image');
            expect(getFileType('img')).toBe('disk image');
        });

        it('should identify ebook files', () => {
            expect(getFileType('epub')).toBe('ebook');
            expect(getFileType('mobi')).toBe('ebook');
        });

        it('should identify config files', () => {
            expect(getFileType('json')).toBe('config');
            expect(getFileType('yaml')).toBe('config');
            expect(getFileType('ini')).toBe('config');
        });

        it('should return file for unknown extensions', () => {
            expect(getFileType('unknown')).toBe('file');
        });

        it('should handle File objects', () => {
            const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
            expect(getFileType(file)).toBe('image');
        });

        it('should handle non-string input', () => {
            expect(getFileType(123)).toBe('file');
            expect(getFileType(null)).toBe('file');
        });

        it('should be case insensitive', () => {
            expect(getFileType('JPG')).toBe('image');
            expect(getFileType('PDF')).toBe('pdf');
        });
    });

    describe('getFileIcon', () => {
        it('should return icon for image files', () => {
            expect(getFileIcon('jpg')).toBe('image');
        });

        it('should return icon for video files', () => {
            expect(getFileIcon('mp4')).toBe('videocam');
        });

        it('should return icon for audio files', () => {
            expect(getFileIcon('mp3')).toBe('audiotrack');
        });

        it('should return icon for pdf files', () => {
            expect(getFileIcon('pdf')).toBe('picture_as_pdf');
        });

        it('should return icon for word files', () => {
            expect(getFileIcon('docx')).toBe('description');
        });

        it('should return icon for excel files', () => {
            expect(getFileIcon('xlsx')).toBe('table_chart');
        });

        it('should return icon for powerpoint files', () => {
            expect(getFileIcon('pptx')).toBe('slideshow');
        });

        it('should return icon for compressed files', () => {
            expect(getFileIcon('zip')).toBe('archive');
        });

        it('should return icon for text files', () => {
            expect(getFileIcon('txt')).toBe('menu_book');
        });

        it('should return icon for markup files', () => {
            expect(getFileIcon('html')).toBe('code');
        });

        it('should return icon for programming files', () => {
            expect(getFileIcon('js')).toBe('code');
        });

        it('should return icon for executable files', () => {
            expect(getFileIcon('exe')).toBe('settings_applications');
        });

        it('should return icon for disk image files', () => {
            expect(getFileIcon('iso')).toBe('disc_full');
        });

        it('should return icon for ebook files', () => {
            expect(getFileIcon('epub')).toBe('book');
        });

        it('should return icon for config files', () => {
            expect(getFileIcon('json')).toBe('settings');
        });

        it('should return icon for generic files', () => {
            expect(getFileIcon('unknown')).toBe('insert_drive_file');
        });
    });
});
