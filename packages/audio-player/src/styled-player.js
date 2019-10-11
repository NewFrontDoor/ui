import React, {useState, useRef} from 'react';
import {
  MdPlayArrow as Play,
  MdPause as Pause,
  MdVolumeUp,
  MdVolumeOff
} from 'react-icons/md';
import styled from '@emotion/styled';
import ProgressBar from './progress-bar';
import DefaultPlayer from './default-player';

const ProgVolWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
`;

const VolumeWrapper = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: right;
  overflow: hidden;
  transition: all 0.2s linear;
  padding-left: 10%;
  border-radius: 25px;
  &:hover {
    background: ${props => props.color};
    width: 65%;
    flex: 1 2 auto;
  }
  &:active {
    background: ${props => props.color};
    width: 65%;
  }
  &:focus-within {
    background: ${props => props.color};
    width: 65%;
    .thumb {
      visibility: visible;
    }
  }
`;

const ProgressWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 50px;
  flex: 10 1 auto;
  display: flex;
  align-items: center;
  transition: all 0.2s linear;
  margin-right: 5%;
  &:focus-within {
    .thumb {
      visibility: visible;
    }
  }
`;

const Player = styled.div`
  width: 400px;
  height: 80px;
  border: ${props => (props.border ? `1px solid ${props.color}` : 'none')};
  background: ${props => props.background};
  display: flex;
  align-items: center;
  color: ${props => props.color};
  svg {
    fill: ${props => props.color};
  }
`;

const Button = styled.button`
  position: relative;
  display: block;
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  background: none;
  border-radius: 50%;
  color: ${props => props.color};
  transition: background 0.2s linear;
  &:hover {
    background: ${props => props.background};
  }
  &:active {
    background: ${props => props.background};
  }
`;

const Times = styled.span`
  padding-left: 5px;
  padding-right: 15px;
  font-family: sans-serif;
  opacity: 0.87;
  font-size: 14px;
`;

export default function StyledPlayer({
  audio,
  highlight = '#548BF4',
  base = '#ddd',
  border,
  background,
  invert
}) {
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [playingTime, setTime] = useState(null);
  const [durationTime, setDuration] = useState(null);
  const [volume, setVolume] = useState(0.4);
  const [speed, rotateSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const [enter, setMouseEnter] = useState(false);
  const [down, setMouseDown] = useState(false);
  const volumeBar = useRef(null);

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
      console.log(actual);
      setVolume(actual);
    } else {
      console.log('setting pure value');
      setVolume(value);
    }
  }

  function getBuffered(value) {
    console.log(value);
  }

  return (
    <>
      <DefaultPlayer
        controls
        getBuffered={value => getBuffered(value)}
        setAudioPlayer={setAudioPlayer}
        volume={volume}
        muted={muted}
        src={audio}
        onPause={() => setPlaying(false)}
        onTimeUpdate={e => setTime(e.target.currentTime)}
        onDurationChange={e => setDuration(e.target.duration)}
        onVolumeChange={e => updateVolume(e.target.volume)}
        onPlaying={() => setPlaying(true)}
      />
      <Player
        tabindex="0"
        color={invert ? '#eee' : '#111'}
        border={border}
        background={background}
      >
        <Button
          type="button"
          background={invert ? '#222' : base}
          onClick={() => togglePlay()}
        >
          {playing ? (
            <Pause style={{width: '50px', height: '30px'}} />
          ) : (
            <Play style={{width: '50px', height: '30px'}} />
          )}
        </Button>
        <Times>
          {audioPlayer ? getTime(playingTime) : '0:00'} /{' '}
          {durationTime ? getTime(durationTime) : '0:00'}
        </Times>
        <ProgVolWrapper>
          <ProgressWrapper
            widthFactor={enter || down ? 1 : 2}
            width={enter || down ? '50px' : '65%'}
          >
            <ProgressBar
              values={playingTime ? [playingTime] : [0]}
              max={durationTime ? durationTime.toFixed(0) : 1}
              updateValues={updateValues}
              width={enter || down ? '50px' : '65%'}
              color={highlight}
              invert={invert}
            />
          </ProgressWrapper>
          <VolumeWrapper
            widthFactor={enter || down ? 2 : 1}
            width={enter || down ? '65%' : '50px'}
            color={invert ? '#222' : base}
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onTransitionEnd={() => {
              volumeBar.current.onWindowResize();
            }}
          >
            <Button
              type="button"
              background={invert ? '#222' : base}
              onClick={() => toggleMuted()}
            >
              {muted || volume === 0 ? (
                <MdVolumeOff style={{width: '50px', height: '30px'}} />
              ) : (
                <MdVolumeUp style={{width: '50px', height: '30px'}} />
              )}
            </Button>
            <ProgressBar
              ref={volumeBar}
              tabindex="0"
              values={[volume]}
              step={0.01}
              max={1}
              updateValues={updateVolume}
              interacting={down}
              enter={() => {
                setMouseEnter(true);
                console.log('enter');
              }}
              leave={() => setMouseEnter(false)}
              color={highlight}
              invert={invert}
            />
          </VolumeWrapper>
        </ProgVolWrapper>
        <Button
          type="button"
          background={invert ? '#222' : base}
          color={invert ? '#eee' : '#111'}
          onClick={() => toggleSpeed()}
        >
          {speed.toFixed(1)}
        </Button>
      </Player>
    </>
  );
}
