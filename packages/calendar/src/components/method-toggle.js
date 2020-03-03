import React from 'react';
import PropTypes from 'prop-types';
import {RadioGroup, Radio} from 'react-radio-group';
import styled from '@emotion/styled';
import {useCalendarDispatch} from '../utilities/calendar-dispatch-provider';

const StyledRadioGroup = styled(RadioGroup)`
  height: ${props =>
    props.styles.fontSize
      ? props.styles.fontSize * 2 + props.styles.fontSize / 2
      : `30`}px;
  margin: 0 10px;
  position: relative;
  display: flex;

  input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
  }

  label {
    display: inline-block;
    width: calc(100% / ${props => props.inputs.length});
    color: ${props =>
      props.styles.color ? props.styles.color : `rgba(0, 0, 0, 0.6)`};
    font-size: ${props =>
      props.styles.fontSize ? props.styles.fontSize : `12`}px;
    text-align: ${props =>
      props.styles.textAlign ? props.styles.textAlign : `center`};
    text-transform: ${props =>
      props.styles.textTransform ? props.styles.textTransform : `uppercase`};
    vertical-align: ${props =>
      props.styles.verticalAlign ? props.styles.verticalAlign : `middle`};
    flex-basis: calc(100% / ${props => props.inputs.length});
    min-height: ${props =>
      props.styles.fontSize
        ? props.styles.fontSize * 2 + props.styles.fontSize / 2
        : `30`}px;
    line-height: ${props =>
      props.styles.fontSize
        ? props.styles.fontSize * 2 + props.styles.fontSize / 2
        : `30`}px;
    transition: all 0.275s ease-out;
  }

  label:hover {
    cursor: pointer;
  }

  input:checked + label {
    color: ${props =>
      props.styles.selectedColor ? props.styles.selectedColor : `white`};
  }

  label:first-of-type {
    border-radius: ${props =>
      props.styles.borderRadius
        ? `${props.styles.borderRadius}px 0 0 ${props.styles.borderRadius}px`
        : '2px 0 0 2px'};
  }
  label:last-of-type {
    border-radius: ${props =>
      props.styles.borderRadius
        ? `0 ${props.styles.borderRadius}px ${props.styles.borderRadius}px 0`
        : '0 2px 2px 0'};
  }

  &:before {
    content: '';
    width: 100%;
    height: ${props =>
      props.styles.fontSize
        ? props.styles.fontSize * 2 + props.styles.fontSize / 2
        : `30`}px;
    position: absolute;
    background-color: ${props =>
      props.styles.backgroundColor ? props.styles.backgroundColor : `#e4e4e4`};
    top: 0;
    left: 0;
    z-index: -2;
    border-radius: ${props =>
      props.styles.borderRadius ? props.styles.borderRadius : '2'}px;
  }

  label:last-of-type:before {
    content: '';
    width: calc(100% / ${props => props.inputs.length});
    height: ${props =>
      props.styles.fontSize
        ? props.styles.fontSize * 2 + props.styles.fontSize / 2
        : `30`}px;
    position: absolute;
    background-color: ${props =>
      props.styles.highlightColor ? props.styles.highlightColor : `#3cba54`};
    top: 0;
    left: 0;
    z-index: -1;
    transform: translate3d(0, 0, 0);
    transition: all 0.275s ease-out;
  }

  ${props =>
    props.inputs.map(
      (input, index) =>
        `input[type="radio"]:nth-of-type(${index +
          1}):checked~label:last-of-type:before {
      transform: translate3d(${index * 100}%, 0, 0);
      transition: all .275s ease-out;
      will-change: transform,transition
    }`
    )}
`;

const MethodToggle = props => {
  const dispatch = useCalendarDispatch();
  ``;
  return (
    <StyledRadioGroup
      id="methodField"
      name="method"
      inputs={props.inputs}
      styles={props.styles}
      selectedValue={props.calendarView}
      onChange={option => {
        dispatch({type: 'set-view', view: option});
      }}
    >
      {props.inputs.map(input => [
        <Radio value={input} id={props.location + input} />,
        <label htmlFor={props.location + input}>{input}</label>
      ])}
    </StyledRadioGroup>
  );
};

export default MethodToggle;

MethodToggle.propTypes = {
  location: PropTypes.string.isRequired,
  calendarView: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.string).isRequired,
  styles: PropTypes.shape({
    height: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    textAlign: PropTypes.string,
    textTransform: PropTypes.string,
    verticalAlign: PropTypes.string,
    selectedColor: PropTypes.string,
    highlightColor: PropTypes.string
  })
};
