import Calendar from '../src';
// eslint-disable-next-line import/extensions
import events from './events.json';

export default {
  component: Calendar,
  props: {
    client: {
      fetchEvents() {
        return Promise.resolve(events);
      }
    },
    initialView: 'week'
  }
};
