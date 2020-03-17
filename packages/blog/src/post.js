/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {Flex, jsx} from 'theme-ui';
import readingTime from 'reading-time';
import DefaultSidebar from './sidebar';

const Post = props => {
  const {body, blockText, bodyTransform, Sidebar} = props;
  const readingLength = readingTime(bodyTransform(body));

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
      <Sidebar {...props} readingLength={readingLength} />
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
  Sidebar: PropTypes.elementType,
  bodyTransform: PropTypes.func
};

Post.defaultProps = {
  bodyTransform: props => props,
  Sidebar: DefaultSidebar
};

export default Post;
