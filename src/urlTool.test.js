import {
    getURLParams,
    arrayToQueryString,
    decodeURIComponentSafe,
    areUrlsEqual,
    removeLastSlash,
    sanitizePath,
    getURLPath,
    getURLParam,
    matchPath,
    matchPaths,
    getPathParts,
    objectToQueryString,
    sanitizeURL,
    editURL,
    removeURLParam
} from './urlTool';

describe('urlTool', () => {
    describe('getParams', () => {
        it('should return an object with query string parameters', () => {
            const url = 'https://examples.com?param1=value1&param2=value2';
            const params = getURLParams(url);
            expect(params).toEqual({ param1: 'value1', param2: 'value2' });
        });

        it('should return an empty object if there are no query string parameters', () => {
            const url = 'https://arpadroid.com';
            const params = getURLParams(url);
            expect(params).toEqual({});
        });
    });

    describe('arrayToQueryString', () => {
        it('should return a URL query string from an array', () => {
            const propName = 'colors';
            const array = ['red', 'green', 'blue'];
            const queryString = arrayToQueryString(propName, array);
            expect(queryString).toBe('colors[]=red&colors[]=green&colors[]=blue');
        });

        it('should return an empty string if the array is empty', () => {
            const propName = 'colors';
            const array = [];
            const queryString = arrayToQueryString(propName, array);
            expect(queryString).toBe('');
        });
    });

    describe('decodeURIComponentSafe', () => {
        it('should decode a URI component safely', () => {
            const value = '%20Hello%20World%21';
            const decodedValue = decodeURIComponentSafe(value);
            expect(decodedValue).toBe(' Hello World!');
        });
    });

    describe('areUrlsEqual', () => {
        it('should return true for equal URLs', () => {
            const url1 = 'https://examples.com';
            const url2 = 'https://examples.com';
            const areEqual = areUrlsEqual(url1, url2);
            expect(areEqual).toBe(true);
        });

        it('should return false for different URLs', () => {
            const url1 = 'https://example.com';
            const url2 = 'https://example.org';
            const areEqual = areUrlsEqual(url1, url2);
            expect(areEqual).toBe(false);
        });
    });

    describe('removeLastSlash', () => {
        it('should remove the last slash from a path', () => {
            const path = '/users/';
            const newPath = removeLastSlash(path);
            expect(newPath).toBe('/users');
        });

        it('should not remove the last slash if it is the only character', () => {
            const path = '/';
            const newPath = removeLastSlash(path);
            expect(newPath).toBe('');
        });
    });

    describe('sanitizePath', () => {
        it('should sanitize the path', () => {
            const path = '/users/andres%20vaquero/';
            const sanitizedPath = sanitizePath(path);
            expect(sanitizedPath).toBe('/users/andres%20vaquero');
        });
    });

    describe('getURLPath', () => {
        it('should return the path of a URL', () => {
            const url = 'https://example.com/users/arpadroid';
            const path = getURLPath(url);
            expect(path).toBe('/users/arpadroid');
        });

        it('should return the path of a URL without query string parameters', () => {
            const url = 'http://example.com/users/arpadroid?param1=value1';
            const path = getURLPath(url);
            expect(path).toBe('/users/arpadroid');
        });
    });

    describe('sanitize', () => {
        it('should sanitize the URL', () => {
            const url = 'https://example.com/users/andres%20vaquero/';
            const sanitizedUrl = sanitizeURL(url);
            expect(sanitizedUrl).toBe('/users/andres%20vaquero');
        });
    });

    describe('getParam', () => {
        it('should get a specific query string parameter value from a URL', () => {
            const name = 'param1';
            const url = 'https://www.com?param1=value1&param2=value2';
            const paramValue = getURLParam(name, url);
            expect(paramValue).toBe('value1');
        });

        it('should return an array ', () => {
            const url = 'https://www.com?param1[]=value1&param1[]=value2';
            const paramValue = getURLParam('param1', url);
            expect(paramValue).toEqual(['value1', 'value2']);
        });
    });

    describe('matchPath', () => {
        it('should match a URL against a route', () => {
            const isMatch = matchPath('/users/125', '/users/:id');
            expect(isMatch).toBe(true);
        });

        it('should not match a URL against a route', () => {
            const isMatch = matchPath('/users/andriu', '/posts/:postId');
            expect(isMatch).toBe(false);
        });
    });

    describe('matchPaths', () => {
        it('should match a URL against multiple routes', () => {
            const url = '/users/123';
            const routes = ['/users/:id', '/posts/:id'];
            const isMatch = matchPaths(url, routes);
            expect(isMatch).toBe(true);
        });

        it('should not match a URL against multiple routes', () => {
            const url = '/users/123';
            const routes = ['/posts/:id', '/comments/:id'];
            const isMatch = matchPaths(url, routes);
            expect(isMatch).toBe(false);
        });
    });

    describe('getPathParts', () => {
        it('should return the parts of the current path', () => {
            const url = 'https://example.com/users/andresvaquero';
            const pathParts = getPathParts(url);
            expect(pathParts).toEqual(['users', 'andresvaquero']);
        });
    });

    describe('objectToQueryString', () => {
        it('should transform an object into a URL query string', () => {
            const object = { param1: 'value1', param2: 'value2' };
            const queryString = objectToQueryString(object);
            expect(queryString).toBe('?param1=value1&param2=value2');
        });
    });

    describe('editUrl', () => {
        it('should edit the query in a URL', () => {
            const url = 'https://example.com?param1=value1&param2=value2';
            const params = { param1: 'newvalue1', param3: 'value3' };
            const editedUrl = editURL(url, params);
            expect(editedUrl).toBe('https://example.com?param1=newvalue1&param2=value2&param3=value3');
        });
    });

    describe('removeParam', () => {
        it('should remove a specific query string parameter from a URL', () => {
            const name = 'param1';
            const url = 'https://example.com?param1=value1&param2=value2';
            const newUrl = removeURLParam(name, url);
            expect(newUrl).toBe('https://example.com?param2=value2');
        });
    });
});
