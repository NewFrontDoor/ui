/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import Post from './post';

const Blog = ({posts, category, dateFormat, blockText, link, options, sidebar, overrides}) => {
  return (
    <div>
      {posts
        .filter(post => {
          if (category && Object.keys(category).length !== 0) {
            return post.categories.map(a => a.title).includes(category);
          }

          return post;
        })
        .sort((a, b) => {
          return (
            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
          );
        })
        .map(post => (
          <Post
            key={post.title}
            title={post.title}
            date={post._createdAt}
            dateFormat={dateFormat}
            categories={post.categories}
            body={post.body}
            blockText={blockText}
            link={link}
            options={options}
            sidebar={sidebar}
            overrides={overrides}
          />
        ))}
    </div>
  );
};

Blog.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      _createdAt: PropTypes.string.isRequired,
      body: PropTypes.string,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string
        })
      ).isRequired
    })
  ).isRequired,
  category: PropTypes.objectOf(PropTypes.string),
  dateFormat: PropTypes.string,
  blockText: PropTypes.func.isRequired,
  link: PropTypes.func.isRequired
};

Blog.defaultProps = {
  dateFormat: 'dddd, MMMM do yyyy'
};

export default Blog;
