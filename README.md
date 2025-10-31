# Arpadroid Tools

A comprehensive collection of front-end focused JavaScript tools and utilities for building web applications and components.

## Features
- 🚀 Lightweight and modular design
- 📦 Easy to integrate with existing projects
- 🔧 Comprehensive set of utilities
- 📚 Well-documented with TypeScript support
- 🌐 Browser and Node.js compatible

## Installation
```bash
npm install @arpadroid/tools
```

## Usage
```javascript
import { arrayUnique, rgbToHex, formatDate } from '@arpadroid/tools';

// Remove duplicates from array
const uniqueItems = arrayUnique([1, 2, 2, 3, 3, 4]);

// Convert RGB to hex
const hexColor = rgbToHex('rgb(255, 0, 0)');

// Format date
const formattedDate = formatDate(new Date(), 'DD-MM-YYYY');
```

## Available Tools

### Array Tool
Advanced array manipulation utilities for common data operations.

**Functions:**
- `arrayUnique(array)` - Remove duplicate values from an array
- `arrayEmpty(array)` - Check if an array is empty
- `arrayToNumbers(array)` - Convert array elements to numbers
- `areArraysEqual(array1, array2)` - Compare two arrays for equality
- `sortObjectArrayByKey(array, key, direction)` - Sort array of objects by key
- `searchObjectArray(array, query, searchFields)` - Search through array of objects
- `paginateArray(array, perPage, page)` - Paginate an array

### Color Tool
Color manipulation and conversion utilities.

**Functions:**
- `rgbToHex(rgb)` - Convert RGB color values to hexadecimal
- `stringToHex(color)` - Convert color string to hex format
- `validateColor(value)` - Validate color value format

### CSV Tool
CSV parsing and generation utilities.

**Functions:**
- `csvToJson(csv, map)` - Convert CSV string to JSON array
- `encodeValueCommas(text)` - Encode commas in CSV values
- `decodeValueCommas(text)` - Decode commas in CSV values

### Custom Element Tool
Utilities for working with HTML custom elements.

**Functions:**
- `defineCustomElement(name, component, options)` - Register custom HTML elements

### Date Time Tool
Comprehensive date and time manipulation utilities.

**Functions:**
- `normalizeTimeZeroes(time)` - Add leading zeros to time values
- `getTimeString(date, hasSeconds)` - Get formatted time string
- `getTimezoneOffset(date)` - Get timezone offset in hours
- `isFuture(dateTime)` - Check if date is in the future
- `isPast(dateTime)` - Check if date is in the past
- `isToday(dateTime)` - Check if date is today
- `isYesterday(dateTime)` - Check if date is yesterday
- `isTomorrow(dateTime)` - Check if date is tomorrow
- `isThisWeek(dateTime)` - Check if date is within current week
- `isThisMonth(dateTime)` - Check if date is within current month
- `isThisYear(dateTime)` - Check if date is within current year
- `isBefore(dateTime, dateTime2)` - Compare two dates
- `isAfter(dateTime, dateTime2)` - Compare two dates
- `formatDate(date, format, addOffset, locale)` - Format date with custom pattern
- `getTimeAgo(date, referenceDate, format)` - Get time elapsed string
- `validateDateFormat(format)` - Validate date format string
- `getDaysInMonth(month, year)` - Get number of days in month
- `setDateToMonday(date)` - Set date to start of week

### Device Tool
Browser and device detection utilities.

**Functions:**
- `isOperaPhone()` - Detect Opera Mini browser
- `isIE11()` - Detect Internet Explorer 11
- `isIE()` - Detect any Internet Explorer version
- `isEdge()` - Detect Microsoft Edge browser
- `isFirefox()` - Detect Firefox browser
- `isIOSPhone()` - Detect iOS devices
- `isWebkit()` - Detect WebKit-based browsers
- `isChrome()` - Detect Chrome browser
- `isSafari()` - Detect Safari browser
- `isIOsSafari()` - Detect iOS Safari browser
- `getViewportWidth()` - Get viewport width
- `getViewportHeight()` - Get viewport height
- `getViewportSize()` - Get viewport dimensions
- `goFullScreen(node)` - Enter fullscreen mode
- `exitFullScreen(doc)` - Exit fullscreen mode

### Event Tool
Event handling and normalization utilities.

**Functions:**
- `normalizeClientCoords(event)` - Normalize event coordinates
- `normalizeTouchEvent(event)` - Normalize touch events

### File Tool
File handling and processing utilities.

**Functions:**
- `getExtension(file)` - Get file extension
- `getFileName(file)` - Get file name
- `getMimeType(file)` - Get file MIME type
- `getBase64(file)` - Convert file to base64
- `getBase64Sync(file)` - Convert file to base64 synchronously
- `getBase64FromUrl(url)` - Get base64 from URL
- `megaBytesToBytes(megaBytes)` - Convert MB to bytes
- `formatBytes(bytes, precision)` - Format byte size
- `eventContainsFiles(event)` - Check if event contains files
- `processFile(file)` - Process file data
- `getFileType(ext)` - Get file type from extension
- `getFileIcon(ext)` - Get icon for file type

### Function Tool
Function utilities for performance optimization.

**Functions:**
- `debounce(fn, delay)` - Debounce function execution
- `throttle(fn, limit)` - Throttle function execution

### HTML Tool
HTML template processing and manipulation utilities.

**Functions:**
- `processTemplateRegex(template, props)` - Process template with regex placeholders
- `mapHTML(items, callback)` - Map array to HTML string
- `render(condition, html)` - Conditionally render HTML string
- `renderNode(html)` - Create HTML element from string
- `removeHTML(str)` - Strip HTML tags from string
- `renderAttr(attr, value)` - Render HTML attribute
- `attrString(attributes)` - Convert attributes object to string
- `classNames(...classes)` - Generate class names from various inputs

### Image Tool
Image processing and manipulation utilities.

**Functions:**
- `getDisplaySize(img)` - Calculate display size of image element
- `upscale(image, options)` - Upscale image to available space while maintaining aspect ratio
- `crop(image, options)` - Crop image with specified dimensions
- `getMaximumSize(maxSize, breaks)` - Calculate maximum size based on screen dimensions

### Lazy Loader Tool
Lazy loading utilities for images and content.

**Functions:**
- `lazyLoad(image, batchSize)` - Lazy load images
- `loadNext()` - Load next item in queue
- `clearLazyQueue()` - Clear lazy loading queue
- `loadBatch()` - Load batch of items
- `getSource(image)` - Get image source
- `hasLoadedSource(src)` - Check if source is loaded
- `clearLazyImage(image)` - Clear lazy image

### Node Tool
DOM node manipulation utilities.

**Functions:**
- `attr(node, attributes, override)` - Add attributes to a node
- `getAttributes(node)` - Get all attributes from a node
- `getAttributesWithPrefix(node, prefix)` - Get attributes with specific prefix
- `isInView(node)` - Check if node is in viewport
- `addContent(node, content)` - Add content to a node
- `setContent(node, content)` - Set content of a node
- `style(node, css)` - Apply CSS styles to a node
- `appendNodes(container, nodes, prepend)` - Append multiple nodes efficiently
- `setNodes(container, nodes)` - Replace all nodes in container
- `prepend(node, child)` - Prepend child to node
- `resolveNode(node, container)` - Resolve node from string selector or element
- `getScrollableParent(node)` - Find scrollable parent element
- `getOffset(node)` - Get node offset position
- `onDoubleClick(node, callback, delay)` - Add double-click event listener
- `addCssRule(selector, styles)` - Add dynamic CSS rule
- `listen(nodes, events, callback, options)` - Add event listeners to nodes

### Object Tool
Object manipulation and utility functions.

**Functions:**
- `countProps(obj)` - Count object properties
- `isObject(obj)` - Check if value is plain object
- `isEmptyObject(obj)` - Check if object is empty
- `mergeObjects(obj, obj2, strict)` - Deep merge objects
- `copyObjectProps(object)` - Copy object properties
- `getPropertyValue(path, object, defaultValue)` - Get nested property value
- `createFormData(obj)` - Create FormData from object
- `bind(obj, ...methods)` - Bind methods to object
- `sortKeys(obj)` - Sort object by keys
- `getObjectId(obj, divider, preferences)` - Generate ID from object

### Observer Tool
Event observation and pub/sub pattern implementation.

**Functions:**
- `on(signalName, callback, unsubscribes)` - Subscribe to signal
- `off(signalName, callback)` - Unsubscribe from signal
- `signal(signalName, value, param1, param2)` - Emit signal
- `unsubscribe(signalName, callback)` - Remove subscription
- `observerMixin(instance)` - Add observer methods to instance

### Page Tool
Page-level utilities for scroll and resize handling.

**Functions:**
- `onScroll(callback)` - Add scroll event listener
- `onScrollStart(callback)` - Add scroll start listener
- `onResize(callback)` - Add resize event listener
- `removeScrollCallback(callback)` - Remove scroll listener
- `removeResizeCallback(callback)` - Remove resize listener

### Place Tool
Element positioning and placement utilities.

**Functions:**
- `resetNodePlacement(node)` - Reset node position
- `getAvailableTop(node)` - Get available space above
- `getAvailableBottom(node)` - Get available space below
- `placeBottom(node, refNode, options)` - Place element below reference
- `placeTop(node, refNode, options)` - Place element above reference
- `placeCenterHorizontal(node, refNode)` - Center horizontally
- `placeRight(node, refNode, options)` - Place element to the right
- `placeY(node, refNode, options)` - Position vertically
- `placeX(node, refNode, options)` - Position horizontally
- `placeNode(node, refNode, options)` - Smart element placement

### Regex Tool
Regular expression utilities and patterns.

**Patterns Available:**
- `alphaLower` - Lowercase alphanumeric only
- `alphaLowerEnforce` - Enforce lowercase alphanumeric
- `alphaLowerCommas` - Lowercase alphanumeric with commas
- `alphaLowerCommasEnforce` - Enforce lowercase alphanumeric with commas
- `email` - Email address validation
- `float` - Floating point numbers
- `hourFormat` - 24-hour time format (HH:MM)
- `length` - String length validation
- `lengthEnforce` - Enforce string length
- `machineName` - Machine-readable names (lowercase, numbers, underscores)
- `machineNameEnforce` - Enforce machine name format
- `numeric` - Numbers only
- `numericEnforce` - Enforce numeric input
- `telephone` - Telephone number validation
- `telephoneEnforce` - Enforce telephone format
- `password` - Strong password (8+ chars, letter, number, special char)
- `time` - Time format validation
- `timeEnforce` - Enforce time format
- `url` - URL validation

### Search Tool
Search functionality and filtering utilities.

**Functions:**
- `searchNodes(searchValue, nodes, callback)` - Search through DOM nodes
- `addSearchMatchMarkers(container, searchValue, contentSelector, className)` - Add highlight markers to search matches

**Classes:**
- `SearchTool` - Complete search implementation with input handling and debouncing

### String Tool
String manipulation and formatting utilities.

**Functions:**
- `dashedToCamel(str)` - Convert dashed-case to camelCase
- `camelToDashed(str)` - Convert camelCase to dashed-case
- `ucFirst(str)` - Uppercase first character
- `lcFirst(str)` - Lowercase first character
- `truncate(str, length)` - Truncate string to length
- `getSafeID(str)` - Generate safe ID from string
- `parseOutlookEmails(str)` - Parse email addresses
- `mechanize(str, separator)` - Create URL-friendly string
- `getSafeHtmlId(id)` - Generate safe HTML ID
- `removeWhiteSpace(str)` - Remove all whitespace
- `removeSlashes(str)` - Remove leading/trailing slashes
- `extractCurrency(str)` - Extract currency symbol
- `sanitizeSearchInput(str)` - Sanitize search input
- `getInitials(str)` - Get initials from string
- `timeStringToSeconds(str)` - Convert time string to seconds
- `getStringBetween(str, start, end)` - Extract substring between markers
- `escapeHtml(unsafe)` - Escape HTML special characters

### URL Tool
URL manipulation and parsing utilities.

**Functions:**
- `getURLParams(url)` - Extract URL parameters
- `arrayToQueryString(propName, array, encode)` - Convert array to query string
- `decodeURIComponentSafe(value)` - Safe URI component decoding
- `areUrlsEqual(url1, url2)` - Compare URLs for equality
- `removeLastSlash(path)` - Remove trailing slash
- `sanitizePath(path)` - Sanitize URL path
- `removeURLOrigin(url)` - Remove origin from URL
- `sanitizeURL(url)` - Sanitize URL
- `getURLPath(url)` - Get path from URL
- `getURLParam(name, url)` - Get specific URL parameter
- `matchPath(url, route)` - Match URL against route pattern
- `matchPaths(url, routes)` - Match URL against multiple routes
- `getPathParts(url)` - Split URL path into parts
- `objectToQueryString(object, encode)` - Convert object to query string
- `editURL(url, params, encode)` - Add/update URL parameters
- `removeURLParam(name, url)` - Remove URL parameter
- `getParentPath(url)` - Get parent path

### Validation Tool
Input validation and verification utilities.

**Functions:**
- `validateRequired(value)` - Check if value is required
- `validateMaxLength(value, maxLength)` - Validate maximum length
- `validateMinLength(value, minLength)` - Validate minimum length
- `validateLength(value, length)` - Validate exact length
- `validateSize(value, size)` - Validate size constraints
- `validateRegex(value, regex)` - Validate against regex pattern
- `validateNumber(value)` - Validate numeric value
- `validateColour(value)` - Validate color value

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.