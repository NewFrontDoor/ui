import React, {FC, Fragment} from 'react';
import {AudioManager, NativePlayer, PlayButton} from '../src/audio-manager';

const track1 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const track2 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

const StyledPlayerFixture: FC = () => {
  return (
    <Fragment>
      <AudioManager isPlayOnLoad initialSrc={track1}>
        <NativePlayer controls />
        <PlayButton src={track1}>Track 1</PlayButton>
        <PlayButton src={track2} variant="secondary">
          Track 2
        </PlayButton>
      </AudioManager>
    </Fragment>
  );
};

export default StyledPlayerFixture;
