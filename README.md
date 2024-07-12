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
require('azure-maps-control/dist/atlas.min.css');
require('azure-maps-control');

// use import
import * as echarts from 'echarts';
import 'echarts-extension-azure-map';
import "azure-maps-control/dist/atlas.min.css";
import * as atlas from 'azure-maps-control';
```

### Examples

#### FlyChart
![image](https://github.com/user-attachments/assets/3af869ef-60a2-4c66-86f7-a0576bcfaa71)

### Heart Chart
![image](https://github.com/user-attachments/assets/2013714a-b5da-44f8-9f2a-146c9983a771)

#### Line Chart
![image](https://github.com/user-attachments/assets/402e1268-2ea6-409c-80f6-7e928f385dc5)

#### Pie Chart for echarts < 5.4.0
![image](https://github.com/user-attachments/assets/e9680876-4bb0-4d6f-b133-74524919b79a)

#### Pie Chart for echarts >= 5.4.0
![image](https://github.com/user-attachments/assets/72117a8d-e282-4568-ac17-6d2408285a33)

#### Scatter Chart
![image](https://github.com/user-attachments/assets/9a6861ad-1927-4618-bf56-1b7066a646ff)

