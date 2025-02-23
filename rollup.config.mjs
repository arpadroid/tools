import { getBuild } from '@arpadroid/module/src/rollup/builds/rollup-builds.mjs';
const { build } = getBuild('tools', 'library');
export default build;
