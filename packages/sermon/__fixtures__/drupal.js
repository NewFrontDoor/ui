import React from 'react';
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

export default {
  'latest sermon': <LatestSermonContainerDrupal />,
  'current series': <CurrentSeriesContainerDrupal />,
  'recent series': <RecentSeriesContainerDrupal />,
  'series sermon list': <SeriesSermonListContainerDrupal />
};
