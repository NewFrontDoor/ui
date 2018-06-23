import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './calendar';

export default class CalendarParent extends React.Component {
  constructor(props) {
    super(props);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    this.state = {
      valueMethod: 'Month',
      month: months[new Date().getUTCMonth()],
      year: 2018
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(option) {
    this.setState({
      valueMethod: option
    });
  }

  render() {
    return (
      <Calendar
        events={this.props.events}
        handleChange={this.handleChange}
        valueMethod={this.state.valueMethod}
        month={this.state.month}
        year={this.state.year}
      />
    );
  }
}

Calendar.propTypes = {
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
  ).isRequired,
  month: PropTypes.string.isRequired
};
