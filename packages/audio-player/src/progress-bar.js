import React, {useState} from 'react';
import {Range, getTrackBackground} from 'react-range';
import styled from '@emotion/styled';

const Thumb = styled.div(
  {
    height: '10px',
    width: '10px',
    backgroundColor: '#111',
    borderRadius: '50%',
    zIndex: '20'
  },
  props => ({backgroundColor: props.invert ? '#EEE' : '#111'}),
  props => ({visibility: props.visible ? 'visible' : 'hidden'}),
  props => props.inbuiltStyle
);

const Slider = styled('div')`
  height: 30px;
  display: flex;
  width: 100%;
  :focus-within {
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

const ProgressBar = React.forwardRef(
  ({values, max, updateValues, step, interacting, enter, leave, color, invert}, ref) => {
    const [visible, setVisible] = useState(false);

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
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            <div
              ref={props.ref}
              tabIndex={0}
              style={{
                height: '5px',
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
              onFocus={() => enter}
              onBlur={() => leave}
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
            visible={visible || interacting}
          />
        )}
        onChange={values => updateValues(values)}
      />
    );
  }
);

export default ProgressBar;
