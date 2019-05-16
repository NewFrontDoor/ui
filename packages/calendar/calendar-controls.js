import React from 'react';
import PropTypes from 'prop-types';
import {Button, Text} from 'mineral-ui';
import {css} from 'react-emotion';
import MethodToggle from './method-toggle';

const calendarControlsStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const dateScroller = css`
  flex: 1 1 20%;
`;
const monthTitle = css`
  flex: 3 1 50%;
  text-align: center;
`;
const rangeToggle = css`
  flex: 1 1 20%;
`;

export default class CalendarControls extends React.Component {
  render() {
    return (
      <div className={calendarControlsStyle}>
        <div className={dateScroller}>
          <Button size="medium" onClick={() => this.props.changeMonth('dec+')}>
            &lt;&lt;
          </Button>
          <Button size="medium" onClick={() => this.props.changeMonth('dec')}>
            &lt;
          </Button>
          <Button
            variant="success"
            size="medium"
            onClick={() => this.props.changeMonth('initial')}
          >
            Today
          </Button>
          <Button size="medium" onClick={() => this.props.changeMonth('inc')}>
            &gt;
          </Button>
          <Button size="medium" onClick={() => this.props.changeMonth('inc+')}>
            &gt;&gt;
          </Button>
        </div>
        <div className={monthTitle}>
          <Text element="h2">
            {this.props.month.name} - {this.props.year}
          </Text>
        </div>
        <div className={rangeToggle}>
          <MethodToggle
            handleChange={this.props.handleChange}
            valueMethod={this.props.valueMethod}
            location={this.props.location}
            inputs={['day','week','month']}
            styles={{
              borderRadius: 0
            }}
          />
        </div>
      </div>
    );
  }
}

CalendarControls.propTypes = {
  handleChange: PropTypes.func.isRequired,
  valueMethod: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  changeMonth: PropTypes.func.isRequired
};
