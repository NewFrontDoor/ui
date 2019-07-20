import Calendar, {drupalClient} from '../src';

const apiUrl =
  'https://cornerstoneapi.newfrontdoor.org/api/views/all_events_api';

export default {
  component: Calendar,
  props: {
    client: drupalClient(apiUrl),
    initialView: 'month'
  }
};
