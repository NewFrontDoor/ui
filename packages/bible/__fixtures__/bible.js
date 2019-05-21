/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import Bible from '../src';

const BIBLE =
  'https://8dk9jr13id.execute-api.us-west-2.amazonaws.com/dev/bible';

function Blockquote(props) {
  const {passage} = props;
  return (
    <blockquote
      css={css`
        max-width: 30rem;
        margin: 1.5em 10px;
        padding: 0.5em 10px;
        quotes: '“' '”' '‘' '’';

        &::before {
          content: open-quote;
          font-size: 4em;
          line-height: 0.1em;
          margin-right: 0.25em;
          vertical-align: -0.4em;
        }

        & p {
          display: inline;
        }
      `}
    >
      <Bible {...props} />
      <Text
        appearance="prose"
        align="end"
        as="i"
        css={css`
          margin-top: 1rem;
          display: block;
        `}
      >
        {' '}
        – {passage}
      </Text>
    </blockquote>
  );
}

Blockquote.propTypes = {
  passage: PropTypes.string.isRequired
};

export default [
  {
    component: Bible,
    name: 'Inline',
    props: {
      url: BIBLE,
      passage: 'Romans 8:31-39'
    }
  },
  {
    component: Blockquote,
    namespace: 'Bible',
    name: 'Chapter',
    props: {
      url: BIBLE,
      passage: 'Genesis 1'
    }
  },
  {
    component: Blockquote,
    namespace: 'Bible',
    name: 'Verse',
    props: {
      url: BIBLE,
      passage: 'Genesis 1:8'
    }
  },
  {
    component: Blockquote,
    namespace: 'Bible',
    name: 'Passage',
    props: {
      url: BIBLE,
      passage: 'Psalms 100:1–5'
    }
  }
];
