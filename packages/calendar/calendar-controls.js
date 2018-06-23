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
          <MethodToggle />
        </div>
      </div>
    );
  }
}

CalendarControls.propTypes = {
  month: PropTypes.string.isRequired
};
