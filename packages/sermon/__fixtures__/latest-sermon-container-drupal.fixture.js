import config from 'react-global-configuration';
import {LatestSermonContainerDrupal} from '../src';

config.set({
  DRUPAL_BASE_API_URL: 'https://cornerstoneapi.newfrontdoor.org/api/views/'
});

export default {
  component: LatestSermonContainerDrupal
};
