import React from 'react';
import {StyledPlayer} from '../src';

const props = {
  base: '#ddd',
  highlight: '#edb512',
  isInvert: false,
  hasBorder: true,
  hasPlaybackspeed: true,
  audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  width: '300px'
};

export default <StyledPlayer {...props} />;
