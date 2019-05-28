import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {shade, readableColor} from 'polished';
import {format} from 'date-fns';
import EventWrapper from './components/event-wrapper';

const WeekBlock = styled.div({
  display: 'grid',
  gridTemplateColumns: '50px repeat(7, 1fr)',
  gridTemplateRows: '26px repeat(3, 22px)',
  gridAutoFlow: 'column dense',
  borderBottom: '1px solid rgba(166, 168, 179, 0.12)',
  height: '114px',
  overflow: 'hidden',
  position: 'relative'
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
    zIndex: '1',
    display: 'block'
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
    height: '114px',
    pointerEvents: 'none',
    borderRight: '1px solid rgba(166, 168, 179, 0.12)'
  },
  props => ({
    gridColumn: props.col,
    backgroundColor: props.isPeripheral ? 'rgba(166, 168, 179, 0.08)' : 'none'
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

const SeeMore = styled.div(
  {
    fontSize: '12px',
    textAlign: 'right',
    height: '18px',
    padding: '2px 3px',
    alignSelf: 'center',
    gridRow: '5'
  },
  props => ({
    display: props.isVisible,
    gridColumn: props.column
  })
);

const Month = ({calendarData, parentElement, setCalendarView}) => {
  useEffect(() => {
    const parents = parentElement.current.querySelectorAll('.weekblock');
    const height = 114;

    parents.forEach(parent => {
      const weekNumber = parent.children[0].textContent;
      let location = null;
      let del = null;
      for (let i = 0; i < parent.children.length; i++) {
        const top = parent.children[i].offsetTop;
        if (top > height) {
          if (parent.children[i - 1].className.includes(DayNumber)) {
            del = parent.children[i - 2];
          }
          const elemStyles = getComputedStyle(parent.children[i - 1]);
          location = elemStyles.gridColumnStart - 1;
          const childSeeMore = parent.querySelector(
            `#seeMore-${weekNumber}-${location}`
          );
          childSeeMore.style.display = 'block';
        }

        if (del !== null) {
          del.style.display = 'none';
          console.log('hide this item - ' + del);
          del = null;
        }
      }
    });
  });

  return (
    <>
      {calendarData.map(({week, weekNumber}) => (
        <WeekBlock key={weekNumber} className="weekblock">
          <WeekNumber column={1}>{weekNumber}</WeekNumber>
          {week.map(({events, date, isPeripheral}, index) => {
            const day = format(date, 'dd');

            return (
              <React.Fragment key={day}>
                <DayNumber col={index + 2} isPeripheral={isPeripheral}>
                  {day}
                </DayNumber>
                <SeeMore
                  column={index + 2}
                  isVisible="none"
                  id={`seeMore-${weekNumber}-${index + 1}`}
                  onClick={() => setCalendarView('week')}
                >
                  see more
                </SeeMore>
                {events.map(event => {
                  return (
                    <Event
                      key={event.id}
                      col={index + 2}
                      span={event.event_length}
                      color={event.color}
                    >
                      <EventWrapper event={event}>
                        {event.start_time} {event.name}
                      </EventWrapper>
                    </Event>
                  );
                })}
              </React.Fragment>
            );
          })}
        </WeekBlock>
      ))}
    </>
  );
};

Month.propTypes = {
  calendarData: PropTypes.arrayOf(
    PropTypes.shape({
      week: PropTypes.arrayOf(PropTypes.object),
      weekNumber: PropTypes.number
    })
  ).isRequired
};

export default Month;
