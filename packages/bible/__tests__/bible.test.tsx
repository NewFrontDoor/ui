import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import {queryCache} from 'react-query';
import {Bible} from '../src';

jest.mock('ky/umd', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      json: jest.fn().mockResolvedValue([
        {
          bookname: 'Genesis',
          chapter: '1',
          verse: '1',
          text: 'In the beginning God created the heavens and the earth.',
          title: 'The Creation of the World',
          titles: ['The Creation of the World']
        }
      ])
    }))
  };
});

afterEach(() => {
  queryCache.clear();
});

test('Loads and displays the passage', async () => {
  render(<Bible url="https://labs.bible.org/api/" passage="Genesis 1:1" />);

  const actual =
    'The Creation of the World1 In the beginning God created the heavens and the earth.';

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
    timeout: 2000
  });

  expect(screen.getByTestId('bible-text')).toHaveTextContent(actual);
});
