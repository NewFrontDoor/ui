import React from 'react';
import {render, cleanup, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GridBlock from '../src';

afterEach(cleanup);

test('Displays a grid with grid items', async () => {
  const {baseElement} = render(
    <GridBlock items={items}
    columns="2"
    renderProp={data => (<GridItem {...data} />)}
    gap="20px"
    marginBottom="4em" />
  );
  
  await wait(() => {
    expect(baseElement).toHaveTextContent(actual);
  });
});
