import React from 'react';
import PropTypes from 'prop-types';
import {
  format,
  getWeek,
  startOfMonth,
  addMonths,
  subMonths,
  lastDayOfMonth
} from 'date-fns/esm';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {monthBuilder} from './utilities/date-utils-grid';
import Month from './calendar-month-view';
import Week from './calendar-week-view';
import Day from './calendar-day-view';
import CalendarControls from './components/calendar-controls';

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

export default class CalendarParent extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      today,
      valueMethod: 'Month',
      month: {
        int: parseInt(format(today, 'L'), 10),
        name: format(today, 'MMMM')
      },
      activeMonth: today,
      year: today.getUTCFullYear(),
      monthData: monthBuilder(today, this.props.events),
      // A monthEvents: eventArrayBuilder(this.props.events),
      weekNumber: getWeek(startOfMonth(today))
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
  }

  handleChange(option) {
    this.setState({
      valueMethod: option
    });
  }

  changeMonth(option) {
    let newMonth;
    if (option === 'initial') {
      newMonth = this.state.today;
    } else if (option === 'inc') {
      newMonth = addMonths(this.state.activeMonth, 1);
    } else if (option === 'inc+') {
      newMonth = addMonths(this.state.activeMonth, 12);
    } else if (option === 'dec') {
      newMonth = subMonths(this.state.activeMonth, 1);
    } else if (option === 'dec+') {
      newMonth = subMonths(this.state.activeMonth, 12);
    }

    this.setState({
      activeMonth: newMonth,
      month: {
        int: parseInt(format(newMonth, 'L'), 10),
        name: format(newMonth, 'MMMM')
      },
      year: newMonth.getUTCFullYear(),
      monthData: monthBuilder(newMonth, this.props.events),
      weekNumber: getWeek(startOfMonth(newMonth))
    });
  }

  render() {
    return (
      <CalendarContainer>
        <CalendarControls
          month={this.state.month}
          year={this.state.year}
          location="top"
          handleChange={this.handleChange}
          changeMonth={this.changeMonth}
          valueMethod={this.valueMethod}
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

        {(() => {
          switch (this.state.valueMethod) {
            case 'day':
              return (
                <Day
                  today={[
                    parseInt(format(this.state.today, 'd'), 10),
                    parseInt(format(this.state.today, 'L'), 10),
                    parseInt(format(this.state.today, 'y'), 10)
                  ]}
                  events={this.props.events}
                  lastSunday={
                    parseInt(
                      format(
                        lastDayOfMonth(subMonths(this.state.today, 1)),
                        'd'
                      )
                    ) -
                    parseInt(
                      format(
                        lastDayOfMonth(subMonths(this.state.today, 1)),
                        'i'
                      )
                    )
                  }
                  firstDay={
                    parseInt(format(startOfMonth(this.state.today), 'i')) + 1
                  }
                  handleChange={this.handleChange}
                  valueMethod={this.state.valueMethod}
                  changeMonth={this.changeMonth}
                  month={this.state.month}
                  year={this.state.year}
                  monthData={this.state.monthData}
                  monthEvents={this.state.monthEvents}
                  weekNumber={this.state.weekNumber}
                />
              );
            case 'week':
              return (
                <Week
                  today={[
                    parseInt(format(this.state.today, 'd'), 10),
                    parseInt(format(this.state.today, 'L'), 10),
                    parseInt(format(this.state.today, 'y'), 10)
                  ]}
                  events={this.props.events}
                  lastSunday={
                    parseInt(
                      format(
                        lastDayOfMonth(subMonths(this.state.today, 1)),
                        'd'
                      )
                    ) -
                    parseInt(
                      format(
                        lastDayOfMonth(subMonths(this.state.today, 1)),
                        'i'
                      )
                    )
                  }
                  firstDay={
                    parseInt(format(startOfMonth(this.state.today), 'i')) + 1
                  }
                  handleChange={this.handleChange}
                  valueMethod={this.state.valueMethod}
                  changeMonth={this.changeMonth}
                  month={this.state.month}
                  year={this.state.year}
                  monthData={this.state.monthData}
                  monthEvents={this.state.monthEvents}
                  weekNumber={this.state.weekNumber}
                />
              );
            case 'month':
              return (
                <Month
                  today={[
                    parseInt(format(this.state.today, 'd'), 10),
                    parseInt(format(this.state.today, 'L'), 10),
                    parseInt(format(this.state.today, 'y'), 10)
                  ]}
                  events={this.props.events}
                  lastSunday={
                    parseInt(
                      format(
                        lastDayOfMonth(subMonths(this.state.today, 1)),
                        'd'
                      )
                    ) -
                    parseInt(
                      format(
                        lastDayOfMonth(subMonths(this.state.today, 1)),
                        'i'
                      )
                    )
                  }
                  firstDay={
                    parseInt(format(startOfMonth(this.state.today), 'i')) + 1
                  }
                  handleChange={this.handleChange}
                  valueMethod={this.state.valueMethod}
                  changeMonth={this.changeMonth}
                  month={this.state.month}
                  year={this.state.year}
                  monthData={this.state.monthData}
                  monthEvents={this.state.monthEvents}
                  weekNumber={this.state.weekNumber}
                />
              );
            default:
              return null;
          }
        })()}
      </CalendarContainer>
    );
  }
}

CalendarParent.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      picture: PropTypes.string,
      // eslint-disable-next-line camelcase
      calendar_id: PropTypes.string.isRequired,
      interval: PropTypes.oneOf([PropTypes.string], [PropTypes.number]),
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
