import React from 'react';
import {render, waitForElementToBeRemoved} from '@testing-library/react';
import {queryCache} from 'react-query';
import {Bible} from '../src';

afterEach(() => {
  queryCache.clear();
});

test('Loads and displays the passage', async () => {
  const {baseElement, getByText} = render(
    <Bible url="https://labs.bible.org/api/" passage="Genesis 1:1" />
  );

  const actual =
    'The Creation of the World1 In the beginning God created the heavens and the earth.';

  await waitForElementToBeRemoved(() => getByText(/loading/i), {timeout: 2000});

  expect(baseElement).toHaveTextContent(actual);
});
