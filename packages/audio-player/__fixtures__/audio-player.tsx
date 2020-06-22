/** @jsx jsx */
import {jsx, Text} from 'theme-ui';
import {FC, Fragment} from 'react';
import AudioPlayer from '../src/audio-player';

const props = {
  hasBorder: true,
  hasPlaybackspeed: true,
  width: '300px'
};

const AudioPlayerFixture: FC = () => {
  return (
    <Fragment>
      <Text>Regular</Text>
      <AudioPlayer
        {...props}
        isPlayOnLoad
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
      <Text>Inverted</Text>
      <AudioPlayer
        {...props}
        isInvert
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      />
    </Fragment>
  );
};

export default AudioPlayerFixture;
