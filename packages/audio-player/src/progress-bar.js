import React from 'react';
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
  props => ({backgroundColor: props.invert ? '#EEE' : '#111'}),
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
  ({values, max, updateValues, step, interacting, color, invert}, ref) => {
    return (
      <Range
        ref={ref}
        step={step || 1}
        min={0}
        max={max}
        values={values}
        renderTrack={({props, children}) => (
          <Slider
            style={{...props.style}}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
          >
            <div
              ref={props.ref}
              tabIndex={0}
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
            tabIndex={false}
            className="thumb"
            {...props}
            isDragged={isDragged}
            invert={invert}
            inbuiltStyle={props.style}
            visible={interacting}
          />
        )}
        onChange={values => updateValues(values)}
      />
    );
  }
);

export default ProgressBar;
