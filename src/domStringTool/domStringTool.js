// Browser-specific functions (kept in this package)
import { mechanize as _mechanize } from '@arpadroid/tools-iso/stringTool';

/**
 * Generates a safe HTML ID with minimal re-computation.
 * @param {string} _id - The input string.
 * @returns {string}
 */
export function getSafeHtmlId(_id) {
    let id = _mechanize(_id);
    const originalId = id;
    let index = 1;
    
    // Browser-specific code with environment check
    if (typeof window !== 'undefined') {
        if (!window.arpaSafeIDs) {
            window.arpaSafeIDs = {};
        }
        
        // Check for duplicates and append a number if necessary
        while (window.arpaSafeIDs[id]) {
            id = `${originalId}-${index++}`;
        }
        
        window.arpaSafeIDs[id] = true;
    }
    
    return id;
}
