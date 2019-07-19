import PropTypes from 'prop-types';
import {useFetch} from './utilities/hooks';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { buildCalendarData } from './utilities/date-utils-grid';

export default function drupalEvents({apiUrl, state, calendarView}) {

  const apiParams = {
    'display_id': 'services_1',
    'date_range_start[value][date]': format(startOfMonth(state.currentDate), 'yyyy/MM/dd'),
    'date_range_end[value][date]': format(endOfMonth(state.currentDate), 'yyyy/MM/dd')
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
      calendar_id: event.nid,
      ...event
    };
    return normalisedEvent;
  });

  return buildCalendarData(calendarView, state.currentDate, normalisedEvents);
}

drupalEvents.propTypes = {
  url: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
};
