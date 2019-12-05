import React, {useState} from 'react';
import {useThemeUI} from 'theme-ui';
import {StyledPlayer} from '../src';

const props = {
  isInvert: false,
  hasBorder: true,
  hasPlaybackspeed: true,
  audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  width: '300px'
};

const tracks = {
  track1: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  track2: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
}

export default () => {
  const {theme, colorMode, setColorMode} = useThemeUI();
  const [audioTrack, setTrack] = useState(null)

  function handleClick(event){
    setTrack(tracks[event])
  }

  return (
    <>
    <StyledPlayer
      {...props}
      audio={audioTrack}
      base={theme.colors.secondary || '#ddd'}
      highlight={theme.colors.accent || '#edb512'}
    />
    <button value="track1" onClick={e => handleClick(e.target.value)}>Track 1</button>
    <button value="track2" onClick={e => handleClick(e.target.value)}>Track 2</button>
    </>
  );
};
