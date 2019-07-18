import React from 'react';
import PropTypes from 'prop-types';
import CalendarWrapper from './calendar-wrapper';
import {useFetch} from './utilities/hooks';

export default function DrupalEvents({apiUrl, apiParams, initialView, viewFixed}) {
  console.log("Loading drupal events");
  const [data, loading, error] = useFetch(apiUrl, apiParams);
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

  return <CalendarWrapper events={normalisedEvents} initialView={initialView} viewFixed={viewFixed} />;
}

DrupalEvents.propTypes = {
  url: PropTypes.string.isRequired,
  initialView: PropTypes.oneOf(['day', 'week', 'month'])
};

DrupalEvents.defaultProps = {
  initialView: 'month'
};
