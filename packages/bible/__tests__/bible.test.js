import React from 'react';
import {render, cleanup, wait} from 'react-testing-library';
import 'jest-dom/extend-expect';
import Bible from '../src';

afterEach(cleanup);

test('Loads and displays todays date', async () => {
  const {baseElement} = render(
    <Bible url="https://api.bible.io" passage="Genesis 1:1" />
  );

  const actual =
    'The Creation of the World1 In the beginning God created the heavens and the earth.';

  await wait(() => {
    expect(baseElement).toHaveTextContent(actual);
  });
});
