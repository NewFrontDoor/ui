
import {vi} from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Bible} from '../src';

vi.mock('ky', () => {
  return {
    __esModule: true,
    default: vi.fn().mockImplementation(() => ({
      json: vi.fn().mockResolvedValue([
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

test('Loads and displays the passage', async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Bible url="https://labs.bible.org/api/" passage="Genesis 1:1" />
    </QueryClientProvider>
  );

  const actual =
    'The Creation of the World1 In the beginning God created the heavens and the earth.';

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
    timeout: 2000
  });

  expect(screen.getByTestId('bible-text')).toHaveTextContent(actual);
});
