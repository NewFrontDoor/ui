/** @jsx jsx */
import {jsx} from 'theme-ui';
import {FC, Fragment} from 'react';
import PropTypes from 'prop-types';
import {shade, readableColor} from 'polished';
import {format, differenceInHours} from 'date-fns';
import EventWrapper from './components/event-wrapper';

import {CalendarDay} from './types';

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

type DayProps = {
  calendarData: CalendarDay;
  handleNav?: (url?: string) => void;
};

const Day: FC<DayProps> = ({calendarData, handleNav}) => {
  const day = calendarData;
  const date = format(day.date, 'do LLLL');
  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '40px 10px repeat(5, 1fr)',
        gridTemplateRows: 'repeat(38, 15px)',
        gridAutoFlow: 'column dense',
        borderBottom: '1px solid rgba(166, 168, 179, 0.12)',
        height: '570px'
      }}
    >
      <div
        sx={{
          width: '100%',
          textAlign: 'center',
          letterSpacing: '1px',
          fontSize: '20px',
          color: '#98a0a6',
          gridRow: '1 / 2',
          height: '570px',
          borderLeft: '1px solid rgba(166, 168, 179, 0.12)',
          gridColumn: '1 / span 7',
          fontVariant: 'small-caps'
        }}
      >
        {date}
      </div>
      {day.events.map(event => {
        const startRow =
          parseInt(format(event.startDate, 'H'), 10) * 2 +
          (parseInt(format(event.startDate, 'm'), 10) >= 30 ? 1 : 0);

        const rowspan = differenceInHours(event.endDate, event.startDate) + 2;

        if (event.eventLength > 1) {
          return null;
        }

        return (
          <div
            key={event.id}
            sx={{
              padding: '2px 3px 0px 2px',
              fontSize: '12px',
              position: 'relative',
              overflow: 'hidden',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              gridRow: `${startRow - 9} / span ${rowspan}`,
              background: event.color || '#fef0db',
              color: `${
                event.color
                  ? readableColor(shade(0.2, event.color))
                  : readableColor('#fc9b10')
              }`,
              borderLeft: `2px solid ${
                event.color ? shade(0.2, event.color) : '#fdb44d'
              }`
            }}
            role="button"
          >
            <EventWrapper event={event} handleNav={handleNav}>
              {event.name}
            </EventWrapper>
          </div>
        );
      })}
      {hours.map((hour, index) => (
        <Fragment key={hour}>
          <div
            sx={{
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
              fontVariant: 'small-caps',
              gridRowStart: index * 2 + 1,
              gridRowEnd: `span ${index * 2 + 2}`
            }}
          >
            {hour}
          </div>
          <div
            sx={{
              position: 'relative',
              gridColumn: '2',
              width: '100vw',
              pointerEvents: 'none',
              borderRight: '1px solid rgba(166, 168, 179, 0.12)',
              borderBottom: '1px solid rgba(166, 168, 179, 0.12)',
              gridRow: index * 2 + 2
            }}
          />
        </Fragment>
      ))}
    </div>
  );
};

Day.propTypes = {
  calendarData: PropTypes.exact({
    events: PropTypes.array,
    date: PropTypes.instanceOf(Date).isRequired,
    isToday: PropTypes.bool.isRequired,
    isWeekend: PropTypes.bool.isRequired,
    isFuture: PropTypes.bool.isRequired,
    isFirstDayOfMonth: PropTypes.bool.isRequired,
    isLastDayOfMonth: PropTypes.bool.isRequired,
    numberOfEventsToday: PropTypes.number.isRequired
  }).isRequired,
  handleNav: PropTypes.func
};

export default Day;
