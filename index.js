import * as echarts from 'echarts';
import { isNewEC } from './lib/helper';
import { install } from './lib/index';

isNewEC ? echarts.use(install) : install(echarts);

export { name, version } from './lib/index';
