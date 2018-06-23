import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RadioGroup, Radio} from 'react-radio-group';
import {css} from 'react-emotion';

const methodField = css`
  height: 30px;
  margin: 10px 10px 0 10px;
  position: relative;
  display: flex;
  &:before {
    content: '';
    width: 99%;
    height: 30px;
    position: absolute;
    background-color: #e4e4e4;
    top: 0;
    left: 0;
    z-index: -2;
  }
`;

const methodFieldInput = css`
  position: absolute !important;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  border: 0;
  overflow: hidden;
  &:checked + label {
    color: white;
  }

  &:nth-of-type(1):checked ~ label:last-of-type:before {
    transform: translate3d(0, 0, 0);
    transition: all 0.275s ease-out;
    will-change: transform, transition;
  }

  &:nth-of-type(2):checked ~ label:last-of-type:before {
    transform: translate3d(100%, 0, 0);
    transition: all 0.275s ease-out;
    will-change: transform, transition;
  }

  &:nth-of-type(3):checked ~ label:last-of-type:before {
    transform: translate3d(200%, 0, 0);
    transition: all 0.275s ease-out;
    will-change: transform, transition;
  }
`;

const methodFieldLabel = css`
  display: inline-block;
  width: calc(33%);
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  flex-basis: calc(33%);
  min-height: 30px;
  line-height: 30px;
  transition: all 0.275s ease-out;
  &:hover {
    cursor: pointer;
  }
  &:first-of-type {
    border-radius: 2px 0 0 2px;
  }
  &:last-of-type {
    border-radius: 0 2px 2px 0;
  }
  &:last-of-type:before {
    content: '';
    width: calc(33%);
    height: 30px;
    position: absolute;
    background-color: #3cba54;
    top: 0;
    left: 0;
    z-index: -1;
    transform: translate3d(0, 0, 0);
    transition: all 0.275s ease-out;
  }
`;

class MethodToggle extends Component {
  render() {
    return (
      <RadioGroup
        className={methodField}
        name="method"
        selectedValue={this.props.valueMethod}
        onChange={option => {
          this.props.handleChange(option);
        }}
      >
        <Radio
          value="day"
          id={this.props.location + 'day'}
          className={methodFieldInput}
        />
        <label
          htmlFor={this.props.location + 'day'}
          className={methodFieldLabel}
        >
          Day
        </label>

        <Radio
          value="week"
          id={this.props.location + 'week'}
          className={methodFieldInput}
        />
        <label
          htmlFor={this.props.location + 'week'}
          className={methodFieldLabel}
        >
          Week
        </label>
        <Radio
          value="month"
          id={this.props.location + 'month'}
          className={methodFieldInput}
        />
        <label
          htmlFor={this.props.location + 'month'}
          className={methodFieldLabel}
        >
          Month
        </label>
      </RadioGroup>
    );
  }
}

export default MethodToggle;

MethodToggle.propTypes = {
  location: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  valueMethod: PropTypes.string.isRequired
};
