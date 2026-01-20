module.exports = {
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
    coverageReporters: ['html', 'text', 'cobertura'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'mjs'],
    moduleNameMapper: {
        '^@arpadroid/tools-iso/stringTool$': '<rootDir>/../tools-iso/src/stringTool/stringTool.js',
        '^@arpadroid/tools-iso/objectTool$': '<rootDir>/../tools-iso/src/objectTool/objectTool.js',
        '^@arpadroid/tools-iso$': '<rootDir>/../tools-iso/src/index.js',
        '^@arpadroid/tools-iso/(.*)$': '<rootDir>/../tools-iso/src/$1',
        '^@arpadroid/signals/observerTool$': '<rootDir>/../signals/src/observerTool/observerTool.js',
        '^@arpadroid/signals$': '<rootDir>/../signals/src/index.js',
        '^@arpadroid/signals/(.*)$': '<rootDir>/../signals/src/$1'
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.mjs$': 'babel-jest'
    },
    fakeTimers: { enableGlobally: true },
    globals: {},
    reporters: [
        'default',
        [
            'jest-junit',
            {
                // outputDirectory: "",
                outputName: 'junit.xml'
            }
        ]
    ]
};
