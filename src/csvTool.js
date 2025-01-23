/**
 * Encodes commas within double quotes in a text.
 * @param {string} text - The text to encode.
 * @returns {string} - The encoded text.
 */
export function encodeValueCommas(text) {
    return text.replace(/"([^\"]*)\"/g, string => {
        return string.replace(/,/g, '[valueComma]');
    });
}

/**
 * Decodes encoded commas within double quotes in a text.
 * @param {string} text - The text to decode.
 * @returns {string} - The decoded text.
 */
export function decodeValueCommas(text) {
    return text.replace(/\[valueComma\]/g, ',');
}

/**
 * Converts a CSV string to JSON object array.
 * @param {string} csv - The CSV string to convert.
 * @param {Record<string, unknown>} map - An optional mapping object to rename the keys in the resulting JSON objects.
 * @returns {unknown[]} - The JSON object array.
 */
export function csvToJson(csv, map = {}) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let index = 1; index < lines.length; index++) {
        /** @type {Record<string, unknown>} */
        const obj = {};

        lines[index] = encodeValueCommas(lines[index]);
        const currentLine = lines[index].split(',');
        for (let index2 = 0; index2 < headers.length; index2++) {
            let value = currentLine[index2];
            if (value && value[0] === '"' && value[value.length - 1] === '"') {
                value = decodeValueCommas(value.substring(1, value.length - 1));
            }
            let key = headers[index2];
            const mapKey = map[headers[index2]];
            if (typeof mapKey === 'string') {
                key = mapKey;
            }
            obj[key] = value;
        }
        result.push(obj);
    }

    return result;
}
