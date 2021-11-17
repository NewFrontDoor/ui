import React from 'react';
import {render, screen} from '@testing-library/react';
import AudioPlayer from '../src/audio-player';

const audio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

test('Loads native audio player', async () => {
  render(<AudioPlayer src={audio} />);

  const duration = '0:00';
  const playingTime = '0:00';
  const speed = '1.0';

  const actual = `${duration} ${playingTime}${speed}`;

  expect(screen.getByTestId('audio-player')).toHaveTextContent(actual);
});

test('Encode src url once', async () => {
  const srcWithSpace = 'https://www.exampe.com/examples/audio with spaces.mp3';

  render(<AudioPlayer src={srcWithSpace} />);

  const actual = encodeURI(srcWithSpace);

  const audioElement = screen.getByTestId('audio');

  expect(audioElement).toHaveAttribute('src', actual);
});
