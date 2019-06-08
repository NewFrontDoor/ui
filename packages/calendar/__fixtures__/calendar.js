import Calendar from '..';
// eslint-disable-next-line import/extensions
import events from './events.json';
import elvantoEvents from '../elvanto-wrapper';

export default {
  component: Calendar,
  props: {
    events: elvantoEvents(events),
    initialView: 'month'
  }
};
