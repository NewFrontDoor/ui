import LatestSermonContainerDrupal from '../latest-sermon-container-drupal.js'
import config from 'react-global-configuration';
config.set({
    DRUPAL_BASE_API_URL: 'https://cornerstoneapi.newfrontdoor.org/api/views/'
})

export default {
    component: LatestSermonContainerDrupal
};