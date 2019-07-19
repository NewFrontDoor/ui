import PropTypes from 'prop-types';
import {useFetch} from './utilities/hooks';
import { startOfMonth, endOfMonth, format } from 'date-fns';

export default function elvantoEvents({apiUrl, state, calendarView}) {

  const apiParams = {
    'start': format(startOfMonth(state.currentDate), 'yyyy-MM-dd'),
    'end': format(endOfMonth(state.currentDate), 'yyyy-MM-dd')
  }

  const [data, loading, error] = useFetch(apiUrl, apiParams);
  
  if (error) {
    return error.message
  }

  if (loading) {
    return 'loading'
  }

  const normalisedEvents = data.map(event => {
    const normalisedEvent = {
      ...event,
      start_date: addHours(new Date(event.start_date), 10),
      end_date: addHours(new Date(event.end_date), 10)
    };
    return normalisedEvent;
  });

  return buildCalendarData(calendarView, state.currentDate, normalisedEvents);
}

elvantoEvents.propTypes = {
  url: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
};
