/** @jsx jsx */
import {jsx} from 'theme-ui';
import {Fragment, FC} from 'react';
import PropTypes from 'prop-types';
import Month from './calendar-month-view';
import Week from './calendar-week-view';
import Day from './calendar-day-view';
import CalendarControls from './components/calendar-controls';
import {startOfMonth} from 'date-fns';
import {calendarViews, CalendarClient, CalendarView} from './types';
import {useCalendarEvents, CalendarDispatch} from './use-calendar-events';

type CalendarProps = {
  client: CalendarClient;
  initialView: CalendarView;
  isViewFixed?: boolean;
  handleNav?: (url: string) => void;
};

const Calendar: FC<CalendarProps> = ({
  client,
  initialView,
  isViewFixed,
  handleNav
}) => {
  const [
    data,
    status,
    ,
    // Error
    dispatch
  ] = useCalendarEvents(initialView, client);

  return (
    <CalendarDispatch.Provider value={dispatch}>
      {status === 'loading' ? (
        <div>loading...</div>
      ) : (
        <Fragment>
          <CalendarControls
            location="top"
            startOfMonth={startOfMonth(data.currentDate)}
            calendarView={data.calendarView}
            isViewFixed={isViewFixed}
            input={Object.values(calendarViews)}
          />
          {data.calendarView === 'day' ? (
            <Day calendarData={data.dayData} handleNav={handleNav} />
          ) : (
            <div
              sx={{
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
                background: '#f5f7fa',
                ...(data.calendarView === 'month'
                  ? {
                      lineHeight: '50px',
                      height: '50px',
                      borderBottom: '1px solid rgba(166, 168, 179, 0.12)'
                    }
                  : {})
              }}
            >
              <div>{data.calendarView === 'month' ? 'Wk' : ''}</div>
              <div>Sunday</div>
              <div>Monday</div>
              <div>Tuesday</div>
              <div>Wednesday</div>
              <div>Thursday</div>
              <div>Friday</div>
              <div>Saturday</div>
            </div>
          )}

          {data.calendarView === 'week' && (
            <Week calendarData={data.weekData} />
          )}

          {data.calendarView === 'month' && (
            <Month calendarData={data.monthData} />
          )}
        </Fragment>
      )}
    </CalendarDispatch.Provider>
  );
};

Calendar.propTypes = {
  initialView: PropTypes.oneOf(calendarViews).isRequired,
  client: PropTypes.exact({fetchEvents: PropTypes.func.isRequired}).isRequired,
  isViewFixed: PropTypes.bool,
  handleNav: PropTypes.func
};

Calendar.defaultProps = {
  isViewFixed: false
};

export default Calendar;
