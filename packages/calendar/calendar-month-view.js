import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {shade, readableColor} from 'polished';
import EventWrapper from './event-wrapper';

const bgStyles = {
  prev: 'rgba(166, 168, 179, 0.08)',
  current: 'none',
  next: 'rgba(166, 168, 179, 0.08)'
};

const WeekBlock = styled.div({
  display: 'grid',
  gridTemplateColumns: '50px repeat(7, 1fr)',
  gridTemplateRows: '26px repeat(3, 1fr)',
  gridAutoFlow: 'row dense',
  borderBottom: '1px solid rgba(166, 168, 179, 0.12)',
  height: '104px'
});

const Event = styled.div(
  {
    padding: '2px 3px',
    color: '#fc9b10',
    alignSelf: 'center',
    fontSize: '12px',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    height: '18px',
    zIndex: '1'
  },
  props => ({
    gridColumnStart: props.col,
    gridColumnEnd: `span ${props.span}`,
    background: props.color || '#fef0db',
    color: `${
      props.color
        ? readableColor(shade(0.2, props.color))
        : readableColor('#fc9b10')
    }`,
    borderLeft: `2px solid ${props.color ? shade(0.2, props.color) : '#fdb44d'}`
  })
);

const DayNumber = styled.div(
  {
    position: 'relative',
    gridRow: '1',
    width: '100%',
    padding: '5px 5px 0 0',
    textAlign: 'right',
    letterSpacing: '1px',
    fontSize: '14px',
    boxSizing: 'border-box',
    color: '#98a0a6',
    height: '104px',
    pointerEvents: 'none',
    borderRight: '1px solid rgba(166, 168, 179, 0.12)'
  },
  props => ({
    gridColumn: props.col,
    backgroundColor: bgStyles[props.bgStyle]
  })
);

const WeekNumber = styled.div(
  {
    borderRight: '1px solid rgba(166, 168, 179, 0.12)',
    pointerEvents: 'none',
    gridRowStart: '1',
    gridRowEnd: '5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    color: '#98a0a6'
  },
  props => ({
    gridColumn: props.column
  })
);

const Month = props => [
  props.monthData.map((week, index) => (
    <WeekBlock>
      <WeekNumber column={1}>{props.weekNumber + index}</WeekNumber>
      {week.map((day, index) => {
        const events = [
          <DayNumber col={index + 2} bgStyle={day[2]}>
            {day[0]}
          </DayNumber>
        ];
        if (day[3] !== undefined) {
          day[3].map(event => {
            events.push(
              <Event
                col={index + 2}
                span={event.event_length}
                color={event.color}
              >
                <EventWrapper event={event}>
                  {event.start_time} {event.name}
                </EventWrapper>
              </Event>
            );
          });
        }

        return events;
      })}
    </WeekBlock>
  ))
];

Month.propTypes = {
  year: PropTypes.number.isRequired,
  weekNumber: PropTypes.number.isRequired,
  month: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  valueMethod: PropTypes.string.isRequired,
  monthData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array).isRequired)
    .isRequired,
  monthEvents: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.array).isRequired)
    .isRequired,
  changeMonth: PropTypes.func.isRequired,
  today: PropTypes.array.isRequired
};

export default Month;
