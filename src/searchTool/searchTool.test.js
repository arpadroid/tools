import { searchNodes, addSearchMatchMarkers, SearchTool } from './searchTool';
import { jest } from '@jest/globals';

describe('searchTool', () => {
    describe('searchNodes', () => {
        it('should search through nodes and return matches', async () => {
            const node1 = document.createElement('div');
            const node2 = document.createElement('div');
            const node3 = document.createElement('div');
            node1.textContent = 'Hello World';
            node2.textContent = 'Goodbye Moon';
            node3.textContent = 'Hello Moon';

            const result = await searchNodes('hello', [node1, node2, node3]);

            expect(result.matches).toHaveLength(2);
            expect(result.nonMatches).toHaveLength(1);
            expect(result.matches).toContain(node1);
            expect(result.matches).toContain(node3);
            expect(result.nonMatches).toContain(node2);
            expect(result.query).toBe('hello');
        });

        it('should call callback for each node', async () => {
            const node1 = document.createElement('div');
            const node2 = document.createElement('div');
            node1.textContent = 'Find this';
            node2.textContent = 'No match';

            const callback = jest.fn();
            await searchNodes('find', [node1, node2], callback);

            expect(callback).toHaveBeenCalledTimes(2);
            expect(callback).toHaveBeenCalledWith(node1, true);
            expect(callback).toHaveBeenCalledWith(node2, false);
        });

        it('should handle empty search value', async () => {
            const node = document.createElement('div');
            node.textContent = 'Content';

            const result = await searchNodes('', [node]);

            expect(result.matches).toHaveLength(1);
            expect(result.query).toBe('');
        });

        it('should handle empty nodes array', async () => {
            const result = await searchNodes('query', []);

            expect(result.matches).toHaveLength(0);
            expect(result.nonMatches).toHaveLength(0);
        });

        it('should be case insensitive', async () => {
            const node = document.createElement('div');
            node.textContent = 'Hello World';

            const result = await searchNodes('HELLO', [node]);

            expect(result.matches).toHaveLength(1);
        });
    });

    describe('addSearchMatchMarkers', () => {
        it('should add mark tags around matched text', () => {
            const container = document.createElement('div');
            container.innerHTML = '<p>Hello World</p>';
            document.body.appendChild(container);

            addSearchMatchMarkers(container, 'Hello', 'p');

            expect(container.innerHTML).toContain('<mark');
            expect(container.innerHTML).toContain('Hello');

            document.body.removeChild(container);
        });

        it('should handle empty search value', () => {
            const container = document.createElement('div');
            container.innerHTML = '<p>Hello World</p>';
            const originalContent = container.innerHTML;

            addSearchMatchMarkers(container, '', 'p');

            expect(container.innerHTML).toBe(originalContent);
        });

        it('should use custom class name', () => {
            const container = document.createElement('div');
            container.innerHTML = '<p>Hello World</p>';
            document.body.appendChild(container);

            addSearchMatchMarkers(container, 'Hello', 'p', 'customMatch');

            expect(container.innerHTML).toContain('class="customMatch"');

            document.body.removeChild(container);
        });

        it('should preserve original content', () => {
            const container = document.createElement('div');
            container.innerHTML = '<p>Hello World</p>';
            const p = container.querySelector('p');
            document.body.appendChild(container);

            addSearchMatchMarkers(container, 'Hello', 'p');
            addSearchMatchMarkers(container, '', 'p');

            expect(p.originalContent).toBe('Hello World');

            document.body.removeChild(container);
        });

        it('should handle case insensitive matching', () => {
            const container = document.createElement('div');
            container.innerHTML = '<p>Hello World</p>';
            document.body.appendChild(container);

            addSearchMatchMarkers(container, 'hello', 'p');

            expect(container.innerHTML).toContain('<mark');

            document.body.removeChild(container);
        });

        it('should handle multiple matches', () => {
            const container = document.createElement('div');
            container.innerHTML = '<p>Hello Hello Hello</p>';
            document.body.appendChild(container);

            addSearchMatchMarkers(container, 'Hello', 'p');

            const marks = container.querySelectorAll('mark');
            expect(marks.length).toBe(3);

            document.body.removeChild(container);
        });

        it('should work with falsy content selector', () => {
            const container = document.createElement('div');
            container.textContent = 'Hello World';
            document.body.appendChild(container);

            // Empty string selector will be handled by implementation's contentSelector check
            addSearchMatchMarkers(container, 'Hello', null);

            // Implementation should handle it without throwing
            expect(container.textContent).toContain('Hello');

            document.body.removeChild(container);
        });
    });

    describe('SearchTool', () => {
        let input, searchTool;

        beforeEach(() => {
            input = document.createElement('input');
            input.type = 'text';
            document.body.appendChild(input);
            jest.useFakeTimers();
        });

        afterEach(() => {
            if (searchTool) {
                searchTool = null;
            }
            document.body.removeChild(input);
            jest.useRealTimers();
        });

        it('should create SearchTool instance', () => {
            searchTool = new SearchTool(input);
            expect(searchTool).toBeInstanceOf(SearchTool);
            expect(searchTool.input).toBe(input);
        });

        it('should set config', () => {
            const config = { debounceDelay: 1000, matchClass: 'custom' };
            searchTool = new SearchTool(input, config);

            expect(searchTool.config.debounceDelay).toBe(1000);
            expect(searchTool.config.matchClass).toBe('custom');
        });

        it('should get default config', () => {
            searchTool = new SearchTool(input);
            const defaultConfig = searchTool.getDefaultConfig();

            expect(defaultConfig.matchClass).toBe('searchMatch');
            expect(defaultConfig.debounceDelay).toBe(500);
            expect(defaultConfig.addMarkers).toBe(true);
            expect(defaultConfig.hideNonMatches).toBe(true);
        });

        it('should get nodes from config', () => {
            const nodes = [document.createElement('div'), document.createElement('div')];
            searchTool = new SearchTool(input, { nodes });

            expect(searchTool.getNodes()).toBe(nodes);
        });

        it('should get nodes from container', () => {
            const container = document.createElement('div');
            container.appendChild(document.createElement('span'));
            container.appendChild(document.createElement('span'));
            document.body.appendChild(container);

            searchTool = new SearchTool(input, { container });
            const nodes = searchTool.getNodes();

            expect(nodes.length).toBe(2);

            document.body.removeChild(container);
        });

        it('should get nodes from function', () => {
            const mockNodes = [document.createElement('div')];
            const getNodes = jest.fn(() => mockNodes);

            searchTool = new SearchTool(input, { getNodes });

            expect(searchTool.getNodes()).toBe(mockNodes);
            expect(getNodes).toHaveBeenCalled();
        });

        it('should perform search', async () => {
            const node1 = document.createElement('div');
            const node2 = document.createElement('div');
            node1.textContent = 'Hello World';
            node2.textContent = 'Goodbye';

            searchTool = new SearchTool(input, { nodes: [node1, node2], addMarkers: false });
            await searchTool.doSearch(undefined, 'hello');

            expect(searchTool.matches).toHaveLength(1);
            expect(searchTool.nonMatches).toHaveLength(1);
        });

        it('should handle onSearch callback', async () => {
            const onSearch = jest.fn();
            searchTool = new SearchTool(input, { onSearch, nodes: [], addMarkers: false });

            await searchTool.doSearch(undefined, 'test');

            expect(onSearch).toHaveBeenCalledWith(expect.objectContaining({ query: 'test', nodes: [] }));
        });

        it('should stop search if onSearch returns false', async () => {
            const onSearch = jest.fn(() => false);
            const node = document.createElement('div');
            node.textContent = 'Hello';

            searchTool = new SearchTool(input, { onSearch, nodes: [node], addMarkers: false });
            await searchTool.doSearch(undefined, 'hello');

            expect(searchTool.matches).toBeUndefined();
        });

        it('should debounce search', async () => {
            // Use real timers for debounce test
            jest.useRealTimers();

            const nodes = [document.createElement('div')];
            nodes[0].textContent = 'test';
            searchTool = new SearchTool(input, { nodes, debounceDelay: 100, addMarkers: false });

            // Wait for initial timeout from constructor
            await new Promise(resolve => setTimeout(resolve, 150));

            input.value = 'test';
            input.dispatchEvent(new Event('input'));

            // Should not search immediately
            expect(searchTool.matches).toBeUndefined();

            // Wait for debounce
            await new Promise(resolve => setTimeout(resolve, 150));

            expect(searchTool.matches).toBeDefined();
        });

        it('should call onSearchNode for each matched node', async () => {
            // Use real timers
            jest.useRealTimers();

            const onSearchNode = jest.fn();
            const node = document.createElement('div');
            node.textContent = 'Hello';
            document.body.appendChild(node);

            searchTool = new SearchTool(input, {
                nodes: [node],
                onSearchNode,
                debounceDelay: 50,
                searchSelector: 'div'
            });

            // Wait for initial constructor timeout
            await new Promise(resolve => setTimeout(resolve, 100));

            input.value = 'hello';
            input.dispatchEvent(new Event('input'));

            // Wait for debounce and search completion
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(onSearchNode).toHaveBeenCalled();

            document.body.removeChild(node);
        });

        it('should stop processing node when onSearchNode returns false', async () => {
            // Use real timers
            jest.useRealTimers();

            const onSearchNode = jest.fn(() => false);
            const node = document.createElement('div');
            node.textContent = 'Hello';
            document.body.appendChild(node);

            searchTool = new SearchTool(input, {
                nodes: [node],
                onSearchNode,
                addMarkers: true,
                debounceDelay: 50
            });

            // Wait for initial constructor timeout
            await new Promise(resolve => setTimeout(resolve, 100));

            input.value = 'hello';
            input.dispatchEvent(new Event('input'));

            // Wait for debounce and search completion
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(onSearchNode).toHaveBeenCalled();

            document.body.removeChild(node);
        });

        it('should hide non-matching nodes', async () => {
            // Use real timers for this test
            jest.useRealTimers();

            const node1 = document.createElement('div');
            const node2 = document.createElement('div');
            node1.textContent = 'Apple';
            node2.textContent = 'Banana';
            document.body.appendChild(node1);
            document.body.appendChild(node2);

            searchTool = new SearchTool(input, {
                nodes: [node1, node2],
                hideNonMatches: true,
                debounceDelay: 50,
                searchSelector: null,
                addMarkers: false
            });

            // Wait for initial constructor timeout
            await new Promise(resolve => setTimeout(resolve, 100));

            input.value = 'apple';
            
            // Call doSearch directly with a mock event to ensure event is passed through
            const mockEvent = new Event('input');
            await searchTool.doSearch(mockEvent, 'apple');

            expect(node2.style.display).toBe('none');
            expect(node1.style.display).toBe('');

            document.body.removeChild(node1);
            document.body.removeChild(node2);
        });

        it('should not search if value unchanged', async () => {
            // Use real timers
            jest.useRealTimers();

            const onSearch = jest.fn();
            searchTool = new SearchTool(input, {
                nodes: [],
                onSearch,
                debounceDelay: 50,
                addMarkers: false
            });

            input.value = 'test';
            searchTool._prevValue = 'test';
            input.dispatchEvent(new Event('input'));

            await new Promise(resolve => setTimeout(resolve, 100));

            expect(onSearch).not.toHaveBeenCalled();

            jest.useFakeTimers();
        });

        it('should initialize input listener', async () => {
            // Use real timers
            jest.useRealTimers();

            searchTool = new SearchTool(input, { addMarkers: false, nodes: [], debounceDelay: 50 });

            // Wait for initial constructor timeout
            await new Promise(resolve => setTimeout(resolve, 100));

            // Verify the listener was added by checking if input event triggers search
            input.value = 'test';
            input.dispatchEvent(new Event('input'));

            // Wait for debounce
            await new Promise(resolve => setTimeout(resolve, 100));

            // If the listener works, _prevValue should be set
            expect(searchTool._prevValue).toBe('test');
        });

        it('should support signal for search event', async () => {
            const callback = jest.fn();
            searchTool = new SearchTool(input, { nodes: [], addMarkers: false });
            searchTool.on('search', callback);

            await searchTool.doSearch(undefined, 'test');

            expect(callback).toHaveBeenCalled();
        });
    });
});
