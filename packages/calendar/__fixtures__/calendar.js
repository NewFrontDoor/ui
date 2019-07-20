import CalendarWrapper from '../src';
// eslint-disable-next-line import/extensions
import elvantoEvents from '../src/elvanto-wrapper';
import events from './events.json';

export default {
  component: CalendarWrapper,
  props: {
    events,
    initialView: 'week'
  }
};
