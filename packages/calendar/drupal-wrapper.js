import React from 'react';
import PropTypes from 'prop-types';
import CalendarParent from './calendar-parent';
import {useFetch} from './utilities/hooks';

export default function DrupalEvents({url, initialView}) {
  const [data, loading, error] = useFetch(url);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const normalisedEvents = data.map(event => {
    const normalisedEvent = {
      calendar_id: event.nid,
      ...event
    };
    return normalisedEvent;
  });

  return <CalendarParent events={normalisedEvents} initialView={initialView} />;
}

DrupalEvents.propTypes = {
  url: PropTypes.string.isRequired,
  initialView: PropTypes.oneOf(['day', 'week', 'month'])
};

DrupalEvents.defaultProps = {
  initialView: 'month'
};
