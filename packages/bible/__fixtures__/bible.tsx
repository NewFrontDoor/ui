/** @jsx jsx */
import {jsx, Text} from 'theme-ui';
import PropTypes from 'prop-types';
import {Bible} from '../src';

const BIBLE = 'https://serverless.newfrontdoor.org/bible';

const Blockquote = (props) => {
  const {passage} = props;
  return (
    <blockquote
      sx={{
        maxWidth: '30rem',
        margin: '1.5em 10px',
        padding: '0.5em 10px',
        quotes: "'“' '”' '‘' '’'",

        '&::before': {
          content: 'open-quote',
          fontSize: '4em',
          lineHeight: '0.1em',
          marginRight: '0.25em',
          verticalAlign: '-0.4em'
        },

        '& p': {
          display: 'inline'
        }
      }}
    >
      <Bible {...props} />
      <Text
        appearance="prose"
        align="end"
        as="i"
        sx={{
          marginTop: '1rem',
          display: 'block'
        }}
      >
        {' '}
        – {passage}
      </Text>
    </blockquote>
  );
};

Blockquote.propTypes = {
  passage: PropTypes.string.isRequired
};

const fixtures = {
  Inline: <Bible url={BIBLE} passage="Romans 8:31-39" />,
  Chapter: <Blockquote url={BIBLE} passage="Genesis 1" />,
  Verse: <Blockquote url={BIBLE} passage="Genesis 1:8" />,
  Bible: <Blockquote url={BIBLE} passage="Psalms 100:1-5" />
};

export default fixtures;
