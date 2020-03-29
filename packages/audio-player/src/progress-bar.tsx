/** @jsx jsx */
import {jsx} from 'theme-ui';
import React, {Ref} from 'react';
import PropTypes from 'prop-types';
import {Range, getTrackBackground} from 'react-range';
import {ITrackProps} from 'react-range/lib/types';

type ProgressBarProps = {
  values: number[];
  max?: number;
  updateValues: (values: number[]) => void;
  step?: number;
  isInteracting: boolean;
  color?: string;
  isInvert?: boolean;
};

const ProgressBar = React.forwardRef<Range, ProgressBarProps>(
  (
    {values, max, updateValues, step, isInteracting, color, isInvert},
    ref: Ref<Range>
  ) => {
    return (
      <Range
        ref={ref}
        step={step}
        min={0}
        max={max}
        values={values}
        renderTrack={({
          props,
          children
        }: {
          props: ITrackProps;
          children: React.ReactNode;
        }) => (
          <div
            style={{...props.style}}
            tabIndex={0}
            sx={{
              height: '30px',
              display: 'flex',
              width: '100%',
              padding: '0',
              ':focus-within': {outline: '-webkit-focus-ring-color auto 5px'},
              '&:hover': {'.thumb': {opacity: '1'}}
            }}
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
          </div>
        )}
        renderThumb={({props}) => (
          <div
            className="thumb"
            {...props}
            style={props.style}
            tabIndex={-1}
            sx={{
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              transition: 'opacity 0.2s linear',
              opacity: isInteracting ? '1' : '0',
              backgroundColor: isInvert ? '#EEE' : '#111'
            }}
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
  max: PropTypes.number,
  updateValues: PropTypes.func.isRequired,
  step: PropTypes.number,
  isInteracting: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  isInvert: PropTypes.bool
};
