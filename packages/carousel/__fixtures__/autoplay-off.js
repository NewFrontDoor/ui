/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import Carousel from '../src';

const slide = css`
  flex: 0 0 auto;
  width: 80%;
  position: relative;
  padding-left: 10%;
  counter-increment: my-counter;
  div {
    background-color: rgb(40, 44, 52);
    position: relative;
    border-radius: 0.5rem;
    min-height: 200px;
    padding-bottom: 46%;
    font-size: 5rem;
    color: white;
    font-weight: 300;
    line-height: 1;
    text-align: center;
  }
`;

export default (
  <Carousel autoplay={false} delayLength="2000">
    <div key="1" css={slide}>
      <div>1</div>
    </div>
    <div key="2" css={slide}>
      <div>2</div>
    </div>
    <div key="3" css={slide}>
      <div>3</div>
    </div>
  </Carousel>
);
