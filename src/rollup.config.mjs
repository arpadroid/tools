import { getBuild } from '@arpadroid/module';
const { build = {} } = getBuild('tools') || {};
export default build;
