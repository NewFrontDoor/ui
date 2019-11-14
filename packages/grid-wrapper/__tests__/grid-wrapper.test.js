import React from 'react';
import {render, cleanup, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fixtures from '../__fixtures__/gridblock';

const [gridBlock] = fixtures;

afterEach(cleanup);

test('Displays a grid with grid items', async () => {
  const {component: GridBlock, props} = gridBlock;
  const {baseElement} = render(<GridBlock {...props} />);

  const actual = 'firstVIEW PAGEsecondVIEW PAGEthirdVIEW PAGE';

  await wait(() => {
    expect(baseElement).toHaveTextContent(actual);
  });
});
