/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import Bible from '../src';

const BIBLE =
  'https://8dk9jr13id.execute-api.us-west-2.amazonaws.com/dev/bible';

function Wrapper(props) {
  return (
    <div
      css={css`
        max-width: 30rem;
      `}
    >
      <Bible {...props} />
    </div>
  );
}

export default [
  {
    component: Wrapper,
    namespace: 'Bible',
    name: 'Chapter',
    props: {
      url: BIBLE,
      passage: 'Genesis 1'
    }
  },
  {
    component: Wrapper,
    namespace: 'Bible',
    name: 'Verse',
    props: {
      url: BIBLE,
      passage: 'Genesis 1:8'
    }
  },
  {
    component: Wrapper,
    namespace: 'Bible',
    name: 'Passage',
    props: {
      url: BIBLE,
      passage: 'Psalms 100:1–5'
    }
  }
];
