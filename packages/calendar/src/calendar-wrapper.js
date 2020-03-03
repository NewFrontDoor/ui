import React from 'react';
import PropTypes from 'prop-types';
import {getWeekOfMonth, startOfMonth} from 'date-fns';
import Calendar from './calendar';
import CalendarDispatch from './utilities/calendar-dispatch-provider';
import useCalendarEvents from './use-calendar-events';

const CalendarWrapper = ({client, initialView, isViewFixed, handleNav}) => {
  const [
    {calendarData, currentDate, calendarView},
    status,
    ,
    dispatch
  ] = useCalendarEvents(initialView, client);

  return (
    <CalendarDispatch.Provider value={dispatch}>
      {status === 'loading' ? (
        <div>loading...</div>
      ) : (
        <Calendar
          calendarView={calendarView}
          calendarData={calendarData}
          isViewFixed={isViewFixed}
          weekNumber={getWeekOfMonth(currentDate)}
          startOfMonth={startOfMonth(currentDate)}
          handleNav={handleNav}
        />
      )}
    </CalendarDispatch.Provider>
  );
};

CalendarWrapper.propTypes = {
  initialView: PropTypes.oneOf(['day', 'week', 'month']).isRequired,
  client: PropTypes.shape({fetchEvents: PropTypes.func.isRequired}).isRequired,
  isViewFixed: PropTypes.bool
};

CalendarWrapper.defaultProps = {
  isViewFixed: false
};

export default CalendarWrapper;
