import React from 'react';
import PropTypes from 'prop-types';
import {Range, getTrackBackground} from 'react-range';
import styled from '@emotion/styled';

const Thumb = styled.div(
  {
    height: '10px',
    width: '10px',
    backgroundColor: '#111',
    borderRadius: '50%',
    transition: 'opacity 0.2s linear'
  },
  props => ({opacity: props.visible ? '1' : '0'}),
  props => ({backgroundColor: props.isInvert ? '#EEE' : '#111'}),
  props => props.inbuiltStyle
);

const Slider = styled('div')`
  height: 30px;
  display: flex;
  width: 100%;
  padding: 0;
  :focus-within {
    outline: -webkit-focus-ring-color auto 5px;
  }
  &:hover {
    .thumb {
      opacity: 1;
    }
  }
`;

const ProgressBar = React.forwardRef(
  ({values, max, updateValues, step, isInteracting, color, isInvert}, ref) => {
    return (
      <Range
        ref={ref}
        step={step}
        min={0}
        max={max}
        values={values}
        renderTrack={({props, children}) => (
          <Slider
            style={{...props.style}}
            tabIndex={0}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
          >
            <div
              ref={props.ref}
              style={{
                height: '4px',
                width: '100%',
                borderRadius: '4px',
                outline: 'none',
                background: getTrackBackground({
                  values,
                  colors: [color, '#ccc'],
                  min: 0,
                  max
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </Slider>
        )}
        renderThumb={({props, isDragged}) => (
          <Thumb
            className="thumb"
            {...props}
            isDragged={isDragged}
            isInvert={isInvert}
            inbuiltStyle={props.style}
            visible={isInteracting}
            tabIndex={-1}
          />
        )}
        onChange={values => updateValues(values)}
      />
    );
  }
);

export default ProgressBar;

ProgressBar.defaultProps = {
  step: 1,
  isInvert: false
};

ProgressBar.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  updateValues: PropTypes.func.isRequired,
  step: PropTypes.number,
  isInteracting: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  isInvert: PropTypes.bool
};
