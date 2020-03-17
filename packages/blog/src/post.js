/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {Flex, jsx} from 'theme-ui';
import readingTime from 'reading-time';
import Sidebar from './sidebar';

const Post = props => {
  const {body, blockText, sidebar} = props;
  const readingLength = readingTime((body && body.toString()) || 'test');

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
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string
    })
  ).isRequired,
  blockText: PropTypes.func.isRequired,
  link: PropTypes.func.isRequired,
  sidebar: PropTypes.func
};

Post.defaultProps = {
  sidebar: props => <Sidebar {...props} />
};

export default Post;
