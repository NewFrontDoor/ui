import PropTypes from 'prop-types';

export default function DrupalEvents({events}) {
  const normalisedEvents = events.map(event => {
    const normalisedEvent = {
      ...event,
      calendar_id: event.nid
    };
    return normalisedEvent;
  });

  return normalisedEvents;
}

DrupalEvents.propTypes = {
  events: PropTypes.object.isRequired
};
