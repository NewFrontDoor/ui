import {render, screen} from '@testing-library/react';
import autoplayOn from '../__fixtures__/autoplay-on';

test('Loads carousel', async () => {
  render(autoplayOn);
  const actual = '123';
  expect(screen.getByTestId('carousel-slides')).toHaveTextContent(actual);
});
