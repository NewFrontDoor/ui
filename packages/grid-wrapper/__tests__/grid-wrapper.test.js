import {render} from '@testing-library/react';
import gridblock from '../__fixtures__/gridblock';

test('Displays a grid with grid items', async () => {
  const {baseElement} = render(gridblock);

  const actual = 'firstVIEW PAGEsecondVIEW PAGEthirdVIEW PAGE';

  expect(baseElement).toHaveTextContent(actual);
});
