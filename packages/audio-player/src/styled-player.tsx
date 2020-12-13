/** @jsx jsx */
import {jsx} from 'theme-ui';
import {FC, HTMLProps, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  MdPlayArrow as Play,
  MdPause as Pause,
  MdVolumeUp,
  MdVolumeOff
} from 'react-icons/md';
import {Range} from 'react-range';
import ProgressBar from './progress-bar';
import {useAudioPlayer} from './use-audio-manager';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  background?: string;
};

const Button: FC<ButtonProps> = ({background, ...props}) => {
  return (
    <button
      {...props}
      type="button"
      sx={{
        display: 'block',
        width: '32px',
        height: '32px',
        padding: '0',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        borderRadius: '50%',
        color: background,
        transition: 'background 0.3s ease 0s',
        '&:hover': {
          background
        },
        '&:active': {
          background
        },
        '&:disabled': {
          color: '#666'
        }
      }}
    />
  );
};

Button.propTypes = {
  background: PropTypes.string.isRequired
};

export type StyledPlayerProps = {
  highlight?: string;
  base?: string;
  hasBorder?: boolean;
  background?: string;
  isInvert?: boolean;
  hasPlaybackspeed?: boolean;
  width?: string;
};

const StyledPlayer: FC<StyledPlayerProps> = ({
  highlight,
  base,
  hasBorder,
  background,
  isInvert,
  hasPlaybackspeed,
  width
}) => {
  const volumeBar = useRef<Range>(null);
  const {playerState, playerProps, dispatch} = useAudioPlayer();

  const {
    src,
    playing,
    duration,
    speed,
    volume,
    muted,
    playingTime,
    seekTime,
    timeAndDuration,
    seeking,
    changingVolume
  } = playerState;

  function togglePlay(): void {
    if (playing) {
      dispatch({type: 'pause'});
    } else {
      dispatch({type: 'play'});
    }
  }

  function updatePlayingTime(time: number): void {
    dispatch({type: 'set-time', time});
  }

  function updateVolume(volume: number): void {
    dispatch({type: 'set-volume', volume});
  }

  return (
    <div
      data-testid="audio-player"
      tabIndex={0}
      sx={{
        padding: '0 10px',
        width,
        border: hasBorder ? `1px solid ${isInvert ? '#eee' : '#111'}` : 'none',
        background,
        display: 'flex',
        alignItems: 'center',
        color: isInvert ? '#eee' : '#111',
        opacity: '0.87',
        fontSize: '14px'
      }}
      onMouseUp={() => dispatch({type: 'stop-interaction'})}
      onKeyUp={() => dispatch({type: 'stop-interaction'})}
    >
      <audio data-testid="audio" {...playerProps} />
      <Button
        disabled={typeof src === 'undefined'}
        background={isInvert ? '#222' : base}
        onClick={() => togglePlay()}
      >
        {playing ? (
          <Pause style={{width: '20px', height: '30px'}} />
        ) : (
          <Play style={{width: '20px', height: '30px'}} />
        )}
      </Button>
      <span
        sx={{
          width: `${timeAndDuration.length - 1}ch`
        }}
      >
        {timeAndDuration}
      </span>
      <div
        sx={{
          display: 'flex',
          flex: '1 1 0%',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div
          sx={{
            height: '54px',
            display: 'flex',
            flex: '1 0 32px',
            padding: '0 15px',
            alignItems: 'center',
            transition: 'flex-basis 0.3s ease 0s',
            '&:focus-within': {'.thumb': {visibility: 'visible'}}
          }}
          onMouseDown={() => dispatch({type: 'start-seeking'})}
          onKeyDown={() => dispatch({type: 'start-seeking'})}
        >
          <ProgressBar
            value={seeking ? seekTime : playingTime}
            max={duration ? Math.floor(duration) : 1}
            color={highlight}
            isInvert={isInvert}
            isInteracting={seeking}
            onChange={updatePlayingTime}
          />
        </div>
        <div
          sx={{
            height: '32px',
            display: 'flex',
            flex: '0 1 15px',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'flex-basis 0.3s ease 0s, background 0.25s ease 0s',
            borderRadius: '25px',
            cursor: 'pointer',
            '&:hover': {
              background: isInvert ? '#222' : base,
              flexBasis: '65%',
              padding: '0 15px'
            },
            '&:active': {
              background: isInvert ? '#222' : base,
              flexBasis: '65%',
              padding: '0 15px'
            },
            '&:focus-within': {
              background: isInvert ? '#222' : base,
              flexBasis: '65%',
              padding: '0 15px',
              '.thumb': {opacity: '1'}
            }
          }}
          onMouseDown={() => dispatch({type: 'start-volume-change'})}
          onTransitionEnd={() => {
            volumeBar.current?.onResize();
          }}
        >
          <ProgressBar
            ref={volumeBar}
            value={volume}
            step={0.01}
            max={1}
            isInteracting={changingVolume}
            color={highlight}
            isInvert={isInvert}
            onChange={updateVolume}
          />
          <Button
            background="unset"
            sx={{
              marginRight: '-15px',
              zIndex: 1
            }}
            onClick={() => dispatch({type: 'toggle-mute'})}
          >
            {muted || volume === 0 ? (
              <MdVolumeOff style={{width: '30px', height: '20px'}} />
            ) : (
              <MdVolumeUp style={{width: '30px', height: '20px'}} />
            )}
          </Button>
        </div>
      </div>
      {hasPlaybackspeed && (
        <Button
          type="button"
          background={isInvert ? '#222' : base}
          color={isInvert ? '#eee' : '#111'}
          onClick={() => dispatch({type: 'toggle-speed'})}
        >
          {speed.toFixed(1)}
        </Button>
      )}
    </div>
  );
};

StyledPlayer.defaultProps = {
  highlight: '#548BF4',
  base: '#ddd',
  hasBorder: true,
  background: 'unset',
  isInvert: false,
  hasPlaybackspeed: true,
  width: '280px'
};

StyledPlayer.propTypes = {
  highlight: PropTypes.string,
  base: PropTypes.string,
  hasBorder: PropTypes.bool,
  background: PropTypes.string,
  isInvert: PropTypes.bool,
  hasPlaybackspeed: PropTypes.bool,
  width: PropTypes.string
};

export default StyledPlayer;
