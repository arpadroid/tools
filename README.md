## Classes

<dl>
<dt><a href="#ObserverTool">ObserverTool</a></dt>
<dd><p>A class that provides a means to subscribe to properties of an instance via observer pattern.
It acts as a mixin, and should be used as such via the mixin method.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#arrayUnique">arrayUnique(array)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns a new array with unique values.</p>
</dd>
<dt><a href="#arrayEmpty">arrayEmpty(array)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if an array is empty.</p>
</dd>
<dt><a href="#arrayToNumbers">arrayToNumbers(array)</a> ⇒ <code>Array</code></dt>
<dd><p>Converts each element in the array to a number.</p>
</dd>
<dt><a href="#areArraysEqual">areArraysEqual(array1, array2)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if two arrays are equal.</p>
</dd>
<dt><a href="#getColorNode">getColorNode()</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Returns an HTML node used for color validation and other calculations.</p>
</dd>
<dt><a href="#rgbToHex">rgbToHex(rgb)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an RGB color value to a hexadecimal color value.</p>
</dd>
<dt><a href="#stringToHex">stringToHex(color)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a color string to a hexadecimal color value.</p>
</dd>
<dt><a href="#validateColor">validateColor(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>Validates a style color value.</p>
</dd>
<dt><a href="#encodeValueCommas">encodeValueCommas(text)</a> ⇒ <code>string</code></dt>
<dd><p>Encodes commas within double quotes in a text.</p>
</dd>
<dt><a href="#decodeValueCommas">decodeValueCommas(text)</a> ⇒ <code>string</code></dt>
<dd><p>Decodes encoded commas within double quotes in a text.</p>
</dd>
<dt><a href="#csvToJson">csvToJson(csv, map)</a> ⇒ <code>Array</code></dt>
<dd><p>Converts a CSV string to JSON object array.</p>
</dd>
<dt><a href="#normalizeTimeZeroes">normalizeTimeZeroes(time)</a> ⇒ <code>string</code></dt>
<dd><p>Adds zero values if missing from seconds/minutes/hours.</p>
</dd>
<dt><a href="#getTimeString">getTimeString(date, hasSeconds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a string representation of the current time hh:mm:ss.</p>
</dd>
<dt><a href="#getTimezoneOffset">getTimezoneOffset(date)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the timezone offset in hours.</p>
</dd>
<dt><a href="#isFuture">isFuture(dateTime)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a given date is in the future.</p>
</dd>
<dt><a href="#isBefore">isBefore(dateTime, dateTime2)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if one date is before another date.</p>
</dd>
<dt><a href="#isAfter">isAfter(dateTime, dateTime2)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if one date is after another date.</p>
</dd>
<dt><a href="#isPast">isPast(dateTime)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a given date is in the past.</p>
</dd>
<dt><a href="#isToday">isToday(dateTime)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a given date is today.</p>
</dd>
<dt><a href="#isYesterday">isYesterday(dateTime)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a given date is yesterday.</p>
</dd>
<dt><a href="#isTomorrow">isTomorrow(dateTime)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a given date is tomorrow.</p>
</dd>
<dt><a href="#isThisWeek">isThisWeek(dateTime)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a given date is within the current week.</p>
</dd>
<dt><a href="#isThisMonth">isThisMonth(dateTime)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a given date is within the current month.</p>
</dd>
<dt><a href="#isThisYear">isThisYear(dateTime)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a given date is within the current year.</p>
</dd>
<dt><a href="#addTimezoneOffset">addTimezoneOffset(date)</a> ⇒ <code>Date</code></dt>
<dd><p>Adds the timezone offset to a given date.</p>
</dd>
<dt><a href="#formatDate">formatDate(_date, format, addOffset, locale)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a given date into a specified format.</p>
</dd>
<dt><a href="#getTimeAgo">getTimeAgo(date, referenceDate, format)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a formatted string representing the time elapsed since the given date.</p>
</dd>
<dt><a href="#validateDateFormat">validateDateFormat(format)</a> ⇒ <code>boolean</code></dt>
<dd><p>Validates a date format string.</p>
</dd>
<dt><a href="#getDaysInMonth">getDaysInMonth(month, year)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the number of days in a given month.</p>
</dd>
<dt><a href="#setDateToMonday">setDateToMonday(date)</a> ⇒ <code>number</code></dt>
<dd><p>Sets a date to the first day of the week.</p>
</dd>
<dt><a href="#isOperaPhone">isOperaPhone()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is Opera Mini.</p>
</dd>
<dt><a href="#isIE11">isIE11()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is Internet Explorer 11.</p>
</dd>
<dt><a href="#isIE">isIE()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is Internet Explorer (any version).</p>
</dd>
<dt><a href="#isEdge">isEdge()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is Edge.</p>
</dd>
<dt><a href="#isFirefox">isFirefox()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is Firefox.</p>
</dd>
<dt><a href="#isIOSPhone">isIOSPhone()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is iOS (iPhone, iPad, iPod).</p>
</dd>
<dt><a href="#isWebkit">isWebkit()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is WebKit.</p>
</dd>
<dt><a href="#isChrome">isChrome()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is Chrome.</p>
</dd>
<dt><a href="#isSafari">isSafari()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is Safari.</p>
</dd>
<dt><a href="#isIOsSafari">isIOsSafari()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the user agent is iOS Safari (iPhone, iPad, iPod or Safari browser).</p>
</dd>
<dt><a href="#getExtension">getExtension(file)</a> ⇒ <code>string</code></dt>
<dd><p>Get the extension of a file.</p>
</dd>
<dt><a href="#getFileName">getFileName(file)</a> ⇒ <code>string</code></dt>
<dd><p>Get the name of a file.</p>
</dd>
<dt><a href="#getMimeType">getMimeType(file)</a> ⇒ <code>string</code></dt>
<dd><p>Get the MIME type of a file.</p>
</dd>
<dt><a href="#getBase64">getBase64(file)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Convert a file to base64 asynchronously.</p>
</dd>
<dt><a href="#getBase64Sync">getBase64Sync(file)</a> ⇒ <code>string</code></dt>
<dd><p>Convert a file to base64 synchronously.</p>
</dd>
<dt><a href="#getBase64FromUrl">getBase64FromUrl(url)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Convert a file from a URL to base64.</p>
</dd>
<dt><a href="#megaBytesToBytes">megaBytesToBytes(megaBytes)</a> ⇒ <code>number</code></dt>
<dd><p>Convert megabytes to bytes.</p>
</dd>
<dt><a href="#formatBytes">formatBytes(bytes, [precision])</a> ⇒ <code>string</code></dt>
<dd><p>Format bytes to a human-readable string.</p>
</dd>
<dt><a href="#eventContainsFiles">eventContainsFiles(event)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if an event contains files.</p>
</dd>
<dt><a href="#processFile">processFile(file)</a> ⇒ <code>Record.&lt;string, unknown&gt;</code></dt>
<dd><p>Given a file object, returns a new object with processed data.</p>
</dd>
<dt><a href="#getDisplaySize">getDisplaySize(img)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Calculates the display size of an image.</p>
</dd>
<dt><a href="#upscale">upscale(image, opt)</a></dt>
<dd><p>Up-scales an image to the available space in the image HTML container while maintaining the aspect ratio.</p>
</dd>
<dt><a href="#crop">crop(image, opt)</a> ⇒ <code><a href="#CropInterface">CropInterface</a></code></dt>
<dd><p>Crops an image.</p>
</dd>
<dt><a href="#getMaximumSize">getMaximumSize([maxSize], [breaks])</a> ⇒ <code>number</code></dt>
<dd><p>Calculates the maximum size based on the screen dimensions.</p>
</dd>
<dt><a href="#attr">attr(node, attributes)</a></dt>
<dd><p>Adds attributes to a node.</p>
</dd>
<dt><a href="#isInView">isInView(node)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a node is in the viewport.</p>
</dd>
<dt><a href="#addContent">addContent(node, content)</a></dt>
<dd><p>Adds content to a node.</p>
</dd>
<dt><a href="#setContent">setContent(node, content)</a></dt>
<dd><p>Sets content to a node.</p>
</dd>
<dt><a href="#style">style(node, css)</a></dt>
<dd><p>Styles a node.</p>
</dd>
<dt><a href="#prepend">prepend(node, child)</a></dt>
<dd><p>Prepends a child node to a parent node.</p>
</dd>
<dt><a href="#resolveNode">resolveNode(node)</a> ⇒ <code>HTMLElement</code> | <code>null</code></dt>
<dd><p>Resolves a node.</p>
</dd>
<dt><a href="#getScrollableParent">getScrollableParent(node)</a> ⇒ <code>HTMLElement</code> | <code>null</code></dt>
<dd><p>Returns the scrollable parent of a node.</p>
</dd>
<dt><a href="#getOffset">getOffset(node)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Returns the offset of a node.</p>
</dd>
<dt><a href="#onDoubleClick">onDoubleClick(node, callback, delay)</a></dt>
<dd><p>Adds a double click event listener to a node.</p>
</dd>
<dt><a href="#isObject">isObject(obj)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if an object is an object and not an array or HTMLElement.</p>
</dd>
<dt><a href="#mergeObjects">mergeObjects(obj, obj2, strict)</a> ⇒ <code>Record.&lt;string, unknown&gt;</code></dt>
<dd><p>Merges two objects recursively.</p>
</dd>
<dt><a href="#getPropertyValue">getPropertyValue(path, object, defaultValue)</a> ⇒ <code>unknown</code></dt>
<dd><p>Return the value of a nested object property.</p>
</dd>
<dt><a href="#countProps">countProps(obj)</a> ⇒ <code>number</code></dt>
<dd><p>Counts the number of properties in an object.</p>
</dd>
<dt><a href="#createFormData">createFormData(obj)</a> ⇒ <code>FormData</code></dt>
<dd><p>Creates a FormData object from an object.</p>
</dd>
<dt><a href="#initializeResize">initializeResize(callback)</a></dt>
<dd><p>Initializes the resize event listener and sets the flag indicating it has been initialized.</p>
</dd>
<dt><a href="#removeScrollCallback">removeScrollCallback(callback)</a></dt>
<dd><p>Removes the specified callback function from the scroll event listener.</p>
</dd>
<dt><a href="#_onResize">_onResize(event)</a></dt>
<dd><p>Executes resize event listener callbacks.</p>
</dd>
<dt><a href="#onResize">onResize(callback)</a></dt>
<dd><p>Adds a callback function to the resize event listener.</p>
</dd>
<dt><a href="#initializeOnScroll">initializeOnScroll(callback)</a></dt>
<dd><p>Initializes the scroll event listener and sets the flag indicating it has been initialized.</p>
</dd>
<dt><a href="#_onScroll">_onScroll(event)</a></dt>
<dd><p>Executes scroll event listener callbacks.</p>
</dd>
<dt><a href="#onScroll">onScroll(callback)</a></dt>
<dd><p>Adds a callback function to the scroll event listener.</p>
</dd>
<dt><a href="#removeResizeCallback">removeResizeCallback(callback)</a></dt>
<dd><p>Removes the specified callback function from the resize event listener.</p>
</dd>
<dt><a href="#dashedToCamel">dashedToCamel(str)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a dashed string to camel case.</p>
</dd>
<dt><a href="#ucFirst">ucFirst(str)</a> ⇒ <code>string</code></dt>
<dd><p>Converts the first character of a string to uppercase.</p>
</dd>
<dt><a href="#lcFirst">lcFirst(str)</a> ⇒ <code>string</code></dt>
<dd><p>Converts the first character of a string to lowercase.</p>
</dd>
<dt><a href="#truncate">truncate(str, length)</a> ⇒ <code>string</code></dt>
<dd><p>Truncates a string to a specified length.</p>
</dd>
<dt><a href="#getSafeID">getSafeID(str)</a> ⇒ <code>string</code></dt>
<dd><p>Removes unsafe characters from a string to create a safe ID.</p>
</dd>
<dt><a href="#parseOutlookEmails">parseOutlookEmails(str)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Parses email addresses from a string.</p>
</dd>
<dt><a href="#mechanize">mechanize(str)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a string to a URL-friendly format.</p>
</dd>
<dt><a href="#removeWhiteSpace">removeWhiteSpace(str)</a> ⇒ <code>string</code></dt>
<dd><p>Removes white spaces from a string.</p>
</dd>
<dt><a href="#extractCurrency">extractCurrency(str)</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Extracts the currency symbol from a string.</p>
</dd>
<dt><a href="#sanitizeSearchInput">sanitizeSearchInput(str)</a> ⇒ <code>string</code></dt>
<dd><p>Sanitizes a search input by removing special characters and limiting the length.</p>
</dd>
<dt><a href="#getInitials">getInitials(str)</a> ⇒ <code>string</code></dt>
<dd><p>Retrieves the initials from a string.</p>
</dd>
<dt><a href="#getURLParams">getURLParams(url)</a> ⇒ <code>object</code></dt>
<dd><p>Extracts query string parameters from a string representing a URL and returns them in an object.</p>
</dd>
<dt><a href="#arrayToQueryString">arrayToQueryString(propName, array, encode)</a> ⇒ <code>string</code></dt>
<dd><p>Transforms an array into a URL query string.</p>
</dd>
<dt><a href="#decodeURIComponentSafe">decodeURIComponentSafe(value)</a> ⇒ <code>string</code></dt>
<dd><p>Decodes a URI component safely.</p>
</dd>
<dt><a href="#areUrlsEqual">areUrlsEqual(url1, url2)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if two URLs are equal.</p>
</dd>
<dt><a href="#removeLastSlash">removeLastSlash(path)</a> ⇒ <code>string</code></dt>
<dd><p>Removes the last slash from a path.</p>
</dd>
<dt><a href="#sanitizePath">sanitizePath(path)</a> ⇒ <code>string</code></dt>
<dd><p>Sanitizes the path.</p>
</dd>
<dt><a href="#removeURLOrigin">removeURLOrigin(url)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
<dd><p>Removes the origin from a URL.</p>
</dd>
<dt><a href="#sanitizeURL">sanitizeURL(url)</a> ⇒ <code>string</code></dt>
<dd><p>Sanitizes the URL.</p>
</dd>
<dt><a href="#getURLPath">getURLPath(url)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the current path.</p>
</dd>
<dt><a href="#getURLParam">getURLParam(name, url)</a> ⇒ <code>string</code></dt>
<dd><p>Gets a specific query string parameter value from a URL.</p>
</dd>
<dt><a href="#matchPath">matchPath(url, route)</a> ⇒ <code>boolean</code></dt>
<dd><p>Matches a URL against a route.</p>
</dd>
<dt><a href="#matchPaths">matchPaths(url, routes)</a> ⇒ <code>boolean</code></dt>
<dd><p>Matches a URL against multiple routes.</p>
</dd>
<dt><a href="#getPathParts">getPathParts(url)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the parts of the current path.</p>
</dd>
<dt><a href="#objectToQueryString">objectToQueryString(object, encode)</a> ⇒ <code>string</code></dt>
<dd><p>Transforms an object into a URL query string.</p>
</dd>
<dt><a href="#editURL">editURL(url, params, encode)</a> ⇒ <code>string</code></dt>
<dd><p>Edits the query in a URL. This function is designed to work with any kind of string, not necessarily a valid URL format that includes a protocol, such as the one required by the native JS URL constructor, which does not handle relative URLs.
Unlike URLSearchParams constructor, this function accepts a full URL and will not encode the path.</p>
</dd>
<dt><a href="#removeURLParam">removeURLParam(name, url)</a> ⇒ <code>string</code></dt>
<dd><p>Removes a specific query string parameter from a URL.</p>
</dd>
<dt><a href="#validateRequired">validateRequired(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a value is required.</p>
</dd>
<dt><a href="#validateMaxLength">validateMaxLength(value, maxLength)</a> ⇒ <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Checks if a value has a maximum length.</p>
</dd>
<dt><a href="#validateMinLength">validateMinLength(value, minLength)</a> ⇒ <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Checks if a value has a minimum length.</p>
</dd>
<dt><a href="#validateLength">validateLength(value, length)</a> ⇒ <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Checks if a value has a specific length.</p>
</dd>
<dt><a href="#validateSize">validateSize(value, size)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a value has a size within a range.</p>
</dd>
<dt><a href="#validateRegex">validateRegex(value, _regex)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a value matches a regular expression.</p>
</dd>
<dt><a href="#validateNumber">validateNumber(_value)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a value is a number.</p>
</dd>
<dt><a href="#validateColour">validateColour(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a value is a valid color.</p>
</dd>
</dl>

## Interfaces

<dl>
<dt><a href="#CropInterface">CropInterface</a> : <code><a href="#CropInterface">CropInterface</a></code></dt>
<dd></dd>
</dl>

<a name="CropInterface"></a>

## CropInterface : [<code>CropInterface</code>](#CropInterface)
**Kind**: global interface  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x-coordinate of the crop. |
| y | <code>number</code> | The y-coordinate of the crop. |
| width | <code>number</code> | The width of the crop. |
| height | <code>number</code> | The height of the crop. |
| [ratio] | <code>number</code> | The aspect ratio of the crop. |
| [type] | <code>string</code> | The type of the crop. |
| [url] | <code>string</code> | The URL of the crop. |
| [canvas] | <code>HTMLCanvasElement</code> | The canvas element of the crop. |

<a name="ObserverTool"></a>

## ObserverTool
A class that provides a means to subscribe to properties of an instance via observer pattern.
It acts as a mixin, and should be used as such via the mixin method.

**Kind**: global class  

* [ObserverTool](#ObserverTool)
    * _instance_
        * [.observersInitialized](#ObserverTool+observersInitialized)
        * [.initializeObservers(id, callback)](#ObserverTool+initializeObservers) ⇒ <code>this</code>
    * _static_
        * [.mixin(instance)](#ObserverTool.mixin)
        * [.listen(property, callback)](#ObserverTool.listen) ⇒ <code>function</code>
        * [.unsubscribe(observers, callback)](#ObserverTool.unsubscribe) ⇒ <code>function</code>
        * [.signal(property, value, event)](#ObserverTool.signal)

<a name="ObserverTool+observersInitialized"></a>

### observerTool.observersInitialized
**Kind**: instance property of [<code>ObserverTool</code>](#ObserverTool)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subscriptionsInitialized | <code>Record.&lt;string, boolean&gt;</code> | Key value pair of initialized subscription states. |

<a name="ObserverTool+initializeObservers"></a>

### observerTool.initializeObservers(id, callback) ⇒ <code>this</code>
Initializes subscriptions for a property, used as a means to prevent accidental duplication of subscriptions.

**Kind**: instance method of [<code>ObserverTool</code>](#ObserverTool)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| callback | <code>function</code> | 

<a name="ObserverTool.mixin"></a>

### ObserverTool.mixin(instance)
Binds the subscribe, callSubscribers, initializeSubscriptions and unsubscribeProperty methods to the instance.

**Kind**: static method of [<code>ObserverTool</code>](#ObserverTool)  

| Param | Type |
| --- | --- |
| instance | <code>unknown</code> | 

<a name="ObserverTool.listen"></a>

### ObserverTool.listen(property, callback) ⇒ <code>function</code>
Subscribes to a property.

**Kind**: static method of [<code>ObserverTool</code>](#ObserverTool)  

| Param | Type |
| --- | --- |
| property | <code>string</code> | 
| callback | <code>never</code> | 

<a name="ObserverTool.unsubscribe"></a>

### ObserverTool.unsubscribe(observers, callback) ⇒ <code>function</code>
Unsubscribes from a property.

**Kind**: static method of [<code>ObserverTool</code>](#ObserverTool)  

| Param | Type |
| --- | --- |
| observers | <code>Array.&lt;function()&gt;</code> | 
| callback | <code>function</code> | 

<a name="ObserverTool.signal"></a>

### ObserverTool.signal(property, value, event)
Calls all subscribers of a property.

**Kind**: static method of [<code>ObserverTool</code>](#ObserverTool)  

| Param | Type |
| --- | --- |
| property | <code>string</code> | 
| value | <code>unknown</code> | 
| event | <code>unknown</code> | 

<a name="arrayUnique"></a>

## arrayUnique(array) ⇒ <code>Array</code>
Returns a new array with unique values.

**Kind**: global function  
**Returns**: <code>Array</code> - - The array with unique values.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The input array. |

<a name="arrayEmpty"></a>

## arrayEmpty(array) ⇒ <code>boolean</code>
Checks if an array is empty.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the array is empty, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The input array. |

<a name="arrayToNumbers"></a>

## arrayToNumbers(array) ⇒ <code>Array</code>
Converts each element in the array to a number.

**Kind**: global function  
**Returns**: <code>Array</code> - - The array with each element converted to a number.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The input array. |

<a name="areArraysEqual"></a>

## areArraysEqual(array1, array2) ⇒ <code>boolean</code>
Checks if two arrays are equal.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the arrays are equal, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| array1 | <code>Array</code> | The first array. |
| array2 | <code>Array</code> | The second array. |

<a name="getColorNode"></a>

## getColorNode() ⇒ <code>HTMLElement</code>
Returns an HTML node used for color validation and other calculations.

**Kind**: global function  
<a name="rgbToHex"></a>

## rgbToHex(rgb) ⇒ <code>string</code>
Converts an RGB color value to a hexadecimal color value.

**Kind**: global function  
**Returns**: <code>string</code> - - The hexadecimal color value.  

| Param | Type | Description |
| --- | --- | --- |
| rgb | <code>string</code> | The RGB color value to convert. |

<a name="stringToHex"></a>

## stringToHex(color) ⇒ <code>string</code>
Converts a color string to a hexadecimal color value.

**Kind**: global function  
**Returns**: <code>string</code> - - The hexadecimal color value.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | The color string to convert. |

<a name="validateColor"></a>

## validateColor(value) ⇒ <code>boolean</code>
Validates a style color value.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the color value is valid, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The color value to validate. |

<a name="encodeValueCommas"></a>

## encodeValueCommas(text) ⇒ <code>string</code>
Encodes commas within double quotes in a text.

**Kind**: global function  
**Returns**: <code>string</code> - - The encoded text.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text to encode. |

<a name="decodeValueCommas"></a>

## decodeValueCommas(text) ⇒ <code>string</code>
Decodes encoded commas within double quotes in a text.

**Kind**: global function  
**Returns**: <code>string</code> - - The decoded text.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text to decode. |

<a name="csvToJson"></a>

## csvToJson(csv, map) ⇒ <code>Array</code>
Converts a CSV string to JSON object array.

**Kind**: global function  
**Returns**: <code>Array</code> - - The JSON object array.  

| Param | Type | Description |
| --- | --- | --- |
| csv | <code>string</code> | The CSV string to convert. |
| map | <code>Record.&lt;string, unknown&gt;</code> | An optional mapping object to rename the keys in the resulting JSON objects. |

<a name="normalizeTimeZeroes"></a>

## normalizeTimeZeroes(time) ⇒ <code>string</code>
Adds zero values if missing from seconds/minutes/hours.

**Kind**: global function  
**Returns**: <code>string</code> - - The normalized time string.  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | The time value. |

<a name="getTimeString"></a>

## getTimeString(date, hasSeconds) ⇒ <code>string</code>
Returns a string representation of the current time hh:mm:ss.

**Kind**: global function  
**Returns**: <code>string</code> - - The formatted time string.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | The date object. |
| hasSeconds | <code>boolean</code> | Whether to include seconds in the time string. |

<a name="getTimezoneOffset"></a>

## getTimezoneOffset(date) ⇒ <code>number</code>
Returns the timezone offset in hours.

**Kind**: global function  
**Returns**: <code>number</code> - - The timezone offset in hours.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | The date object. |

<a name="isFuture"></a>

## isFuture(dateTime) ⇒ <code>boolean</code>
Checks if a given date is in the future.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the date is in the future, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The date and time to compare. |

<a name="isBefore"></a>

## isBefore(dateTime, dateTime2) ⇒ <code>boolean</code>
Checks if one date is before another date.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the first date is before the second date, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The first date and time to compare. |
| dateTime2 | <code>Date</code> | The second date and time to compare. |

<a name="isAfter"></a>

## isAfter(dateTime, dateTime2) ⇒ <code>boolean</code>
Checks if one date is after another date.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the first date is after the second date, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The first date and time to compare. |
| dateTime2 | <code>Date</code> | The second date and time to compare. |

<a name="isPast"></a>

## isPast(dateTime) ⇒ <code>boolean</code>
Checks if a given date is in the past.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the date is in the past, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The date and time to compare. |

<a name="isToday"></a>

## isToday(dateTime) ⇒ <code>boolean</code>
Checks if a given date is today.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the date is today, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The date and time to compare. |

<a name="isYesterday"></a>

## isYesterday(dateTime) ⇒ <code>boolean</code>
Checks if a given date is yesterday.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the date is yesterday, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The date and time to compare. |

<a name="isTomorrow"></a>

## isTomorrow(dateTime) ⇒ <code>boolean</code>
Checks if a given date is tomorrow.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the date is tomorrow, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The date and time to compare. |

<a name="isThisWeek"></a>

## isThisWeek(dateTime) ⇒ <code>boolean</code>
Checks if a given date is within the current week.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the date is within the current week, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The date and time to compare. |

<a name="isThisMonth"></a>

## isThisMonth(dateTime) ⇒ <code>boolean</code>
Checks if a given date is within the current month.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the date is within the current month, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The date and time to compare. |

<a name="isThisYear"></a>

## isThisYear(dateTime) ⇒ <code>boolean</code>
Checks if a given date is within the current year.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the date is within the current year, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dateTime | <code>Date</code> | The date and time to compare. |

<a name="addTimezoneOffset"></a>

## addTimezoneOffset(date) ⇒ <code>Date</code>
Adds the timezone offset to a given date.

**Kind**: global function  
**Returns**: <code>Date</code> - - The date object with the timezone offset added.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | The date object to modify. |

<a name="formatDate"></a>

## formatDate(_date, format, addOffset, locale) ⇒ <code>string</code>
Formats a given date into a specified format.

**Kind**: global function  
**Returns**: <code>string</code> - - The formatted date string.  

| Param | Type | Description |
| --- | --- | --- |
| _date | <code>Date</code> | The date object to format. |
| format | <code>string</code> | The format string. |
| addOffset | <code>boolean</code> | Whether to add the timezone offset to the date. |
| locale | <code>string</code> | The locale to use for formatting. |

<a name="getTimeAgo"></a>

## getTimeAgo(date, referenceDate, format) ⇒ <code>string</code>
Returns a formatted string representing the time elapsed since the given date.

**Kind**: global function  
**Returns**: <code>string</code> - - The formatted time elapsed string.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | The date to compare. |
| referenceDate | <code>Date</code> | The reference date to compare against. |
| format | <code>string</code> | The format string. |

<a name="validateDateFormat"></a>

## validateDateFormat(format) ⇒ <code>boolean</code>
Validates a date format string.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the format is valid, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>string</code> | The format string to validate. |

<a name="getDaysInMonth"></a>

## getDaysInMonth(month, year) ⇒ <code>number</code>
Returns the number of days in a given month.

**Kind**: global function  
**Returns**: <code>number</code> - - The number of days in the month.  

| Param | Type |
| --- | --- |
| month | <code>number</code> | 
| year | <code>number</code> | 

<a name="setDateToMonday"></a>

## setDateToMonday(date) ⇒ <code>number</code>
Sets a date to the first day of the week.

**Kind**: global function  
**Returns**: <code>number</code> - - The number of days in the month.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | The date object. |

<a name="isOperaPhone"></a>

## isOperaPhone() ⇒ <code>boolean</code>
Checks if the user agent is Opera Mini.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is Opera Mini, false otherwise.  
<a name="isIE11"></a>

## isIE11() ⇒ <code>boolean</code>
Checks if the user agent is Internet Explorer 11.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is Internet Explorer 11, false otherwise.  
<a name="isIE"></a>

## isIE() ⇒ <code>boolean</code>
Checks if the user agent is Internet Explorer (any version).

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is Internet Explorer, false otherwise.  
<a name="isEdge"></a>

## isEdge() ⇒ <code>boolean</code>
Checks if the user agent is Edge.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is Edge, false otherwise.  
<a name="isFirefox"></a>

## isFirefox() ⇒ <code>boolean</code>
Checks if the user agent is Firefox.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is Firefox, false otherwise.  
<a name="isIOSPhone"></a>

## isIOSPhone() ⇒ <code>boolean</code>
Checks if the user agent is iOS (iPhone, iPad, iPod).

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is iOS, false otherwise.  
<a name="isWebkit"></a>

## isWebkit() ⇒ <code>boolean</code>
Checks if the user agent is WebKit.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is WebKit, false otherwise.  
<a name="isChrome"></a>

## isChrome() ⇒ <code>boolean</code>
Checks if the user agent is Chrome.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is Chrome, false otherwise.  
<a name="isSafari"></a>

## isSafari() ⇒ <code>boolean</code>
Checks if the user agent is Safari.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is Safari, false otherwise.  
<a name="isIOsSafari"></a>

## isIOsSafari() ⇒ <code>boolean</code>
Checks if the user agent is iOS Safari (iPhone, iPad, iPod or Safari browser).

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the user agent is iOS Safari, false otherwise.  
<a name="getExtension"></a>

## getExtension(file) ⇒ <code>string</code>
Get the extension of a file.

**Kind**: global function  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 

<a name="getFileName"></a>

## getFileName(file) ⇒ <code>string</code>
Get the name of a file.

**Kind**: global function  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 

<a name="getMimeType"></a>

## getMimeType(file) ⇒ <code>string</code>
Get the MIME type of a file.

**Kind**: global function  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 

<a name="getBase64"></a>

## getBase64(file) ⇒ <code>Promise.&lt;string&gt;</code>
Convert a file to base64 asynchronously.

**Kind**: global function  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 

<a name="getBase64Sync"></a>

## getBase64Sync(file) ⇒ <code>string</code>
Convert a file to base64 synchronously.

**Kind**: global function  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 

<a name="getBase64FromUrl"></a>

## getBase64FromUrl(url) ⇒ <code>Promise.&lt;string&gt;</code>
Convert a file from a URL to base64.

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="megaBytesToBytes"></a>

## megaBytesToBytes(megaBytes) ⇒ <code>number</code>
Convert megabytes to bytes.

**Kind**: global function  

| Param | Type |
| --- | --- |
| megaBytes | <code>number</code> | 

<a name="formatBytes"></a>

## formatBytes(bytes, [precision]) ⇒ <code>string</code>
Format bytes to a human-readable string.

**Kind**: global function  

| Param | Type |
| --- | --- |
| bytes | <code>number</code> | 
| [precision] | <code>number</code> | 

<a name="eventContainsFiles"></a>

## eventContainsFiles(event) ⇒ <code>boolean</code>
Check if an event contains files.

**Kind**: global function  

| Param | Type |
| --- | --- |
| event | <code>Event</code> | 

<a name="processFile"></a>

## processFile(file) ⇒ <code>Record.&lt;string, unknown&gt;</code>
Given a file object, returns a new object with processed data.

**Kind**: global function  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 

<a name="getDisplaySize"></a>

## getDisplaySize(img) ⇒ <code>Array.&lt;number&gt;</code>
Calculates the display size of an image.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - - The display size [width, height].  

| Param | Type | Description |
| --- | --- | --- |
| img | <code>HTMLImageElement</code> | The image element. |

<a name="upscale"></a>

## upscale(image, opt)
Up-scales an image to the available space in the image HTML container while maintaining the aspect ratio.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| image | <code>HTMLImageElement</code> | The image element. |
| opt | [<code>CropInterface</code>](#CropInterface) | The crop options. |

<a name="crop"></a>

## crop(image, opt) ⇒ [<code>CropInterface</code>](#CropInterface)
Crops an image.

**Kind**: global function  
**Returns**: [<code>CropInterface</code>](#CropInterface) - - The cropped image data.  

| Param | Type | Description |
| --- | --- | --- |
| image | <code>HTMLImageElement</code> | The image element. |
| opt | [<code>CropInterface</code>](#CropInterface) | The crop options. |

<a name="getMaximumSize"></a>

## getMaximumSize([maxSize], [breaks]) ⇒ <code>number</code>
Calculates the maximum size based on the screen dimensions.

**Kind**: global function  
**Returns**: <code>number</code> - - The maximum size.  

| Param | Type | Description |
| --- | --- | --- |
| [maxSize] | <code>number</code> | The maximum size of the image. |
| [breaks] | <code>Array.&lt;number&gt;</code> | The breakpoints. |

<a name="attr"></a>

## attr(node, attributes)
Adds attributes to a node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 
| attributes | <code>Record.&lt;string, string&gt;</code> | 

<a name="isInView"></a>

## isInView(node) ⇒ <code>boolean</code>
Checks if a node is in the viewport.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="addContent"></a>

## addContent(node, content)
Adds content to a node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 
| content | <code>\*</code> | 

<a name="setContent"></a>

## setContent(node, content)
Sets content to a node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 
| content | <code>\*</code> | 

<a name="style"></a>

## style(node, css)
Styles a node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 
| css | <code>Record.&lt;string, string&gt;</code> | 

<a name="prepend"></a>

## prepend(node, child)
Prepends a child node to a parent node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 
| child | <code>HTMLElement</code> | 

<a name="resolveNode"></a>

## resolveNode(node) ⇒ <code>HTMLElement</code> \| <code>null</code>
Resolves a node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> \| <code>string</code> | 

<a name="getScrollableParent"></a>

## getScrollableParent(node) ⇒ <code>HTMLElement</code> \| <code>null</code>
Returns the scrollable parent of a node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="getOffset"></a>

## getOffset(node) ⇒ <code>Array.&lt;number&gt;</code>
Returns the offset of a node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="onDoubleClick"></a>

## onDoubleClick(node, callback, delay)
Adds a double click event listener to a node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 
| callback | <code>function</code> | 
| delay | <code>number</code> | 

<a name="isObject"></a>

## isObject(obj) ⇒ <code>boolean</code>
Checks if an object is an object and not an array or HTMLElement.

**Kind**: global function  

| Param | Type |
| --- | --- |
| obj | <code>unknown</code> | 

<a name="mergeObjects"></a>

## mergeObjects(obj, obj2, strict) ⇒ <code>Record.&lt;string, unknown&gt;</code>
Merges two objects recursively.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Record.&lt;string, unknown&gt;</code> |  |
| obj2 | <code>Record.&lt;string, unknown&gt;</code> |  |
| strict | <code>boolean</code> | Strict mode will filter out properties that are not in the original object. |

<a name="getPropertyValue"></a>

## getPropertyValue(path, object, defaultValue) ⇒ <code>unknown</code>
Return the value of a nested object property.

**Kind**: global function  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| object | <code>Record.&lt;string, unknown&gt;</code> | 
| defaultValue | <code>unknown</code> | 

<a name="countProps"></a>

## countProps(obj) ⇒ <code>number</code>
Counts the number of properties in an object.

**Kind**: global function  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="createFormData"></a>

## createFormData(obj) ⇒ <code>FormData</code>
Creates a FormData object from an object.

**Kind**: global function  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="initializeResize"></a>

## initializeResize(callback)
Initializes the resize event listener and sets the flag indicating it has been initialized.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback function to be executed on resize. |

<a name="removeScrollCallback"></a>

## removeScrollCallback(callback)
Removes the specified callback function from the scroll event listener.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback function to be removed. |

<a name="_onResize"></a>

## \_onResize(event)
Executes resize event listener callbacks.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | The resize event handler. |

<a name="onResize"></a>

## onResize(callback)
Adds a callback function to the resize event listener.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback function to be added. |

<a name="initializeOnScroll"></a>

## initializeOnScroll(callback)
Initializes the scroll event listener and sets the flag indicating it has been initialized.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback function to be executed on scroll. |

<a name="_onScroll"></a>

## \_onScroll(event)
Executes scroll event listener callbacks.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | The resize event. |

<a name="onScroll"></a>

## onScroll(callback)
Adds a callback function to the scroll event listener.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback function to be added. |

<a name="removeResizeCallback"></a>

## removeResizeCallback(callback)
Removes the specified callback function from the resize event listener.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback function to be removed. |

<a name="dashedToCamel"></a>

## dashedToCamel(str) ⇒ <code>string</code>
Converts a dashed string to camel case.

**Kind**: global function  
**Returns**: <code>string</code> - The camel case string.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The dashed string. |

<a name="ucFirst"></a>

## ucFirst(str) ⇒ <code>string</code>
Converts the first character of a string to uppercase.

**Kind**: global function  
**Returns**: <code>string</code> - The string with the first character in uppercase.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="lcFirst"></a>

## lcFirst(str) ⇒ <code>string</code>
Converts the first character of a string to lowercase.

**Kind**: global function  
**Returns**: <code>string</code> - The string with the first character in lowercase.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="truncate"></a>

## truncate(str, length) ⇒ <code>string</code>
Truncates a string to a specified length.

**Kind**: global function  
**Returns**: <code>string</code> - The truncated string.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |
| length | <code>number</code> | The maximum length of the truncated string. |

<a name="getSafeID"></a>

## getSafeID(str) ⇒ <code>string</code>
Removes unsafe characters from a string to create a safe ID.

**Kind**: global function  
**Returns**: <code>string</code> - The safe ID string.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="parseOutlookEmails"></a>

## parseOutlookEmails(str) ⇒ <code>Array.&lt;string&gt;</code>
Parses email addresses from a string.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of parsed email addresses.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="mechanize"></a>

## mechanize(str) ⇒ <code>string</code>
Converts a string to a URL-friendly format.

**Kind**: global function  
**Returns**: <code>string</code> - The URL-friendly string.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="removeWhiteSpace"></a>

## removeWhiteSpace(str) ⇒ <code>string</code>
Removes white spaces from a string.

**Kind**: global function  
**Returns**: <code>string</code> - The string without white spaces.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="extractCurrency"></a>

## extractCurrency(str) ⇒ <code>string</code> \| <code>null</code>
Extracts the currency symbol from a string.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - The currency symbol or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="sanitizeSearchInput"></a>

## sanitizeSearchInput(str) ⇒ <code>string</code>
Sanitizes a search input by removing special characters and limiting the length.

**Kind**: global function  
**Returns**: <code>string</code> - The sanitized search input.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="getInitials"></a>

## getInitials(str) ⇒ <code>string</code>
Retrieves the initials from a string.

**Kind**: global function  
**Returns**: <code>string</code> - The initials.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The input string. |

<a name="getURLParams"></a>

## getURLParams(url) ⇒ <code>object</code>
Extracts query string parameters from a string representing a URL and returns them in an object.

**Kind**: global function  
**Returns**: <code>object</code> - - An object representing the query string parameters.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A URL string. |

<a name="arrayToQueryString"></a>

## arrayToQueryString(propName, array, encode) ⇒ <code>string</code>
Transforms an array into a URL query string.

**Kind**: global function  
**Returns**: <code>string</code> - - A URL query string.  

| Param | Type | Description |
| --- | --- | --- |
| propName | <code>string</code> | The name of the property. |
| array | <code>Array.&lt;string&gt;</code> | The array to be converted into a query string. |
| encode | <code>boolean</code> | Whether or not to encode the query string values. |

<a name="decodeURIComponentSafe"></a>

## decodeURIComponentSafe(value) ⇒ <code>string</code>
Decodes a URI component safely.

**Kind**: global function  
**Returns**: <code>string</code> - - The decoded value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to be decoded. |

<a name="areUrlsEqual"></a>

## areUrlsEqual(url1, url2) ⇒ <code>boolean</code>
Checks if two URLs are equal.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the URLs are equal, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| url1 | <code>string</code> | The first URL. |
| url2 | <code>string</code> | The second URL. |

<a name="removeLastSlash"></a>

## removeLastSlash(path) ⇒ <code>string</code>
Removes the last slash from a path.

**Kind**: global function  
**Returns**: <code>string</code> - - The path without the last slash.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | A path string. |

<a name="sanitizePath"></a>

## sanitizePath(path) ⇒ <code>string</code>
Sanitizes the path.

**Kind**: global function  
**Returns**: <code>string</code> - - The sanitized path.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | A path string. |

<a name="removeURLOrigin"></a>

## removeURLOrigin(url) ⇒ <code>string</code> \| <code>undefined</code>
Removes the origin from a URL.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - - The URL without the origin.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A URL string. |

<a name="sanitizeURL"></a>

## sanitizeURL(url) ⇒ <code>string</code>
Sanitizes the URL.

**Kind**: global function  
**Returns**: <code>string</code> - - The sanitized URL.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A URL string. |

<a name="getURLPath"></a>

## getURLPath(url) ⇒ <code>string</code>
Returns the current path.

**Kind**: global function  
**Returns**: <code>string</code> - - The current path.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A URL string. |

<a name="getURLParam"></a>

## getURLParam(name, url) ⇒ <code>string</code>
Gets a specific query string parameter value from a URL.

**Kind**: global function  
**Returns**: <code>string</code> - - The value of the query string parameter.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the query string parameter. |
| url | <code>string</code> | A URL string. |

<a name="matchPath"></a>

## matchPath(url, route) ⇒ <code>boolean</code>
Matches a URL against a route.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if there is a match, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Any URL. |
| route | <code>Array.&lt;string&gt;</code> | An array of routes to match against. |

<a name="matchPaths"></a>

## matchPaths(url, routes) ⇒ <code>boolean</code>
Matches a URL against multiple routes.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if there is a match, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Any URL. |
| routes | <code>Array.&lt;string&gt;</code> | An array of routes to match against. |

<a name="getPathParts"></a>

## getPathParts(url) ⇒ <code>Array.&lt;string&gt;</code>
Returns the parts of the current path.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - - The parts of the current path.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A URL string. |

<a name="objectToQueryString"></a>

## objectToQueryString(object, encode) ⇒ <code>string</code>
Transforms an object into a URL query string.

**Kind**: global function  
**Returns**: <code>string</code> - - A URL query string.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | An object with properties to be converted into a query string. |
| encode | <code>boolean</code> | Whether or not to encode the query string values. |

<a name="editURL"></a>

## editURL(url, params, encode) ⇒ <code>string</code>
Edits the query in a URL. This function is designed to work with any kind of string, not necessarily a valid URL format that includes a protocol, such as the one required by the native JS URL constructor, which does not handle relative URLs.
Unlike URLSearchParams constructor, this function accepts a full URL and will not encode the path.

**Kind**: global function  
**Returns**: <code>string</code> - - A new URL string with query string parameters based on the params object.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A URL string. |
| params | <code>object</code> | A set of parameters representing query string values that must be edited in the URL. |
| encode | <code>boolean</code> | Whether or not to encode the query string values. |

<a name="removeURLParam"></a>

## removeURLParam(name, url) ⇒ <code>string</code>
Removes a specific query string parameter from a URL.

**Kind**: global function  
**Returns**: <code>string</code> - - A new URL string without the specified query string parameter.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the query string parameter to remove. |
| url | <code>string</code> | A URL string. |

<a name="validateRequired"></a>

## validateRequired(value) ⇒ <code>boolean</code>
Checks if a value is required.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the value is required, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>unknown</code> | The value to be checked. |

<a name="validateMaxLength"></a>

## validateMaxLength(value, maxLength) ⇒ <code>boolean</code> \| <code>undefined</code>
Checks if a value has a maximum length.

**Kind**: global function  
**Returns**: <code>boolean</code> \| <code>undefined</code> - - True if the value has a maximum length, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>unknown</code> | The value to be checked. |
| maxLength | <code>number</code> | The maximum length allowed. |

<a name="validateMinLength"></a>

## validateMinLength(value, minLength) ⇒ <code>boolean</code> \| <code>undefined</code>
Checks if a value has a minimum length.

**Kind**: global function  
**Returns**: <code>boolean</code> \| <code>undefined</code> - - True if the value has a minimum length, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>unknown</code> | The value to be checked. |
| minLength | <code>number</code> | The minimum length allowed. |

<a name="validateLength"></a>

## validateLength(value, length) ⇒ <code>boolean</code> \| <code>undefined</code>
Checks if a value has a specific length.

**Kind**: global function  
**Returns**: <code>boolean</code> \| <code>undefined</code> - - True if the value has the specific length, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>unknown</code> | The value to be checked. |
| length | <code>number</code> | The specific length to be checked against. |

<a name="validateSize"></a>

## validateSize(value, size) ⇒ <code>boolean</code>
Checks if a value has a size within a range.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the value has a size within the range, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>unknown</code> | The value to be checked. |
| size | <code>Array.&lt;number&gt;</code> | The range of sizes allowed. |

<a name="validateRegex"></a>

## validateRegex(value, _regex) ⇒ <code>boolean</code>
Checks if a value matches a regular expression.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the value matches the regular expression, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to be checked. |
| _regex | <code>string</code> \| <code>RegExp</code> | The regular expression to be used for matching. |

<a name="validateNumber"></a>

## validateNumber(_value) ⇒ <code>boolean</code>
Checks if a value is a number.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the value is a number, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| _value | <code>\*</code> | The value to be checked. |

<a name="validateColour"></a>

## validateColour(value) ⇒ <code>boolean</code>
Checks if a value is a valid color.

**Kind**: global function  
**Returns**: <code>boolean</code> - - True if the value is a valid color, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to be checked. |

