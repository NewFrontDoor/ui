import {Fragment} from 'react';
import {RadioGroup, Radio} from '@newfrontdoor/radio-group';
import type {RadioValue} from '@newfrontdoor/radio-group';
import styled from '@emotion/styled';

type Style = {
  backgroundColor?: string;
  borderRadius?: string;
  color?: string;
  fontSize?: number;
  height?: string;
  highlightColor?: string;
  selectedColor?: string;
  textAlign?: string;
  textTransform?: string;
  verticalAlign?: string;
};

type ToggleSelector = {
  location: string;
  handleChange: (option: string) => void;
  valueMethod: string;
  inputs: string[];
  styles: Style;
};

type StyledRadioGroupProps = {
  inputs: string[];
  styles: Style;
};

const StyledRadioGroup = styled(RadioGroup)<StyledRadioGroupProps>`
  height: ${(props) =>
    props.styles.fontSize
      ? props.styles.fontSize * 2 + props.styles.fontSize / 2
      : `30`}px;
  margin: 10px 10px 0 10px;
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
    width: calc(100% / ${(props) => props.inputs.length});
    color: ${(props) =>
      props.styles.color ? props.styles.color : `rgba(0, 0, 0, 0.6)`};
    font-size: ${(props) =>
      props.styles.fontSize ? props.styles.fontSize : `12`}px;
    text-align: ${(props) =>
      props.styles.textAlign ? props.styles.textAlign : `center`};
    text-transform: ${(props) =>
      props.styles.textTransform ? props.styles.textTransform : `uppercase`};
    vertical-align: ${(props) =>
      props.styles.verticalAlign ? props.styles.verticalAlign : `middle`};
    flex-basis: calc(100% / ${(props) => props.inputs.length});
    min-height: ${(props) =>
      props.styles.fontSize
        ? props.styles.fontSize * 2 + props.styles.fontSize / 2
        : `30`}px;
    line-height: ${(props) =>
      props.styles.fontSize
        ? props.styles.fontSize * 2 + props.styles.fontSize / 2
        : `30`}px;
    transition: all 0.275s ease-out;
  }

  label:hover {
    cursor: pointer;
  }

  input:checked + label {
    color: ${(props) =>
      props.styles.selectedColor ? props.styles.selectedColor : `white`};
  }

  label:first-of-type {
    border-radius: ${(props) =>
      props.styles.borderRadius
        ? `${props.styles.borderRadius}px 0 0 ${props.styles.borderRadius}px`
        : '2px 0 0 2px'};
  }
  label:last-of-type {
    border-radius: ${(props) =>
      props.styles.borderRadius
        ? `0 ${props.styles.borderRadius}px ${props.styles.borderRadius}px 0`
        : '0 2px 2px 0'};
  }

  &:before {
    content: '';
    width: 100%;
    height: ${(props) =>
      props.styles.fontSize
        ? props.styles.fontSize * 2 + props.styles.fontSize / 2
        : `30`}px;
    position: absolute;
    background-color: ${(props) =>
      props.styles.backgroundColor ? props.styles.backgroundColor : `#e4e4e4`};
    top: 0;
    left: 0;
    z-index: -2;
    border-radius: ${(props) =>
      props.styles.borderRadius ? props.styles.borderRadius : '2'}px;
  }

  label:last-of-type:before {
    content: '';
    width: calc(100% / ${(props) => props.inputs.length});
    height: ${(props) =>
      props.styles.fontSize
        ? props.styles.fontSize * 2 + props.styles.fontSize / 2
        : `30`}px;
    position: absolute;
    background-color: ${(props) =>
      props.styles.highlightColor ? props.styles.highlightColor : `#3cba54`};
    top: 0;
    left: 0;
    z-index: -1;
    transform: translate3d(0, 0, 0);
    transition: all 0.275s ease-out;
  }

  ${(props) =>
    props.inputs.map(
      (_input: string, index: number) =>
        `input[type="radio"]:nth-of-type(${
          index + 1
        }):checked~label:last-of-type:before {
      transform: translate3d(${index * 100}%, 0, 0);
      transition: all .275s ease-out;
      will-change: transform,transition
    }`
    )}
`;

const ToggleSelector = ({
  location = '',
  inputs,
  styles = {},
  valueMethod,
  handleChange
}: ToggleSelector) => {
  return (
    <StyledRadioGroup
      id="methodField"
      name="method"
      inputs={inputs}
      styles={styles}
      selectedValue={valueMethod}
      onChange={(option: RadioValue) => {
        if (typeof option !== 'string') {
          return;
        }

        handleChange(option);
      }}
    >
      {inputs.map((input) => {
        const id = location + input;

        return (
          <Fragment key={id}>
            <Radio value={input} id={id} />
            <label htmlFor={location + input}>{input}</label>
          </Fragment>
        );
      })}
    </StyledRadioGroup>
  );
};

export default ToggleSelector;
