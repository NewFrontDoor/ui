import {render, cleanup, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import autoplayOn from '../__fixtures__/autoplay on';

afterEach(cleanup);

test('Loads carousel', async () => {
  const {baseElement} = render(autoplayOn);
  const actual = '123';
  await wait(() => {
    expect(baseElement).toHaveTextContent(actual);
  });
});
