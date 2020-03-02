import React from 'react';
import {render, cleanup, wait} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import styled from '@emotion/styled';
import '@testing-library/jest-dom/extend-expect';
import fixtures from '../__fixtures__/carousel';

const [autoplayOn, autoplayOff] = fixtures;

afterEach(cleanup);

test('Loads carousel', async () => {
  const {component: Carousel, props} = autoplayOff;

  const {baseElement} = render(<Carousel {...props} />);
  const actual = '123';
  await wait(() => {
    expect(baseElement).toHaveTextContent(actual);
  });
});
