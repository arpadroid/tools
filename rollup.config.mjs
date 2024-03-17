import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

export default [
    {
        input: 'src/index.js',
        plugins: [terser()],
        output: {
            file: 'dist/index.js',
            format: 'es'
        }
    },
    {
        input: './src/types.d.ts',
        output: [{ file: 'dist/types.d.ts', format: 'es' }],
        plugins: [dts()]
    }
];
