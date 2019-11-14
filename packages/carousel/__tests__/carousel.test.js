import React from 'react';
import {render, cleanup, wait} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import styled from '@emotion/styled';
import '@testing-library/jest-dom/extend-expect';
import Carousel from '../src';

const Slide = styled.div`
  flex: 0 0 auto;
  width: 80%;
  position: relative;
  padding-left: 1rem;
  counter-increment: embla;
`;

const Inner = styled.div`
  background-color: rgb(40, 44, 52);
  position: relative;
  border-radius: 0.5rem;
  min-height: 200px;
  padding-bottom: 46%;
  font-size: 5rem;
  &:before {
    color: white;
    font-weight: 300;
    line-height: 1;
    content: counter(embla);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

afterEach(cleanup);

test('Loads carousel', async () => {
  const {baseElement} = render(
    <Carousel autoplay delayLength={1000}>
      <Slide>
        <Inner />
      </Slide>
      <Slide>
        <Inner />
      </Slide>
      <Slide>
        <Inner />
      </Slide>
      <Slide>
        <Inner />
      </Slide>
    </Carousel>
  );

  await wait(() => {
    expect(baseElement).toHaveTextContent(actual);
  });
});
