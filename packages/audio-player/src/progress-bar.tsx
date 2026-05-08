
import {forwardRef} from 'react';
import {Range, getTrackBackground} from 'react-range';

const AnyRange = Range as any;

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
  (
    {value, max, onChange, step = 1, isInteracting, color, isInvert = false},
    rangeRef
  ) => {
    return (
      <AnyRange
        ref={rangeRef as any}
        step={step}
        min={0}
        max={max}
        values={[value]}
        renderTrack={({
          props: {style, onMouseDown, onTouchStart, ref},
          children
        }: any) => (
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
        renderThumb={({props: {style, ...props}}: any) => (
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
        onChange={(values: number[]) => onChange(values[0])}
      />
    );
  }
);

export default ProgressBar;

/* ProgressBar.defaultProps = {
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
}; */
