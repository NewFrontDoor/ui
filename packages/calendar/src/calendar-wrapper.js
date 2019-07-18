import React, {useCallback, useReducer, useState} from 'react';
import PropTypes from 'prop-types';
import {
  addMonths,
  subMonths,
  addWeeks,
  addDays,
  subDays,
  subWeeks,
  startOfWeek
} from 'date-fns';
import CalendarDispatch from './utilities/calendar-dispatch-provider';

function reducer(state, action) {
  let currentDate;

  switch (action.type) {
    case 'today':
      currentDate = new Date();
      break;
    case 'set-date':
      currentDate = action.date;
      break;
    case 'decrement-year':
      currentDate = subMonths(state.currentDate, 12);
      break;
    case 'decrement-month':
      currentDate = subMonths(state.currentDate, 1);
      break;
    case 'decrement-week':
      currentDate = subWeeks(state.currentDate, 1);
      break;
    case 'decrement-day':
      currentDate = subDays(state.currentDate, 1);
      break;
    case 'increment-day':
      currentDate = addDays(state.currentDate, 1);
      break;
    case 'increment-week':
      currentDate = addWeeks(state.currentDate, 1);
      break;
    case 'increment-month':
      currentDate = addMonths(state.currentDate, 1);
      break;
    case 'increment-year':
      currentDate = addMonths(state.currentDate, 12);
      break;
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }

  return {
    currentDate
  };
}

function init() {
  return {
    currentDate: new Date()
    // A monthEvents: eventArrayBuilder(events)
  };
}

export default function CalendarWrapper({apiUrl, initialView, fetchWrapper, viewFixed}) {
  const [calendarView, setCalendarView] = useState(initialView);
  const [state, dispatch] = useReducer(reducer, {}, init);
  const seeMore = useCallback(
    date => {
      setCalendarView('week');
      dispatch({type: 'set-date', date});
    },
    [setCalendarView, dispatch]
  );

  const calendarData = buildCalendarData(
    calendarView,
    state.currentDate,
    events
  );

  return (
    <CalendarDispatch.Provider value={dispatch}>
      {fetchWrapper(state, calendarView, seeMore, apiUrl, viewFixed)}
    </CalendarDispatch.Provider>
  );
}

CalendarWrapper.propTypes = {
  initialView: PropTypes.oneOf(['day', 'week', 'month']).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      picture: PropTypes.string,
      // eslint-disable-next-line camelcase
      calendar_id: PropTypes.string.isRequired,
      interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      admin_notes: PropTypes.string,
      where: PropTypes.string,
      // eslint-disable-next-line camelcase
      start_date: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      end_date: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      all_day: PropTypes.number.isRequired,
      url: PropTypes.string,
      color: PropTypes.string,
      locations: PropTypes.object
    })
  ).isRequired
};
