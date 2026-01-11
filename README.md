# Arpadroid Tools

A comprehensive utility library for building modern frontend applications.

## Features

-   🛠️ **Complete Utility Toolkit for Frontend Applications** - DOM manipulation, form validation, date formatting, URL routing, event handling, element placement, lazy loading, and more
-   ⚡ **Lightweight** - Tree-shakeable architecture keeps your bundle small
-   📘 **TypeScript Ready** - Comprehensive type definitions included
-   🎯 **Framework Agnostic** - Works with vanilla JS, React, Vue, or any frontend stack
-   ✅ **Production Ready** - Thoroughly tested, battle-proven in the @arpadroid ecosystem

## Installation

```bash
npm install @arpadroid/tools
```

## Usage

```javascript
import { arrayUnique, formatDate, mergeObjects } from '@arpadroid/tools';

// Remove duplicates from array
const uniqueItems = arrayUnique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]

// Format date with custom pattern
const formatted = formatDate(new Date(), 'DD-MM-YYYY'); // "17-12-2025"

// Deep merge objects with strict mode
const config = mergeObjects(
    { api: { timeout: 5000 } },
    { api: { retry: 3 }, debug: true },
    false // strict mode off - allows new properties
); // { api: { timeout: 5000, retry: 3 }, debug: true }
```

### TypeScript Support

Types automatically discovered - zero configuration required:

```typescript
import type { ObserverType } from '@arpadroid/tools/observer';
import { mergeObjects } from '@arpadroid/tools/object';

const merged = mergeObjects({ a: 1 }, { b: 2 }); // Fully typed
```

## Available Tools

### Array Tool

Advanced array manipulation utilities for common data operations.

**Key Functions:**

```javascript
arrayUnique(array: unknown[]): unknown[]
arrayToNumbers(array: unknown[]): number[]
sortObjectArrayByKey(array: object[], key: string, direction?: 'asc'|'desc'): object[]
searchObjectArray(array: object[], query: string, searchFields?: string[]): object[]
paginateArray(array: unknown[], perPage: number, page: number): unknown[]
areArraysEqual(array1: unknown[], array2: unknown[]): boolean
```

### Object Tool

Object manipulation and utility functions.

**Key Functions:**

```javascript
mergeObjects(obj: object, obj2: object, strict?: boolean): object
getPropertyValue(path: string, object: object, defaultValue?: unknown): unknown
isObject(obj: unknown): boolean
isEmptyObject(obj: object): boolean
copyObjectProps(object: object): object
createFormData(obj: object): FormData
```

### Node Tool

DOM node manipulation utilities.

**Key Functions:**

```javascript
attr(node: HTMLElement, attributes: Record<string, any>, override?: boolean): void
isInView(node: HTMLElement): boolean
listen(nodes: HTMLElement[], events: string[], callback: Function, options?: object): void
getScrollableParent(node: HTMLElement): HTMLElement | null
appendNodes(container: HTMLElement, nodes: HTMLElement[], prepend?: boolean): void
style(node: HTMLElement, css: Record<string, string>): void
```

### Date Time Tool

Comprehensive date and time manipulation utilities.

**Key Functions:**

```javascript
formatDate(date: Date, format: string, addOffset?: boolean, locale?: string): string
getTimeAgo(date: Date, referenceDate?: Date, format?: string): string
isToday(dateTime: Date | string): boolean
isFuture(dateTime: Date | string): boolean
getDaysInMonth(month: number, year: number): number
getTimezoneOffset(date: Date): number
```

### HTML Tool

HTML template processing and manipulation utilities.

**Key Functions:**

```javascript
renderNode(html: string): HTMLElement
mapHTML(items: unknown[], callback: Function): string
render(condition: boolean, html: string): string
classNames(...classes: unknown[]): string
attrString(attributes: Record<string, any>): string
processTemplateRegex(template: string, props: object): string
```

### String Tool

String manipulation and formatting utilities.

**Key Functions:**

```javascript
dashedToCamel(str: string): string
camelToDashed(str: string): string
mechanize(str: string, separator?: string): string
getSafeID(str: string): string
truncate(str: string, length: number): string
escapeHtml(unsafe: string): string
getInitials(str: string): string
```

### URL Tool

URL manipulation and parsing utilities.

**Key Functions:**

```javascript
getURLParams(url?: string): Record<string, string>
objectToQueryString(object: object, encode?: boolean): string
editURL(url: string, params: Record<string, any>, encode?: boolean): string
matchPath(url: string, route: string): object | null
sanitizeURL(url: string): string
getURLPath(url: string): string
```

### Validation Tool

Input validation and verification utilities.

**Key Functions:**

```javascript
validateRequired(value: unknown): boolean
validateRegex(value: string, regex: RegExp): boolean
validateNumber(value: unknown): boolean
validateLength(value: string, length: number): boolean
validateMaxLength(value: string, maxLength: number): boolean
validateMinLength(value: string, minLength: number): boolean
```

### Additional Tools

**Event Tool** - Event normalization (touch/mouse coordinates)  
**File Tool** - File handling, base64 conversion, MIME types  
**Function Tool** - `debounce()`, `throttle()` for performance  
**Image Tool** - Image sizing, upscaling, cropping utilities  
**Lazy Loader Tool** - Lazy loading for images and content  
**Observer Tool** - Pub/sub pattern implementation  
**Page Tool** - Scroll and resize event handling  
**Place Tool** - Smart element positioning and placement  
**Regex Tool** - Pre-built validation patterns (email, phone, etc.)  
**Search Tool** - DOM search with highlighting  
**Color Tool** - RGB/Hex conversion and validation  
**CSV Tool** - CSV parsing and generation  
**Device Tool** - Browser and device detection  
**Custom Element Tool** - Web component registration

## Architecture

This library uses plain JavaScript with JSDoc annotations. TypeScript's `checkJs: true` enforces type safety during development, and generated `.d.ts` files provide full IntelliSense to consumers - no compilation required.

**Package Structure:**

```json
{
    "type": "module",
    "sideEffects": false,
    "exports": {
        ".": "./dist/arpadroid-tools.js",
        "./object": {
            "types": "./dist/@types/objectTool/objectTool.d.ts",
            "default": "./src/objectTool/objectTool.js"
        }
    }
}
```

## Development

```bash
npm test              # Run Jest test suite
npm test:watch        # Watch mode
npm test:coverage     # Generate coverage report
npm run build         # Build minified bundle
npm run build:types   # Generate TypeScript declarations
```

**Requirements:** Node.js >= 18.0.0, Modern browsers (ES2022+)

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.
