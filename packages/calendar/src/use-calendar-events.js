import {useState, useEffect, useReducer} from 'react';
import {
  addMonths,
  subMonths,
  addWeeks,
  addDays,
  subDays,
  subWeeks
} from 'date-fns';

import {buildCalendarData} from './utilities/date-utils-grid';

function reducer(state, action) {
  switch (action.type) {
    case 'see-more':
      return {
        ...state,
        currentDate: action.date,
        calendarView: 'week'
      };
    case 'set-view':
      return {
        ...state,
        calendarView: action.view
      };
    case 'today':
      return {
        ...state,
        currentDate: new Date()
      };
    case 'set-date':
      return {
        ...state,
        currentDate: action.date
      };
    case 'decrement-year':
      return {
        ...state,
        currentDate: subMonths(state.currentDate, 12)
      };
    case 'decrement-month':
      return {
        ...state,
        currentDate: subMonths(state.currentDate, 1)
      };
    case 'decrement-week':
      return {
        ...state,
        currentDate: subWeeks(state.currentDate, 1)
      };
    case 'decrement-day':
      return {
        ...state,
        currentDate: subDays(state.currentDate, 1)
      };
    case 'increment-day':
      return {
        ...state,
        currentDate: addDays(state.currentDate, 1)
      };
    case 'increment-week':
      return {
        ...state,
        currentDate: addWeeks(state.currentDate, 1)
      };
    case 'increment-month':
      return {
        ...state,
        currentDate: addMonths(state.currentDate, 1)
      };
    case 'increment-year':
      return {
        ...state,
        currentDate: addMonths(state.currentDate, 12)
      };
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
}

function init(calendarView) {
  return {
    calendarView,
    currentDate: new Date()
  };
}

function useCalendarEvents(initialView, client) {
  const [{currentDate, calendarView}, dispatch] = useReducer(
    reducer,
    initialView,
    init
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    client
      .fetchEvents(currentDate)
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error(error);
        setError(`Failed to load calendar events`);
      })
      .finally(() => setLoading(false));
  }, [client, currentDate]);

  const calendarData = buildCalendarData(calendarView, currentDate, data);

  return [{calendarData, currentDate, calendarView}, loading, error, dispatch];
}

export default useCalendarEvents;
