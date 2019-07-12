import CalendarWrapper from '..';
// eslint-disable-next-line import/extensions
import events from './events.json';
import elvantoEvents from '../elvanto-wrapper';

export default {
  component: CalendarWrapper,
  props: {
    events: elvantoEvents(events),
    initialView: 'month',
    viewFixed: 'true'
  }
};
