/** @jsx jsx */
import {jsx} from 'theme-ui';
import {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {Range, getTrackBackground} from 'react-range';

type ProgressBarProps = {
  value: number;
  max: number;
  onChange: (values: number) => void;
  step?: number;
  isInteracting: boolean;
  color?: string;
  isInvert?: boolean;
};

const ProgressBar = forwardRef<Range, ProgressBarProps>(
  ({value, max, onChange, step, isInteracting, color, isInvert}, rangeRef) => {
    return (
      <Range
        ref={rangeRef}
        step={step}
        min={0}
        max={max}
        values={[value]}
        renderTrack={({
          props: {style, onMouseDown, onTouchStart, ref},
          children
        }) => (
          <div
            sx={{
              ...style,
              width: '100%',
              height: '42px',
              display: 'flex',
              '&:hover': {
                '.thumb': {
                  opacity: '1'
                }
              }
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <div
              ref={ref}
              style={{
                height: '4px',
                width: '100%',
                borderRadius: '4px',
                alignSelf: 'center',
                background: getTrackBackground({
                  values: [value],
                  colors: color ? [color, '#ccc'] : ['#ccc'],
                  min: 0,
                  max
                })
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({props: {style, ...props}}) => (
          <div
            {...props}
            sx={{
              ...style,
              height: '42px',
              width: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              className="thumb"
              sx={{
                height: '10px',
                width: '10px',
                borderRadius: '50%',
                transition: 'opacity 0.2s linear',
                opacity: isInteracting ? '1' : '0',
                backgroundColor: isInvert ? '#EEE' : '#111'
              }}
            />
          </div>
        )}
        onChange={(values) => onChange(values[0])}
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
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  isInteracting: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  isInvert: PropTypes.bool
};
