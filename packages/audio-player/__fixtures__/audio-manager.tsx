import React, {FC, Fragment} from 'react';
import {useThemeUI} from 'theme-ui';
import {AudioManager, PlayButton, AudioPlayer} from '../src/audio-manager';

const props = {
  isInvert: false,
  hasBorder: true,
  hasPlaybackspeed: true,
  width: '300px'
};

const track1 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const track2 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

const AudioManagerFixture: FC = () => {
  const {theme} = useThemeUI();

  return (
    <Fragment>
      <AudioManager isPlayOnLoad initialSrc={track1}>
        <AudioPlayer
          {...props}
          base={theme.colors.secondary || '#ddd'}
          highlight={theme.colors.accent || '#edb512'}
        />
        <PlayButton src={track1}>Track 1</PlayButton>
        <PlayButton src={track2} variant="secondary">
          Track 2
        </PlayButton>
      </AudioManager>
    </Fragment>
  );
};

export default AudioManagerFixture;
