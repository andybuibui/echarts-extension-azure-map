import { ComponentModel } from 'echarts';
import { COMPONENT_TYPE, isNewEC, v2Equal } from './helper';

const AzureMapModel = {
  type: COMPONENT_TYPE,
  setAzureMap: function (azuremap) {
    this.__azuremap = azuremap;
  },
  getAzureMap: function () {
    // __azuremap is injected when creating AzureMapCoordSys
    return this.__azuremap;
  },
  setEChartsLayer: function (layer) {
    this.__echartsLayer = layer;
  },
  getEChartsLayer: function () {
    return this.__echartsLayer;
  },
  setCenterAndZoom: function (center, zoom) {
    this.option.center = center;
    this.option.zoom = zoom;
  },
  centerOrZoomChanged: function (center, zoom) {
    const option = this.option;
    return !(v2Equal(center, option.center) && zoom === option.zoom);
  },
  defaultOption: {
    view: 'Auto',
    center: [104.1064453125, 37.54457732085582],
    zoom: 5,
  },
};

export default isNewEC ? ComponentModel.extend(AzureMapModel) : AzureMapModel;
