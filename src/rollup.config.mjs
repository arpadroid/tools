import { getBuild } from '@arpadroid/module';
const { build = {} } = getBuild('tools', 'library') || {};
export default build;
