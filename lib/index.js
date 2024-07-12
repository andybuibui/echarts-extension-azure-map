import AzureMapCoordSys from './AzureMapCoordSys';
import AzureMapModel from './AzureMapModel';
import AzureMapView from './AzureMapView';
import { ACTION_TYPE, COMPONENT_TYPE, ecVer, isNewEC } from './helper';

export { name, version } from '../package.json';

export function install(registers) {
  // add coordinate system support for pie series for ECharts < 5.4.0
  if (!isNewEC || (ecVer[0] === 5 && ecVer[1] < 4)) {
    registers.registerLayout(function (ecModel) {
      ecModel.eachSeriesByType('pie', function (seriesModel) {
        const coordSys = seriesModel.coordinateSystem;
        const data = seriesModel.getData();
        const valueDim = data.mapDimension('value');
        if (coordSys && coordSys.type === COMPONENT_TYPE) {
          const center = seriesModel.get('center');
          const point = coordSys.dataToPoint(center);
          const cx = point[0];
          const cy = point[1];
          data.each(valueDim, function (_value, idx) {
            const layout = data.getItemLayout(idx);
            layout.cx = cx;
            layout.cy = cy;
          });
        }
      });
    });
  }
  // Model
  isNewEC
    ? registers.registerComponentModel(AzureMapModel)
    : registers.extendComponentModel(AzureMapModel);
  // View
  isNewEC
    ? registers.registerComponentView(AzureMapView)
    : registers.extendComponentView(AzureMapView);
  // Coordinate System
  registers.registerCoordinateSystem(COMPONENT_TYPE, AzureMapCoordSys);
  // Action
  registers.registerAction(
    {
      type: ACTION_TYPE,
      event: ACTION_TYPE,
      update: 'updateLayout',
    },
    function (_payload, ecModel) {
      ecModel.eachComponent(COMPONENT_TYPE, function (azMapModel) {
        const azmap = azMapModel.getAzureMap();
        const center = azmap.getCamera().center;
        const zoom = azmap.getCamera().zoom;
        azMapModel.setCenterAndZoom(center, zoom);
      });
    },
  );
}
