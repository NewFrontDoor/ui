/** @jsx jsx */
import {jsx} from 'theme-ui';
import {FC, Fragment} from 'react';
import PropTypes from 'prop-types';
import {shade, lighten, readableColor} from 'polished';
import {format} from 'date-fns';
import EventWrapper from './components/event-wrapper';
import {useCalendarDispatch} from './use-calendar-events';

import {CalendarMonth} from './types';

type MonthProps = {
  calendarData: CalendarMonth;
  handleNav?: (url?: string) => void;
};

const Month: FC<MonthProps> = ({calendarData, handleNav}) => {
  const dispatch = useCalendarDispatch();

  return (
    <Fragment>
      {calendarData.map(({week, weekNumber}) => (
        <div
          key={weekNumber}
          className="weekblock"
          sx={{
            display: 'grid',
            gridTemplateColumns: '50px repeat(7, 1fr)',
            gridTemplateRows: '26px repeat(3, 22px)',
            gridAutoFlow: 'column dense',
            borderBottom: '1px solid rgba(166, 168, 179, 0.12)',
            height: '114px',
            overflow: 'hidden',
            position: 'relative',
            background: '#f5f7fa'
          }}
        >
          <div
            sx={{
              borderRight: '1px solid rgba(166, 168, 179, 0.12)',
              pointerEvents: 'none',
              gridRowStart: '1',
              gridRowEnd: '5',
              gridColumn: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px',
              color: '#98a0a6'
            }}
          >
            {weekNumber}
          </div>
          {week.map(
            ({events, date, isPeripheral, numberOfEventsToday}, index) => {
              const day = format(date, 'dd');
              const showMore = numberOfEventsToday >= 5;
              return (
                <Fragment key={day}>
                  <div
                    sx={{
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
                      borderRight: '1px solid rgba(166, 168, 179, 0.12)',
                      gridColumn: index + 2,
                      backgroundColor: isPeripheral
                        ? 'rgba(166, 168, 179, 0.08)'
                        : 'none'
                    }}
                  >
                    {day}
                  </div>
                  {showMore && (
                    <div
                      sx={{
                        fontSize: '12px',
                        textAlign: 'right',
                        height: '18px',
                        padding: '2px 3px',
                        alignSelf: 'center',
                        gridRow: '5',
                        gridColumn: index + 2
                      }}
                      onClick={() => {
                        dispatch({type: 'see-more', date});
                      }}
                    >
                      see more
                    </div>
                  )}
                  {events.map((event) => {
                    return (
                      <div
                        key={event.id}
                        sx={{
                          padding: '2px 3px',
                          alignSelf: 'center',
                          fontSize: '12px',
                          position: 'relative',
                          overflow: 'hidden',
                          maxWidth: '100%',
                          whiteSpace: 'nowrap',
                          height: '18px',
                          cursor: 'pointer',
                          display: 'block',
                          marginRight: '5px',
                          gridColumnStart: index + 2,
                          gridColumnEnd: `span ${event.eventLength}`,
                          background: event.color || '#fef0db',
                          color: `${
                            event.color
                              ? readableColor(shade(0.2, event.color))
                              : readableColor('#fc9b10')
                          }`,
                          borderLeft: `2px solid ${
                            event.color ? lighten(0.2, event.color) : '#fdb44d'
                          }`
                        }}
                      >
                        <EventWrapper event={event} handleNav={handleNav}>
                          {event.startTime} {event.name}
                        </EventWrapper>
                      </div>
                    );
                  })}
                </Fragment>
              );
            }
          )}
        </div>
      ))}
    </Fragment>
  );
};

Month.propTypes = {
  calendarData: PropTypes.arrayOf(
    PropTypes.exact({
      week: PropTypes.arrayOf(PropTypes.any).isRequired,
      weekNumber: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  handleNav: PropTypes.func
};

export default Month;
