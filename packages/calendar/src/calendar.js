import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Month from './calendar-month-view';
import Week from './calendar-week-view';
import Day from './calendar-day-view';
import CalendarControls from './components/calendar-controls';

const CalendarContainer = styled.div({
  boxSizing: 'border-box',
  fontFamily: "Montserrat, 'sans-serif'",
  color: '#51565d',
  lineHeight: '1em'
});

const CalendarHeader = styled.div(
  {
    display: 'grid',
    gridTemplateColumns: '50px repeat(7, 1fr)',
    gridTemplateRows: '1fr',
    gridGap: '0rem',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#99a1a7',
    background: '#f5f7fa'
  },
  props =>
    props.calendarView === 'month'
      ? {
          lineHeight: '50px',
          height: '50px',
          borderBottom: '1px solid rgba(166, 168, 179, 0.12)'
        }
      : ''
);

const views = {
  day: Day,
  week: Week,
  month: Month
};

export default function Calendar({
  calendarView,
  calendarData,
  weekNumber,
  startOfWeek,
  isViewFixed
}) {
  const CalendarView = views[calendarView];

  return (
    <CalendarContainer>
      <CalendarControls
        location="top"
        startOfWeek={startOfWeek}
        calendarView={calendarView}
        isViewFixed={isViewFixed}
        input={Object.keys(views)}
      />
      {calendarView === 'day' ? (
        ''
      ) : (
        <CalendarHeader calendarView={calendarView}>
          <div>{calendarView === 'month' ? 'Wk' : ''}</div>
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </CalendarHeader>
      )}

      <CalendarView
        calendarView={calendarView}
        calendarData={calendarData}
        weekNumber={weekNumber}
      />
    </CalendarContainer>
  );
}

Calendar.propTypes = {
  calendarView: PropTypes.string.isRequired,
  calendarData: PropTypes.array.isRequired,
  weekNumber: PropTypes.number.isRequired,
  startOfWeek: PropTypes.instanceOf(Date).isRequired,
  isViewFixed: PropTypes.bool
};

Calendar.defaultProps = {
  isViewFixed: false
};
