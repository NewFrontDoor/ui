import React, {FC, Fragment, useState} from 'react';
import {DefaultPlayer} from '..';

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

const DefaultPlayerFixture: FC = () => {
  const [audioTrack, setTrack] = useState(null);

  function handleClick(track: string): void {
    setTrack(tracks[track]);
  }

  return (
    <Fragment>
      <DefaultPlayer {...props} controls src={audioTrack} />
      <div>
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
      </div>
    </Fragment>
  );
};

export default DefaultPlayerFixture;
