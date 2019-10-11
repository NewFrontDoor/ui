import React from 'react';
import {render, cleanup, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AudioPlayer from '../src';

afterEach(cleanup);

const audio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

test('Loads native audio player', async () => {
  const {baseElement} = render(<AudioPlayer controls src={audio} />);

  const actual =
    '';

  await wait(() => {
    expect(baseElement).toHaveTextContent(actual);
  });
});
