import type {ComponentProps, ForwardedRef, ReactNode} from 'react';
import {forwardRef} from 'react';
import {Range, getTrackBackground} from 'react-range';

type RangeProps = ComponentProps<typeof Range>;
type RangeAdapterProps = Partial<RangeProps> &
  Pick<RangeProps, 'values' | 'onChange' | 'renderTrack' | 'renderThumb'> & {
  ref?: ForwardedRef<Range>;
};
const AnyRange = Range as unknown as (props: RangeAdapterProps) => ReactNode;
type TrackRenderProps = Parameters<NonNullable<RangeProps['renderTrack']>>[0];
type ThumbRenderProps = Parameters<NonNullable<RangeProps['renderThumb']>>[0];

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
        ref={rangeRef}
        step={step}
        min={0}
        max={max}
        values={[value]}
        renderTrack={({
          props: {style, onMouseDown, onTouchStart, ref},
          children
        }: TrackRenderProps) => (
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
        renderThumb={({props: {style, ...props}}: ThumbRenderProps) => (
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

ProgressBar.displayName = 'ProgressBar';

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
