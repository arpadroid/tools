module.exports = {
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
    coverageReporters: ['html', 'text', 'cobertura'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest'
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
