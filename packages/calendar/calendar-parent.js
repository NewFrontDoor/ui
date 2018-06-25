import React from 'react';
import PropTypes from 'prop-types';
import {
  format,
  getWeek,
  startOfMonth,
  addMonths,
  subMonths
} from 'date-fns/esm';
import {monthBuilder} from './date-utils';
import Calendar from './calendar';

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
      monthData: monthBuilder(today),
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
    } else if (option === 'dec') {
      newMonth = subMonths(this.state.activeMonth, 1);
    }
    this.setState({
      activeMonth: newMonth,
      month: {
        int: parseInt(format(newMonth, 'L'), 10),
        name: format(newMonth, 'MMMM')
      },
      year: newMonth.getUTCFullYear(),
      monthData: monthBuilder(newMonth),
      weekNumber: getWeek(startOfMonth(newMonth))
    });
  }

  render() {
    return (
      <Calendar
        today={[
          format(this.state.today, 'd'),
          format(this.state.today, 'L'),
          format(this.state.today, 'y')
        ]}
        events={this.props.events}
        handleChange={this.handleChange}
        valueMethod={this.state.valueMethod}
        changeMonth={this.changeMonth}
        month={this.state.month}
        year={this.state.year}
        monthData={this.state.monthData}
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
      all_day: PropTypes.string.isRequired,
      url: PropTypes.string,
      color: PropTypes.string,
      locations: PropTypes.object
    })
  ).isRequired
};
