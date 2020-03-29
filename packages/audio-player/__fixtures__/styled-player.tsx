import React, {FC, Fragment, useState} from 'react';
import {useThemeUI} from 'theme-ui';
import {StyledPlayer} from '..';

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
};

const StyledPlayerFixture: FC = () => {
  const {theme} = useThemeUI();
  const [audioTrack, setTrack] = useState();

  function handleClick(track: string): void {
    setTrack(tracks[track]);
  }

  return (
    <Fragment>
      <StyledPlayer
        {...props}
        isPlayOnLoad
        audio={audioTrack}
        base={theme.colors.secondary || '#ddd'}
        highlight={theme.colors.accent || '#edb512'}
      />
      <button
        type="button"
        value="track1"
        onClick={e => handleClick(e.currentTarget.value)}
      >
        Track 1
      </button>
      <button
        type="button"
        value="track2"
        onClick={e => handleClick(e.currentTarget.value)}
      >
        Track 2
      </button>
    </Fragment>
  );
};

export default StyledPlayerFixture;
