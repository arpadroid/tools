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
        return '-';
    }
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const $number = Math.floor(Math.log(bytes) / Math.log(1024));
    if (['KB', 'bytes'].includes(units[$number])) {
        precision = 0;
    }
    const value = (bytes / Math.pow(1024, Math.floor($number))).toFixed(precision);
    return (value.match(/\.0*$/) ? value.substr(0, value.indexOf('.')) : value) + ' ' + units[$number];
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
        file
    };
}
