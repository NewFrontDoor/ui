import React from 'react';
import PropTypes from 'prop-types';
import {useFetch} from './utilities/hooks';
import { startOfMonth, endOfMonth, format } from 'date-fns';

export default function drupalEvents({apiUrl, state}) {

  const apiParams = {
    'display_id': 'services_1',
    'date_range_start[value][date]': format(startOfMonth(state.currentDate), 'yyyy/MM/dd'),
    'date_range_end[value][date]': format(endOfMonth(state.currentDate), 'yyyy/MM/dd')
  }

  console.log(apiParams);

  const [data, loading, error] = useFetch(apiUrl, apiParams);
  if (error) {
    return error.message
  }

  if (loading) {
    return 'loading'
  }

  console.log(data);

  const normalisedEvents = data.map(event => {
    const normalisedEvent = {
      calendar_id: event.nid,
      ...event
    };
    return normalisedEvent;
  });

  return normalisedEvents;
}

drupalEvents.propTypes = {
  url: PropTypes.string.isRequired,
  initialView: PropTypes.oneOf(['day', 'week', 'month'])
};

drupalEvents.defaultProps = {
  initialView: 'month'
};
