import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './calendar';
import {useFetch} from './utilities/hooks';
import {buildCalendarData} from './utilities/date-utils-grid';
import { startOfMonth, endOfMonth } from 'date-fns'

export default function DrupalEvents({state, calendarView, seeMore, apiUrl, viewFixed}) {
  const apiParams = apiParams={
    'display_id': 'services_1',
    'date_range_start[value][date]': startOfMonth(state.currentDate),
    'date_range_end[value][date]': endOfMonth(state.currentDate)
  }
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

  return <Calendar
        calendarView={calendarView}
        viewFixed={viewFixed}
        state={state}
        seeMore={seeMore}
        calendarData={buildCalendarData(calendarView, state.currentDate, normalisedEvents)}
        startOfWeek={startOfWeek(state.currentDate)}
      />
}

DrupalEvents.propTypes = {
  url: PropTypes.string.isRequired,
  initialView: PropTypes.oneOf(['day', 'week', 'month'])
};

DrupalEvents.defaultProps = {
  initialView: 'month'
};
