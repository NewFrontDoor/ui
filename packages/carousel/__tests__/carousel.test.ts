import {render} from '@testing-library/react';
import autoplayOn from '../__fixtures__/autoplay-on';

test('Loads carousel', async () => {
  const {baseElement} = render(autoplayOn);
  const actual = '123';
  expect(baseElement).toHaveTextContent(actual);
});
