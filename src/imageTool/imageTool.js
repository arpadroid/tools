/**
 * @typedef {import('./imageTool.types').CropInterface} CropInterface
 */

/**
 * Calculates the display size of an image.
 * @param {HTMLImageElement} img - The image element.
 * @returns {number[]} - The display size [width, height].
 */
export function getDisplaySize(img) {
    const ratio = img.naturalWidth / img.naturalHeight;
    let width = img.height * ratio;
    let height = img.height;
    if (width > img.width) {
        width = img.width;
        height = img.width / ratio;
    }
    return [Math.round(width), Math.round(height)];
}

const DEFAULT_CROP = { x: 0, y: 0, width: 0, height: 0, ratio: 1 };

/**
 * Up-scales an image to the available space in the image HTML container while maintaining the aspect ratio.
 * @param {HTMLImageElement} image - The image element.
 * @param {CropInterface} opt - The crop options.
 */
export function upscale(image, opt = { ...DEFAULT_CROP }) {
    let { width = 0, height = 0 } = opt;
    const availableWidth = image?.parentElement?.clientWidth || window.innerWidth;
    const availableHeight = image?.parentElement?.clientHeight || window.innerHeight;
    const ratio = opt.width / opt.height;
    width = availableWidth;
    height = width / ratio;
    if (height > availableHeight) {
        height = availableHeight;
        width = height * ratio;
    }
    const conversionRatio = width / opt.width;
    opt.ratio = conversionRatio;
    opt.x = opt.x * conversionRatio;
    opt.y = opt.y * conversionRatio;
    opt.height = height;
    opt.width = width;
}

/**
 * Crops an image.
 * @param {HTMLImageElement} image - The image element.
 * @param {CropInterface} opt - The crop options.
 * @returns {CropInterface} - The cropped image data.
 */
export function crop(image, opt = { ...DEFAULT_CROP }) {
    upscale(image, opt);
    const { x = 0, y = 0, width = 0, height = 0, ratio = 1 } = opt;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const [imageWidth, imageHeight] = getDisplaySize(image);
    canvas.width = imageWidth * ratio;
    canvas.height = imageHeight * ratio;
    ctx?.drawImage(image, 0, 0, imageWidth * ratio, imageHeight * ratio);
    const imageData = ctx?.getImageData(x, y, width * ratio, height * ratio);
    canvas.width = width;
    canvas.height = height;
    imageData && ctx?.putImageData(imageData, 0, 0);
    return {
        url: canvas.toDataURL(),
        canvas,
        ...opt
    };
}

/**
 * Calculates the maximum size based on the screen dimensions.
 * @param {number} [maxSize] - The maximum size of the image.
 * @param {number[]} [breaks] - The breakpoints.
 * @returns {number} - The maximum size.
 */
export function getMaximumSize(maxSize = 2500, breaks = [500, 1000, 1500, 2000]) {
    let size = maxSize;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const biggest = screenWidth > screenHeight ? screenWidth : screenHeight;
    for (let i = 0; i < breaks.length; i++) {
        if (breaks[i] > biggest) {
            size = breaks[i];
            break;
        }
    }
    return size;
}
