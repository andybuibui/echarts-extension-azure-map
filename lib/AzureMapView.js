import { ComponentView } from 'echarts';
import { ACTION_TYPE, COMPONENT_TYPE, isNewEC } from './helper';

const AzureMapView = {
  type: COMPONENT_TYPE,
  render: function (azMapModel, ecModel, api) {
    let rendering = true;

    const azmap = azMapModel.getAzureMap();
    const viewportRoot = api.getZr().painter.getViewportRoot();
    const coordSys = azMapModel.coordinateSystem;
    const moveHandler = function () {
      if (rendering) {
        return;
      }
      const offsetEl = azmap.getMapContainer();
      const mapOffset = [
        -parseInt(offsetEl.style.left, 10) || 0,
        -parseInt(offsetEl.style.top, 10) || 0,
      ];
      const viewportRootStyle = viewportRoot.style;
      const offsetLeft = `${mapOffset[0]}px`;
      const offsetTop = `${mapOffset[1]}px`;
      if (viewportRootStyle.left !== offsetLeft) {
        viewportRootStyle.left = offsetLeft;
      }
      if (viewportRootStyle.top !== offsetTop) {
        viewportRootStyle.top = offsetTop;
      }
      coordSys.setMapOffset(mapOffset);
      azMapModel.__mapOffset = mapOffset;
      api.dispatchAction({
        type: ACTION_TYPE,
        animation: {
          duration: 0,
        },
      });
    };

    function zoomEndHandler() {
      if (rendering) {
        return;
      }
      api.dispatchAction({
        type: ACTION_TYPE,
        animation: {
          duration: 0,
        },
      });
    }

    azmap.events.remove('move', this._oldMoveHandler);
    azmap.events.remove('moveend', this._oldMoveHandler);
    azmap.events.remove('zoomend', this._oldZoomEndHandler);

    azmap.events.add('move', moveHandler);
    azmap.events.add('moveend', moveHandler);
    azmap.events.add('zoomend', zoomEndHandler);

    this._oldMoveHandler = moveHandler;
    this._oldZoomEndHandler = zoomEndHandler;
    rendering = false;
  },
  dispose: function () {
    const component = this.__model;
    delete this._oldMoveHandler;
    delete this._oldZoomEndHandler;
    if (component) {
      component.getAzureMap().dispose();
      component.setAzureMap(null);
      component.getEChartsLayer(null);
      if (component.coordinateSystem) {
        component.coordinateSystem.setAzureMap(null);
        component.coordinateSystem = null;
      }
    }
  },
};

export default isNewEC ? ComponentView.extend(AzureMapView) : AzureMapView;
