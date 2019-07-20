import Calendar from '../src';
// eslint-disable-next-line import/extensions
import events from './events.json';

export default {
  component: Calendar,
  props: {
    events,
    initialView: 'week'
  }
};
