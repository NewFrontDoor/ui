import Elderswrapper from '../elders-wrapper';
export default {
  component: Elderswrapper,
  props: {
    apiUrl: 'https://cornerstoneapi.newfrontdoor.org/api/people',
    apiParams: {
      role: 'elders'
    }
  }
};
