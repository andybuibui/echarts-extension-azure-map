# Echarts-Extension-Azure-Map
[![NPM version](https://img.shields.io/npm/v/echarts-extension-azure-map.svg?style=flat)](https://www.npmjs.org/package/echarts-extension-azure-map) [![NPM Downloads](https://img.shields.io/npm/dm/echarts-extension-azure-map.svg)](https://npmcharts.com/compare/echarts-extension-azure-map?minimal=true) [![jsDelivr Downloads](https://data.jsdelivr.com/v1/package/npm/echarts-extension-azure-map/badge?style=rounded)](https://www.jsdelivr.com/package/npm/echarts-extension-azure-map)

## Azure Map Extension for Apache ECharts

`Echarts Extension Azure Maps` is an Extension for [Apache ECharts](https://echarts.apache.org/en/index.html).

## Installation
Use the package manager `npm` or `yarn`

```bash
npm install echarts-extension-azure-map
```

or

```bash
yarn add echarts-extension-azure-map
```

## Styling
Embed the following css to your application. The stylesheet is required for the marker, popup and control components in `react-azure-maps` to work properly.
```javascript
import 'azure-maps-control/dist/atlas.min.css'
```

## Authentication

The subscription key is intended for development environments only and must not be utilized in a production application. Azure Maps provides various authentication options for applications to use. See [here](https://learn.microsoft.com/en-us/azure/azure-maps/how-to-manage-authentication) for more details.

```javascript
// AAD
authOptions: {
    authType: AuthenticationType.aad,
    clientId: '...',
    aadAppId: '...',
    aadTenant: '...'
}
```

```javascript
// Anonymous
authOptions: {
    authType: AuthenticationType.anonymous,
    clientId: '...',
    getToken: (resolve, reject) => {
        // URL to your authentication service that retrieves an Azure Active Directory Token.
        var tokenServiceUrl = "https://example.com/api/GetAzureMapsToken";
        fetch(tokenServiceUrl).then(r => r.text()).then(token => resolve(token));
    }
}
```

```javascript
// SAS Token
authOptions: {
    authType: AuthenticationType.sas,
    getToken: (resolve, reject) => {
        // URL to your authentication service that retrieves a SAS Token.
        var tokenServiceUrl = "https://example.com/api/GetSASToken";
        fetch(tokenServiceUrl).then(r => r.text()).then(token => resolve(token));
    }
}
```

## Import

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

```javascript
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

## eg: use subscriptionKey

```javascript
// app.ts or index.js
import "azure-maps-control/dist/atlas.min.css";

// page.tsx
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { AuthenticationType } from 'azure-maps-control';

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const loadMap = () => {
    const option = {
       azuremap: {
        center: [104.1064453125, 37.54457732085582],
        zoom: 5,
        view: 'Auto',
        language: 'en-US',
        authOptions: {
          authType: AuthenticationType.subscriptionKey,
          subscriptionKey: 'your subscriptionKey',
        },
      },
      series: [],
    }
    const chart = echarts.init(ref.current);
    chart.setOption(option);
  }
  useEffect(() => {
    loadMap();
  }, []);
  return <div ref={ref} style={{ width: '100%', height: '80vh' }}></div>;
}
```

## eg: use anonymous and clientId

```javascript
// app.ts or index.js
import "azure-maps-control/dist/atlas.min.css";

// page.tsx
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { AuthenticationType } from 'azure-maps-control';

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const loadMap = () => {
    const option = {
       azuremap: {
        center: [104.1064453125, 37.54457732085582],
        zoom: 5,
        view: 'Auto',
        language: 'en-US',
        authOptions: {
          authType: AuthenticationType.anonymous,
          clientId: 'your client id',
          getToken: function (resolve, reject, map) {
            //URL to your authentication service that retrieves an Microsoft Entra ID Token.
            const tokenServiceUrl = 'https://your-backend-server/api/GetAzureMapsToken';
            fetch(tokenServiceUrl).then(r => r.text()).then(token => resolve(token));
          },
        },
      },
      series: [],
    }
    const chart = echarts.init(ref.current);
    chart.setOption(option);
  }
  useEffect(() => {
    loadMap();
  }, []);
  return <div ref={ref} style={{ width: '100%', height: '80vh' }}></div>;
}
```

## Examples

#### FlyChart [examples/fly.html](https://github.com/andybuibui/echarts-extension-azure-map/blob/main/examples/fly.html)
![image](https://github.com/user-attachments/assets/3af869ef-60a2-4c66-86f7-a0576bcfaa71)

### Heart Chart [examples/heatmap.html](https://github.com/andybuibui/echarts-extension-azure-map/blob/main/examples/heatmap.html)
![image](https://github.com/user-attachments/assets/2013714a-b5da-44f8-9f2a-146c9983a771)

#### Line Chart [examples/line.html](https://github.com/andybuibui/echarts-extension-azure-map/blob/main/examples/line.html)
![image](https://github.com/user-attachments/assets/402e1268-2ea6-409c-80f6-7e928f385dc5)

#### Pie Chart for echarts < 5.4.0 [examples/pie-echart@4.html](https://github.com/andybuibui/echarts-extension-azure-map/blob/main/examples/pie-echart%404.html)
![image](https://github.com/user-attachments/assets/e9680876-4bb0-4d6f-b133-74524919b79a)

#### Pie Chart for echarts >= 5.4.0 [examples/pie-echart@5.html](https://github.com/andybuibui/echarts-extension-azure-map/blob/main/examples/pie-echart%405.html)
![image](https://github.com/user-attachments/assets/72117a8d-e282-4568-ac17-6d2408285a33)

#### Scatter Chart [examples/scatter.html](https://github.com/andybuibui/echarts-extension-azure-map/blob/main/examples/scatter.html)
![image](https://github.com/user-attachments/assets/9a6861ad-1927-4618-bf56-1b7066a646ff)

## More Links
- [echarts-extension-bingmaps](https://github.com/andybuibui/echarts-extension-bingmaps)
- [echarts-extension-amap](https://github.com/plainheart/echarts-extension-amap)
- [echarts-extension-gmap](https://github.com/plainheart/echarts-extension-gmap)
- [echarts-extension-bmap](https://github.com/apache/echarts/blob/master/extension-src/bmap/bmap.ts)

## Contributing

Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.

## Creators ✨

<!-- CREATORS:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td style="text-align: center; vertical-align: middle;">
      <a href="https://github.com/andybuibui"
        ><img
          src="https://avatars.githubusercontent.com/u/23742065?v=4"
          width="100px;"
          alt=""
        /><br /><sub><b>andybuibui</b></sub></a
      >
    </td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- CREATORS:END -->

## License

[MIT](https://choosealicense.com/licenses/mit/)
