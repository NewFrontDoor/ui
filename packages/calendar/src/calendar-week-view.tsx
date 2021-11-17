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

type WeekProps = {
  calendarData: CalendarDay[];
  handleNav?: (url?: string) => void;
};

const Week: FC<WeekProps> = ({calendarData, handleNav}) => {
  const week = calendarData;

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '40px 10px repeat(7, 1fr)',
        gridTemplateRows: 'repeat(38, 15px)',
        gridAutoFlow: 'column dense',
        borderBottom: '1px solid rgba(166, 168, 179, 0.12)',
        height: '570px'
      }}
    >
      {week.map(({events, date}, index) => {
        const day = format(date, 'dd');
        return (
          <Fragment key={day}>
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
                gridColumn: `${index + 3} / span 1`
              }}
            >
              {day}
            </div>
            <div
              sx={{
                display: 'grid',
                position: 'relative',
                gridRow: '2 / 38',
                gridTemplateColumns: 'auto',
                gridTemplateRows: 'repeat(38, 15px)',
                gridColumn: `${index + 3} / span 1`
              }}
            >
              {events.map((event) => {
                const {startDate, eventLength, endDate} = event;
                const startRow =
                  Number.parseInt(format(startDate, 'H'), 10) * 2 +
                  (Number.parseInt(format(startDate, 'm'), 10) >= 30 ? 1 : 0);

                if (eventLength && eventLength > 1) {
                  return null;
                }

                return (
                  <div
                    key={event.id}
                    role="button"
                    sx={{
                      padding: '2px 3px 0px 2px',
                      fontSize: '12px',
                      position: 'relative',
                      overflow: 'hidden',
                      maxWidth: '100%',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      ':hover, :focus': {
                        gridColumn: 'span 10'
                      },
                      gridRow: `${startRow - 10} / span ${
                        differenceInHours(endDate, startDate) + 2
                      }`,
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
                  >
                    <EventWrapper event={event} handleNav={handleNav} />
                  </div>
                );
              })}
            </div>
          </Fragment>
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
              gridRowEnd: `span ${index * 2 + 1 + 1}`
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

Week.propTypes = {
  calendarData: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleNav: PropTypes.func
};

export default Week;
