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
import {monthBuilder, eventArrayBuilder} from './date-utils-grid';
import Calendar from './calendar-grid-new';

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
      //monthEvents: eventArrayBuilder(this.props.events),
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
      <Calendar
        today={[
          parseInt(format(this.state.today, 'd'), 10),
          parseInt(format(this.state.today, 'L'), 10),
          parseInt(format(this.state.today, 'y'), 10)
        ]}
        events={this.props.events}
        lastSunday={parseInt(format(lastDayOfMonth(subMonths(this.state.today, 1)), 'd')) - parseInt(format(lastDayOfMonth(subMonths(this.state.today, 1)), 'i'))}
        firstDay={parseInt(format(startOfMonth(this.state.today), 'i')) + 1}
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
  }
}

CalendarParent.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      picture: PropTypes.string,
      // eslint-disable-next-line camelcase
      calendar_id: PropTypes.string.isRequired,
      interval: PropTypes.string,
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
