import * as atlas from 'azure-maps-control';
import { graphic, matrix, util as zrUtil } from 'echarts';
import { COMPONENT_TYPE } from './helper';
function dataToCoordSize(dataSize, dataItem) {
  const finalDataItem = dataItem || [0, 0];
  return zrUtil.map(
    [0, 1],
    function (dimIdx) {
      const val = finalDataItem[dimIdx];
      const halfSize = dataSize[dimIdx] / 2;
      const p1 = [];
      const p2 = [];
      p1[dimIdx] = val - halfSize;
      p2[dimIdx] = val + halfSize;
      p1[1 - dimIdx] = p2[1 - dimIdx] = finalDataItem[1 - dimIdx];
      return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
    },
    this,
  );
}

function AzureMapCoordSys(azuremap, api) {
  this._azuremap = azuremap;
  this.dimensions = ['lng', 'lat'];
  this._mapOffset = [0, 0];
  this._api = api;
}

const AzureMapCoordSysProto = AzureMapCoordSys.prototype;

AzureMapCoordSysProto.type = COMPONENT_TYPE;

AzureMapCoordSysProto.dimensions = ['lng', 'lat'];

AzureMapCoordSysProto.setZoom = function (zoom) {
  this._zoom = zoom;
};

AzureMapCoordSysProto.setCenter = function (center) {
  //Format coordinates as longitude, latitude.
  const latlng = atlas.data.Position.fromLatLng(center[0], center[1]);
  // Represent a pixel coordinate or offset. Extends an array of [x, y].
  const [x, y] = this._azuremap.positionsToPixels([latlng])[0];
  this._center = { x, y };
};

AzureMapCoordSysProto.setMapOffset = function (mapOffset) {
  this._mapOffset = mapOffset;
};

AzureMapCoordSysProto.setAzureMap = function (azmap) {
  this._azuremap = azmap;
};

AzureMapCoordSysProto.getAzureMap = function () {
  return this._azuremap;
};

AzureMapCoordSysProto.dataToPoint = function (data) {
  const latlng = atlas.data.Position.fromLatLng(data);
  const [x, y] = this._azuremap.positionsToPixels([latlng])[0];
  const mapOffset = this._mapOffset;
  return [x - mapOffset[0], y - mapOffset[1]];
};

AzureMapCoordSysProto.pointToData = function (pt) {
  const mapOffset = this._mapOffset;
  // https://learn.microsoft.com/zh-cn/javascript/api/azure-maps-control/atlas.map?view=azure-maps-typescript-latest#azure-maps-control-atlas-map-pixelstopositions
  const [lat, lng] = this._azuremap.pixelsToPositions([
    new atlas.Pixel(pt[0] + mapOffset[0], pt[1] + mapOffset[1]),
  ])[0];
  return [lng, lat];
};

AzureMapCoordSysProto.getViewRect = function () {
  const api = this._api;
  return new graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight());
};

AzureMapCoordSysProto.getRoamTransform = function () {
  return matrix.create();
};

AzureMapCoordSysProto.prepareCustoms = function () {
  const rect = this.getViewRect();
  return {
    coordSys: {
      // The name exposed to user is always 'cartesian2d' but not 'grid'.
      type: COMPONENT_TYPE,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    },
    api: {
      coord: zrUtil.bind(this.dataToPoint, this),
      size: zrUtil.bind(dataToCoordSize, this),
    },
  };
};

AzureMapCoordSysProto.convertToPixel = function (_ecModel, _finder, value) {
  // here we ignore finder as only one azuremap component is allowed
  return this.dataToPoint(value);
};

AzureMapCoordSysProto.convertFromPixel = function (_ecModel, _finder, value) {
  return this.pointToData(value);
};

// For deciding which dimensions to use when creating list data
AzureMapCoordSys.dimensions = AzureMapCoordSysProto.dimensions;

// let Overlay;
AzureMapCoordSys.create = function (ecModel, api) {
  let azureMapCoordSys;
  const root = api.getDom();

  ecModel.eachComponent(COMPONENT_TYPE, function (azuremapModel) {
    const painter = api.getZr().painter;
    const viewportRoot = painter.getViewportRoot();
    // Overlay =
    //   Overlay ||
    //   new atlas.layer.WebGLLayer('ec-map-layer', {
    //     renderer: {
    //       onAdd: function (mapInstance) {
    //         mapInstance.getCanvasContainer().appendChild(viewportRoot);
    //       },
    //       render: function () {},
    //     },
    //   });
    if (azureMapCoordSys) {
      throw new Error('Only one azuremap component can exist');
    }
    let azuremap = azuremapModel.getAzureMap();
    if (!azuremap) {
      let azuremapRoot = root.querySelector('.ec-extension-azure-map');
      viewportRoot.className = 'azure-ec-layer';
      viewportRoot.style.pointerEvents = 'auto';
      viewportRoot.style.position = 'absolute';
      viewportRoot.style.display = 'none';
      viewportRoot.style.left = '0px';
      viewportRoot.style.top = '0px';
      if (azuremapRoot) {
        viewportRoot.style.left = '0px';
        viewportRoot.style.top = '0px';
        root.removeChild(azuremapRoot);
      }
      azuremapRoot = document.createElement('div');
      azuremapRoot.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;';
      azuremapRoot.className = 'ec-extension-azure-map';

      root.appendChild(azuremapRoot);

      let mapOptions = azuremapModel.get();
      if (mapOptions) {
        mapOptions = zrUtil.clone(mapOptions);
      }
      azuremap = new atlas.Map(azuremapRoot, mapOptions);
      azuremapModel.setAzureMap(azuremap);
      azuremap.events.add('ready', function () {
        azuremap.getCanvasContainer().appendChild(viewportRoot);
        viewportRoot.style.display = '';
        // azuremap.layers.add(Overlay);
      });

      // Override
      painter.getViewportRootOffset = function () {
        return { offsetLeft: 0, offsetTop: 0 };
      };
    }
    // Set azuremap options
    // centerAndZoom before layout and render
    const center = azuremapModel.get('center');
    const zoom = azuremapModel.get('zoom');
    if (center && zoom) {
      const azuremapCenter = azuremap.getCamera().center;
      const azuremapZoom = azuremap.getCamera().zoom;
      const centerOrZoomChanged = azuremapModel.centerOrZoomChanged(azuremapCenter, azuremapZoom);
      if (centerOrZoomChanged) {
        azuremap.setCamera({ center, zoom });
      }
    }

    azureMapCoordSys = new AzureMapCoordSys(azuremap, api);
    azureMapCoordSys.setMapOffset(azuremapModel.__mapOffset || [0, 0]);
    azureMapCoordSys.setZoom(zoom);
    azureMapCoordSys.setCenter(center);
    azuremapModel.coordinateSystem = azureMapCoordSys;
  });

  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === COMPONENT_TYPE) {
      seriesModel.coordinateSystem = azureMapCoordSys;
    }
  });

  return azureMapCoordSys && [azureMapCoordSys];
};

export default AzureMapCoordSys;
