import React from 'react';
import PropTypes from 'prop-types';
import {Button, Text} from 'mineral-ui';
import MethodToggle from './method-toggle';

export default class CalendarControls extends React.Component {
  render() {
    return (
      <div>
        <div id="date-scroller">
          <Button>&lt;</Button>
          <Button>&gt;</Button>
          <Button variant="success">Today</Button>
        </div>
        <div>
          <Text>{this.props.month}</Text>
        </div>
        <div>
          <MethodToggle
            handleChange={this.props.handleChange}
            valueMethod={this.props.valueMethod}
            location={this.props.location}
          />
        </div>
      </div>
    );
  }
}

CalendarControls.propTypes = {
  handleChange: PropTypes.func.isRequired,
  valueMethod: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};
