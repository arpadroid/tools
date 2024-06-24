import { getBuild } from '@arpadroid/arpadroid/src/rollup/builds/rollup-builds.mjs';
const { build } = getBuild('tools', 'uiComponent');
export default build;