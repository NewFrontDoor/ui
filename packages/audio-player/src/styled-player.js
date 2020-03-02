/** @jsx jsx */
import {useState, useRef, useEffect} from 'react';
import {
  MdPlayArrow as Play,
  MdPause as Pause,
  MdVolumeUp,
  MdVolumeOff
} from 'react-icons/md';
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import styled from '@emotion/styled';
import ProgressBar from './progress-bar';
import DefaultPlayer from './default-player';

const ProgVolWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 128px;
  padding-left: 16px;
  display: flex;
  align-items: center;
`;

const VolumeWrapper = styled.div`
  position: relative;
  height: 32px;
  width: 30px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: right;
  overflow: hidden;
  transition: width 0.3s ease 0s, background 0.25s ease 0s;
  border-radius: 25px;
  padding-left: 15px;
  cursor: pointer;
  &:hover {
    background: ${props => props.color};
    width: 65%;
    margin-left: 15px;
  }
  &:active {
    background: ${props => props.color};
    width: 65%;
    margin-left: 15px;
  }
  &:focus-within {
    background: ${props => props.color};
    width: 65%;
    margin-left: 15px;
    .thumb {
      opacity: 1;
    }
  }
`;

const ProgressWrapper = styled.div`
  position: relative;
  height: 54px;
  width: 32px;
  flex: 10 1 auto;
  display: flex;
  align-items: center;
  transition: width 0.3s ease 0s;
  &:focus-within {
    .thumb {
      visibility: visible;
    }
  }
`;

const Player = styled.div`
  padding: 0 10px;
  width: ${props => props.width};
  border: ${props => (props.border ? `1px solid ${props.color}` : 'none')};
  background: ${props => props.background};
  display: flex;
  align-items: center;
  color: ${props => props.color};
  font-family: sans-serif;
  opacity: 0.87;
  font-size: 14px;
  svg {
    fill: ${props => props.color};
  }
`;

const Button = styled.button`
  position: relative;
  display: block;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 50%;
  color: ${props => props.color};
  transition: background 0.3s ease 0s;
  &:hover {
    background: ${props => props.background};
  }
  &:active {
    background: ${props => props.background};
  }
`;

const Times = styled.span`
  padding-left: 4px;
`;

const StyledPlayer = ({
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
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [status, setStatus] = useState(null);
  const [playingTime, setTime] = useState(null);
  const [durationTime, setDuration] = useState(null);
  const [volume, setVolume] = useState(0.4);
  const [speed, rotateSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const [down, setMouseDown] = useState(false);
  const [scrubdown, setScrubDown] = useState(false);
  const volumeBar = useRef(null);

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
    setPlaying(false);
    if (audioPlayer) {
      audioPlayer.load();
    }

    if (audioPlayer && isPlayOnLoad) {
      audioPlayer.play();
    }
  }, [audioPlayer, audio, isPlayOnLoad]);

  function togglePlay() {
    if (playing) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  }

  function toggleSpeed() {
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

  function toggleMuted() {
    setMuted(!muted);
  }

  function getTime(time) {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
      );
    }
  }

  function updateValues(value) {
    audioPlayer.currentTime = value[0];
    setTime(value[0]);
  }

  function updateVolume(value) {
    if (value[0]) {
      const actual = value[0];
      setVolume(actual);
    } else {
      setVolume(value);
    }
  }

  return (
    <Player
      tabindex="0"
      color={isInvert ? '#eee' : '#111'}
      border={hasBorder}
      background={background}
      width={width}
      onMouseUp={() => setMouseDown(false)}
    >
      <DefaultPlayer
        setAudioPlayer={setAudioPlayer}
        volume={volume}
        muted={muted}
        src={audio}
        onPause={() => {
          setPlaying(false);
          setStatus('paused');
        }}
        onTimeUpdate={e => setTime(e.target.currentTime)}
        onDurationChange={e => setDuration(e.target.duration)}
        onVolumeChange={e => updateVolume(e.target.volume)}
        onPlaying={() => {
          setPlaying(true);
          setStatus('playing');
        }}
        onEnded={() => setStatus('stopped')}
      />

      <Button
        type="button"
        background={isInvert ? '#222' : base}
        onClick={() => togglePlay()}
      >
        {playing ? (
          <Pause style={{width: '20px', height: '30px'}} />
        ) : (
          <Play style={{width: '20px', height: '30px'}} />
        )}
      </Button>
      <Times>
        {audioPlayer ? getTime(playingTime) : '0:00'} /{' '}
        {durationTime ? getTime(durationTime) : '0:00'}
      </Times>
      <ProgVolWrapper>
        <ProgressWrapper onMouseDown={() => setScrubDown(true)}>
          <ProgressBar
            values={playingTime ? [playingTime] : [0]}
            max={durationTime ? durationTime.toFixed(0) : 1}
            updateValues={updateValues}
            color={highlight}
            isInvert={isInvert}
            isInteracting={scrubdown}
          />
        </ProgressWrapper>
        <VolumeWrapper
          color={isInvert ? '#222' : base}
          onMouseDown={() => setMouseDown(true)}
          onTransitionEnd={() => {
            volumeBar.current.onWindowResize();
          }}
        >
          <ProgressBar
            ref={volumeBar}
            tabindex="0"
            values={[volume]}
            step={0.01}
            max={1}
            updateValues={updateVolume}
            isInteracting={down}
            color={highlight}
            isInvert={isInvert}
          />
          <Button type="button" background="none" onClick={() => toggleMuted()}>
            {muted || volume === 0 ? (
              <MdVolumeOff style={{width: '30px', height: '20px'}} />
            ) : (
              <MdVolumeUp style={{width: '30px', height: '20px'}} />
            )}
          </Button>
        </VolumeWrapper>
      </ProgVolWrapper>
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
    </Player>
  );
};

StyledPlayer.defaultProps = {
  highlight: '#548BF4',
  base: '#ddd',
  hasBorder: 'true',
  background: 'none',
  isInvert: 'false',
  hasPlaybackspeed: 'true',
  width: '280px',
  statusEvent: () => {},
  isPlayOnLoad: false
};

StyledPlayer.propTypes = {
  audio: PropTypes.any.isRequired,
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
