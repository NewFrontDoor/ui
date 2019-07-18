import CalendarWrapper from '../src';
// eslint-disable-next-line import/extensions
import events from './events.json';
import elvantoEvents from '../src/elvanto-wrapper';

export default {
  component: CalendarWrapper,
  props: {
    events: elvantoEvents(events),
    initialView: 'month',
    viewFixed: 'true'
  }
};
