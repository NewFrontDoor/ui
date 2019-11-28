import React from 'react';
import {useThemeUI} from 'theme-ui';
import {StyledPlayer} from '../src';

const props = {
  isInvert: false,
  hasBorder: true,
  hasPlaybackspeed: true,
  audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  width: '300px'
};

export default () => {
  const {theme, colorMode, setColorMode} = useThemeUI();

  return (
    <StyledPlayer
      {...props}
      base={theme.colors.secondary || '#ddd'}
      highlight={theme.colors.accent || '#edb512'}
    />
  );
};
