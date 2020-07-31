import React from 'react';
import {render} from '@testing-library/react';
import AudioPlayer from '../src/audio-player';

const audio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

test('Loads native audio player', async () => {
  const {baseElement} = render(<AudioPlayer src={audio} />);

  const duration = '0:00';
  const playingTime = '0:00';
  const speed = '1.0';

  const actual = `${duration} ${playingTime}${speed}`;

  expect(baseElement).toHaveTextContent(actual);
});

test('Encode src url once', async () => {
  const srcWithSpace = 'https://www.exampe.com/examples/audio with spaces.mp3';

  const {baseElement} = render(<AudioPlayer src={srcWithSpace} />);

  const actual = encodeURI(srcWithSpace);

  const audioElement = baseElement.querySelector('audio');

  expect(audioElement).toHaveAttribute('src', actual);
});
