import React, {useReducer, useState} from 'react';
import PropTypes from 'prop-types';
import {addMonths, subMonths} from 'date-fns';
import styled from '@emotion/styled';
import {monthBuilder} from './utilities/date-utils-grid';
import Month from './calendar-month-view';
import Week from './calendar-week-view';
import Day from './calendar-day-view';
import CalendarControls from './components/calendar-controls';
import CalendarDispatch from './utilities/calendar-dispatch-provider';

const CalendarContainer = styled.div({
  background: '#f5f7fa',
  boxSizing: 'border-box',
  fontFamily: "Montserrat, 'sans-serif'",
  color: '#51565d'
});

const CalendarHeader = styled.div({
  display: 'grid',
  gridTemplateColumns: '50px repeat(7, 1fr)',
  gridTemplateRows: '1fr',
  gridGap: '0rem',
  height: '50px',
  alignItems: 'center',
  textAlign: 'center',
  borderBottom: '1px solid rgba(166, 168, 179, 0.12)',
  lineHeight: '50px',
  fontWeight: '500',
  fontSize: '12px',
  textTransform: 'uppercase',
  color: '#99a1a7'
});

function reducer(state, action) {
  let currentDate;
  switch (action.type) {
    case 'today':
      currentDate = new Date();
      break;
    case 'decrement-year':
      currentDate = subMonths(state.currentDate, 12);
      break;
    case 'decrement-month':
      currentDate = subMonths(state.currentDate, 1);
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
    ...state,
    currentDate,
    monthData: monthBuilder(currentDate, state.events)
  };
}

function init(events) {
  const currentDate = new Date();

  return {
    currentDate,
    events,
    calendarView: 'month',
    monthData: monthBuilder(currentDate, events)
    // A monthEvents: eventArrayBuilder(events)
  };
}

const views = {
  day: Day,
  week: Week,
  month: Month
};

export default function CalendarParent({events}) {
  const [calendarView, setCalendarView] = useState('month');
  const [state, dispatch] = useReducer(reducer, events, init);

  const CalendarView = views[calendarView];

  return (
    <CalendarDispatch.Provider value={dispatch}>
      <CalendarContainer>
        <CalendarControls
          location="top"
          currentDate={state.currentDate}
          calendarView={calendarView}
          setCalendarView={setCalendarView}
          input={Object.keys(views)}
        />
        <CalendarHeader>
          <div>Wk</div>
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </CalendarHeader>
        <CalendarView
          calendarView={calendarView}
          monthData={state.monthData}
          monthEvents={state.monthEvents}
          weekNumber={state.weekNumber}
        />
      </CalendarContainer>
    </CalendarDispatch.Provider>
  );
}

CalendarParent.propTypes = {
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
