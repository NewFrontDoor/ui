import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {shade, readableColor} from 'polished';
import {format, differenceInHours} from 'date-fns';
import EventWrapper from './components/event-wrapper';

const WeekBlock = styled.div({
  display: 'grid',
  gridTemplateColumns: '40px 10px repeat(7, 1fr)',
  gridTemplateRows: 'repeat(38, 15px)',
  gridAutoFlow: 'column dense',
  borderBottom: '1px solid rgba(166, 168, 179, 0.12)',
  height: '570px'
});

const Event = styled.div(
  {
    padding: '2px 3px 0px 2px',
    color: '#fc9b10',
    fontSize: '12px',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    zIndex: '1',
    ':hover, :focus': {
      gridColumn: 'span 10'
    }
  },
  props => ({
    gridRow: `${props.row} / span ${props.rowspan}`,
    background: props.color || '#fef0db',
    color: `${
      props.color
        ? readableColor(shade(0.2, props.color))
        : readableColor('#fc9b10')
    }`,
    borderLeft: `2px solid ${props.color ? shade(0.2, props.color) : '#fdb44d'}`
  })
);

const HourDisplay = styled.div(
  {
    position: 'relative',
    gridColumn: '1',
    width: '100%',
    textAlign: 'right',
    lineHeight: '58px',
    letterSpacing: '1px',
    fontSize: '14px',
    boxSizing: 'border-box',
    color: '#98a0a6',
    height: '30px',
    pointerEvents: 'none',
    fontVariant: 'small-caps'
  },
  props => ({
    gridRowStart: props.row,
    gridRowEnd: `span ${props.row + 1}`
  })
);
const HourGridline = styled.div(
  {
    position: 'relative',
    gridColumn: '2',
    width: '100vw',
    pointerEvents: 'none',
    borderRight: '1px solid rgba(166, 168, 179, 0.12)',
    borderBottom: '1px solid rgba(166, 168, 179, 0.12)'
  },
  props => ({
    gridRow: props.row
  })
);

const Day = styled.div(
  {
    display: 'grid',
    position: 'relative',
    gridRow: '2 / 38',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'repeat(38, 15px)'
  },
  props => ({
    gridColumn: `${props.col} / span 1`
  })
);

const DayNumber = styled.div(
  {
    width: '100%',
    textAlign: 'center',
    letterSpacing: '1px',
    fontSize: '20px',
    color: '#98a0a6',
    gridRow: '1 / 2',
    height: '570px',
    borderLeft: '1px solid rgba(166, 168, 179, 0.12)'
  },
  props => ({
    gridColumn: `${props.col} / span 1`
  })
);

const hours = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm'
];

const Week = ({calendarData}) => {
  const week = calendarData;

  return (
    <WeekBlock>
      {week.map(({events, date, isPeripheral}, index) => {
        const day = format(date, 'dd');
        return (
          <React.Fragment key={day}>
            <DayNumber col={index + 3}>{day}</DayNumber>
            <Day col={index + 3} isPeripheral={isPeripheral}>
              {events.map(event => {
                const startRow =
                  parseInt(format(event.start_date, 'H'), 10) * 2 +
                  (parseInt(format(event.start_date, 'm'), 10) >= 30 ? 1 : 0);
                if (event.event_length > 1) {
                  return;
                }

                return (
                  <Event
                    key={event.id}
                    row={startRow - 9}
                    rowspan={
                      differenceInHours(event.end_date, event.start_date) + 2
                    }
                    color={event.color}
                    role="button"
                  >
                    <EventWrapper event={event}>{event.name}</EventWrapper>
                  </Event>
                );
              })}
            </Day>
          </React.Fragment>
        );
      })}
      {hours.map((hour, index) => (
        <>
          <HourDisplay row={index * 2 + 1}>{hour}</HourDisplay>
          <HourGridline row={index * 2 + 2} />
        </>
      ))}
    </WeekBlock>
  );
};

Week.propTypes = {
  calendarData: PropTypes.arrayOf(
    PropTypes.shape({
      week: PropTypes.arrayOf(PropTypes.object),
      weekNumber: PropTypes.number
    })
  ).isRequired
};

export default Week;
