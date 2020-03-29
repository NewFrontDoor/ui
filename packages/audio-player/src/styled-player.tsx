/** @jsx jsx */
import {jsx} from 'theme-ui';
import {FC, HTMLProps, useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  MdPlayArrow as Play,
  MdPause as Pause,
  MdVolumeUp,
  MdVolumeOff
} from 'react-icons/md';
import ProgressBar from './progress-bar';
import DefaultPlayer from './default-player';

type Status = 'playing' | 'paused' | 'stopped';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  background: string;
};

const Button: FC<ButtonProps> = ({background, ...props}) => {
  return (
    <button
      {...props}
      type="button"
      sx={{
        position: 'relative',
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

type StyledPlayerProps = {
  audio?: string;
  highlight?: string;
  base?: string;
  hasBorder: boolean;
  background?: string;
  isInvert: boolean;
  hasPlaybackspeed: boolean;
  width: string;
  statusEvent?: (status: Status) => void;
  isPlayOnLoad?: boolean;
};

const StyledPlayer: FC<StyledPlayerProps> = ({
  audio,
  highlight = '#548BF4',
  base = '#ddd',
  hasBorder,
  background,
  isInvert,
  hasPlaybackspeed,
  width,
  isPlayOnLoad,
  statusEvent
}) => {
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement>(null);
  const [status, setStatus] = useState<Status>(null);
  const [playingTime, setTime] = useState<number>(null);
  const [durationTime, setDuration] = useState<number>(null);
  const [volume, setVolume] = useState<number>(0.4);
  const [speed, rotateSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const [down, setMouseDown] = useState(false);
  const [scrubdown, setScrubDown] = useState(false);
  const volumeBar = useRef(null);

  const playing = status === 'playing';

  useEffect(() => {
    document.addEventListener(
      'mouseup',
      () => {
        setMouseDown(false);
        setScrubDown(false);
      },
      false
    );
    return () => {
      document.removeEventListener(
        'mouseup',
        () => {
          setMouseDown(false);
          setScrubDown(false);
        },
        false
      );
    };
  }, []);

  useEffect(() => {
    statusEvent(status);
  }, [statusEvent, status]);

  useEffect(() => {
    setStatus('paused');
    if (audioPlayer) {
      audioPlayer.load();
    }

    if (audioPlayer && isPlayOnLoad) {
      audioPlayer.play().catch(() => setStatus('paused'));
    }
  }, [audioPlayer, audio, isPlayOnLoad]);

  function togglePlay(): void {
    if (playing) {
      audioPlayer.pause();
    } else {
      audioPlayer.play().catch(() => setStatus('paused'));
    }
  }

  function toggleSpeed(): void {
    switch (speed) {
      case 1:
        rotateSpeed(1.2);
        audioPlayer.playbackRate = 1.2;
        break;
      case 1.2:
        rotateSpeed(1.5);
        audioPlayer.playbackRate = 1.5;
        break;
      case 1.5:
        rotateSpeed(2);
        audioPlayer.playbackRate = 2;
        break;
      case 2:
        rotateSpeed(1);
        audioPlayer.playbackRate = 1;
        break;
      default:
        rotateSpeed(1);
        audioPlayer.playbackRate = 1;
    }
  }

  function toggleMuted(): void {
    setMuted(!muted);
  }

  function getTime(time: number): string {
    if (!isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = `0${Math.floor(time % 60)}`.slice(-2);
      return `${minutes}:${seconds}`;
    }
  }

  function updateValues(value: number[]): void {
    audioPlayer.currentTime = value[0];
    setTime(value[0]);
  }

  function updateVolume(volume: number[] | number): void {
    if (Array.isArray(volume)) {
      setVolume(volume[0]);
    } else {
      setVolume(volume);
    }
  }

  return (
    <div
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
      onMouseUp={() => setMouseDown(false)}
    >
      <DefaultPlayer
        setAudioPlayer={setAudioPlayer}
        volume={volume}
        muted={muted}
        src={audio}
        onPause={() => {
          setStatus('paused');
        }}
        onTimeUpdate={e => setTime(e.currentTarget.currentTime)}
        onDurationChange={e => setDuration(e.currentTarget.duration)}
        onVolumeChange={e => updateVolume(e.currentTarget.volume)}
        onPlaying={() => {
          setStatus('playing');
        }}
        onEnded={() => setStatus('stopped')}
      />

      <Button
        disabled={typeof audio === 'undefined'}
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
          paddingLeft: '4px'
        }}
      >
        {audioPlayer ? getTime(playingTime) : '0:00'} /{' '}
        {durationTime ? getTime(durationTime) : '0:00'}
      </span>
      <div
        sx={{
          position: 'relative',
          height: '100%',
          width: '128px',
          paddingLeft: '16px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          sx={{
            position: 'relative',
            height: '54px',
            width: '32px',
            flex: '10 1 auto',
            display: 'flex',
            alignItems: 'center',
            transition: 'width 0.3s ease 0s',
            '&:focus-within': {'.thumb': {visibility: 'visible'}}
          }}
          onMouseDown={() => setScrubDown(true)}
        >
          <ProgressBar
            values={playingTime ? [playingTime] : [0]}
            max={durationTime ? Math.floor(durationTime) : 1}
            updateValues={updateValues}
            color={highlight}
            isInvert={isInvert}
            isInteracting={scrubdown}
          />
        </div>
        <div
          sx={{
            position: 'relative',
            height: '32px',
            width: '30px',
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            overflow: 'hidden',
            transition: 'width 0.3s ease 0s, background 0.25s ease 0s',
            borderRadius: '25px',
            paddingLeft: '15px',
            cursor: 'pointer',
            '&:hover': {
              background: isInvert ? '#222' : base,
              width: '65%',
              marginLeft: '15px'
            },
            '&:active': {
              background: isInvert ? '#222' : base,
              width: '65%',
              marginLeft: '15px'
            },
            '&:focus-within': {
              background: isInvert ? '#222' : base,
              width: '65%',
              marginLeft: '15px',
              '.thumb': {opacity: '1'}
            }
          }}
          onMouseDown={() => setMouseDown(true)}
          onTransitionEnd={() => {
            volumeBar.current.onWindowResize();
          }}
        >
          <ProgressBar
            ref={volumeBar}
            values={[volume]}
            step={0.01}
            max={1}
            updateValues={updateVolume}
            isInteracting={down}
            color={highlight}
            isInvert={isInvert}
          />
          <Button background="none" onClick={() => toggleMuted()}>
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
          onClick={() => toggleSpeed()}
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
  background: 'none',
  isInvert: false,
  hasPlaybackspeed: true,
  width: '280px',
  statusEvent: () => undefined,
  isPlayOnLoad: false
};

StyledPlayer.propTypes = {
  audio: PropTypes.string,
  highlight: PropTypes.string,
  base: PropTypes.string,
  hasBorder: PropTypes.bool,
  background: PropTypes.string,
  isInvert: PropTypes.bool,
  hasPlaybackspeed: PropTypes.bool,
  width: PropTypes.string,
  statusEvent: PropTypes.func,
  isPlayOnLoad: PropTypes.bool
};

export default StyledPlayer;
