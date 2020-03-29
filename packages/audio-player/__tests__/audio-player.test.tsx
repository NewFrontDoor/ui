import React from 'react';
import {render} from '@testing-library/react';
import {DefaultPlayer} from '..';

const audio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

test('Loads native audio player', async () => {
  const {baseElement} = render(<DefaultPlayer controls src={audio} />);

  const actual = 'Your browser does not support theaudioelement.';

  expect(baseElement).toHaveTextContent(actual);
});
