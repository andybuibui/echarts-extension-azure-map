[![NPM version](https://img.shields.io/npm/v/echarts-extension-azure-map.svg?style=flat)](https://www.npmjs.org/package/echarts-extension-azure-map) [![NPM Downloads](https://img.shields.io/npm/dm/echarts-extension-azure-map.svg)](https://npmcharts.com/compare/echarts-extension-azure-map?minimal=true) [![jsDelivr Downloads](https://data.jsdelivr.com/v1/package/npm/echarts-extension-azure-map/badge?style=rounded)](https://www.jsdelivr.com/package/npm/echarts-extension-azure-map)

## Azure Map extension for Apache ECharts

This is an Azure Map extension for [Apache ECharts](https://echarts.apache.org/en/index.html)

### Installation

```shell
npm install echarts-extension-azure-map --save
```

### Import

Import packaged distribution file `echarts-extension-azure-map` and add Azure Map API script and ECharts script.

```html
<link
  href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.css"
  rel="stylesheet"
/>
<script src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.js"></script>
<!-- import ECharts -->
<script src="https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<!-- import echarts-extension-azure-map -->
<script src="https://fastly.jsdelivr.net/npm/echarts-extension-azure-map/dist/echarts-extension-azure-map.min.js"></script>
```

You can also import this extension by `require` or `import` if you are using `webpack` or any other bundler.

```js
// use require
require('echarts');
require('echarts-extension-azure-map');
require('azure-maps-control');

// use import
import * as echarts from 'echarts';
import 'echarts-extension-azure-map';
import * as atlas from 'azure-maps-control';
```

### Examples

#### FlyChart

### Heart Chart

#### Line Chart

#### Pie Chart

#### Scatter Chart
