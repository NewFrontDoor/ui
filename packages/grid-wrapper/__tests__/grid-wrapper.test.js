import {render, cleanup, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import gridblock from '../__fixtures__/gridblock';

afterEach(cleanup);

test('Displays a grid with grid items', async () => {
  const {baseElement} = render(gridblock);

  const actual = 'firstVIEW PAGEsecondVIEW PAGEthirdVIEW PAGE';

  await wait(() => {
    expect(baseElement).toHaveTextContent(actual);
  });
});
