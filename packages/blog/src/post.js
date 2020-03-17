/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {Flex, jsx} from 'theme-ui';
import readingTime from 'reading-time';

const Post = props => {
  const {body, blockText, sidebar, bodyTransform} = props;
  console.log(props);
  const readingLength = readingTime((body && bodyTransform(body)) || 'test');

  const sidebarProps = {
    ...props,
    readingLength
  };

  return body ? (
    <Flex
      sx={{
        flexFlow: 'row wrap',
        margin: 'auto',
        width: '100vw',
        maxWidth: '920px',
        paddingTop: '40px',
        minHeight: [null, '600px']
      }}
    >
      {sidebar(sidebarProps)}
      <div
        sx={{
          flex: '1 0 auto',
          width: 'auto',
          maxWidth: ['24em', '32em'],
          paddingTop: [null, '23.5px']
        }}
      >
        {blockText(body)}
      </div>
    </Flex>
  ) : null;
};

Post.propTypes = {
  body: PropTypes.string.isRequired,
  blockText: PropTypes.func.isRequired,
  sidebar: PropTypes.func.isRequired,
  bodyTransform: PropTypes.func.isRequired
};

export default Post;
