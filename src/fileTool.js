/**
 * Get the extension of a file.
 * @param {File} file
 * @returns {string}
 */
export function getExtension(file) {
    return file.name.split('.').pop().toLowerCase();
}

/**
 * Get the name of a file.
 * @param {File} file
 * @returns {string}
 */
export function getFileName(file) {
    return file.name.split('.').shift();
}

/**
 * Get the MIME type of a file.
 * @param {File} file
 * @returns {string}
 */
export function getMimeType(file) {
    return file.type;
}

/**
 * Convert a file to base64 asynchronously.
 * @param {File} file
 * @returns {Promise<string>}
 */
export function getBase64(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Convert a file to base64 synchronously.
 * @param {File} file
 * @returns {string}
 */
export function getBase64Sync(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return reader.result;
}

/**
 * Convert a file from a URL to base64.
 * @param {string} url
 * @returns {Promise<string>}
 */
export function getBase64FromUrl(url) {
    return fetch(url)
        .then(response => response.blob())
        .then(blob => getBase64Sync(blob));
}

/**
 * Convert megabytes to bytes.
 * @param {number} megaBytes
 * @returns {number}
 */
export function megaBytesToBytes(megaBytes) {
    return megaBytes * 1024 * 1024;
}

/**
 * Format bytes to a human-readable string.
 * @param {number} bytes
 * @param {number} [precision]
 * @returns {string}
 */
export function formatBytes(bytes, precision = 1) {
    if (bytes === 0) {
        return '0 bytes';
    }
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
        return '';
    }
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const $number = Math.floor(Math.log(bytes) / Math.log(1024));
    const unit = units[$number] ?? 'bytes';
    if (['KB', 'bytes'].includes(unit)) {
        precision = 0;
    }
    const value = (bytes / Math.pow(1024, Math.floor($number))).toFixed(precision);
    return (value.match(/\.0*$/) ? value.substr(0, value.indexOf('.')) : value) + ' ' + unit;
}

/**
 * Check if an event contains files.
 * @param {Event} event
 * @returns {boolean}
 */
export function eventContainsFiles(event) {
    if (event?.dataTransfer?.types) {
        for (let i = 0; i < event.dataTransfer.types.length; i++) {
            if (event.dataTransfer.types[i] == 'Files') {
                return true;
            }
        }
    }
    return false;
}

/**
 * Given a file object, returns a new object with processed data.
 * @param {File} file
 * @returns {Record<string, unknown>}
 */
export function processFile(file) {
    return {
        extension: getExtension(file),
        title: getFileName(file),
        size: formatBytes(file.size),
        name: file.name,
        file: file instanceof File ? file : null
    };
}

/**
 * Returns the type of a file based on its extension.
 * @param {string | File} ext - If a string, it should be the extension of the file e.g 'jpg', 'pdf'.
 * If a File object, it will be processed to get the extension.
 * @returns {string}
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function getFileType(ext) {
    ext instanceof File && (ext = getExtension(ext));
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp', 'tiff', 'webp'].includes(ext)) {
        return 'image';
    }
    if (['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm', 'm4v'].includes(ext)) {
        return 'video';
    }
    if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma'].includes(ext)) {
        return 'audio';
    }
    if (['pdf'].includes(ext)) {
        return 'pdf';
    }
    if (['doc', 'docx', 'odt'].includes(ext)) {
        return 'word';
    }
    if (['xls', 'xlsx', 'ods', 'csv'].includes(ext)) {
        return 'excel';
    }
    if (['ppt', 'pptx', 'odp'].includes(ext)) {
        return 'powerpoint';
    }
    if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'].includes(ext)) {
        return 'compressed';
    }
    if (['txt', 'md', 'rtf'].includes(ext)) {
        return 'text';
    }
    if (['html', 'htm', 'xml', 'xhtml'].includes(ext)) {
        return 'markup';
    }
    if (['js', 'ts', 'py', 'java', 'c', 'cpp', 'cs', 'php', 'rb', 'go', 'swift'].includes(ext)) {
        return 'programming';
    }
    if (['exe', 'msi', 'bat', 'sh', 'dmg', 'app', 'apk', 'jar'].includes(ext)) {
        return 'executable';
    }
    if (['iso', 'img', 'bin', 'cue', 'dmg'].includes(ext)) {
        return 'disk image';
    }
    if (['epub', 'mobi', 'azw', 'azw3', 'fb2'].includes(ext)) {
        return 'ebook';
    }
    if (['json', 'yaml', 'yml', 'ini', 'env', 'toml'].includes(ext)) {
        return 'config';
    }
    return 'file';
}

/**
 * Returns the icon for a file based on its extension.
 * @param {string | File} ext - If a string, it should be the extension of the file e.g 'jpg', 'pdf'.
 * If a File object, it will be processed to get the extension.
 * @returns {string}
 */
export function getFileIcon(ext) {
    const fileType = getFileType(ext);
    return {
        image: 'image',
        file: 'insert_drive_file',
        video: 'videocam',
        audio: 'audiotrack',
        pdf: 'picture_as_pdf',
        word: 'description',
        excel: 'table_chart',
        powerpoint: 'slideshow',
        compressed: 'archive',
        text: 'menu_book',
        markup: 'code',
        programming: 'code',
        executable: 'settings_applications',
        'disk image': 'disc_full',
        ebook: 'book',
        config: 'settings'
    }[fileType];
}
