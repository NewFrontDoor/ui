import config from 'react-global-configuration';
import {
  LatestSermonContainerDrupal,
  CurrentSeriesContainerDrupal,
  RecentSeriesContainerDrupal,
  SeriesSermonListContainerDrupal
} from '../src';

config.set({
  DRUPAL_BASE_API_URL: 'https://cornerstoneapi.newfrontdoor.org/api/views/'
});

export default [
  {
    component: LatestSermonContainerDrupal
  },
  {
    component: CurrentSeriesContainerDrupal
  },
  {
    component: RecentSeriesContainerDrupal
  },
  {
    component: SeriesSermonListContainerDrupal
  }
];
