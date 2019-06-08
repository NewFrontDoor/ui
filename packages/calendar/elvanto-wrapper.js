import PropTypes from 'prop-types';
import {addHours} from 'date-fns';

export default function elvantoEvents(events) {
  console.log(events);
  const normalisedEvents = events.map(event => {
    const normalisedEvent = {
      ...event,
      start_date: addHours(new Date(event.start_date), 10),
      end_date: addHours(new Date(event.end_date), 10)
    };
    return normalisedEvent;
  });
  console.log(normalisedEvents);
  return normalisedEvents;
}

elvantoEvents.propTypes = {
  events: PropTypes.object.isRequired
};
