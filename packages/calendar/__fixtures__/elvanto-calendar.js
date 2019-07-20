import Calendar, {elvantoClient} from '../src';

const apiUrl =
  'https://cornerstoneapi.newfrontdoor.org/api/views/all_events_api';

export default {
  component: Calendar,
  props: {
    client: elvantoClient(apiUrl),
    initialView: 'month'
  }
};
