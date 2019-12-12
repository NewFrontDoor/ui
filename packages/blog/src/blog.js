import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Post from './post';
import DateFilter from './date-filter';

export default function Blog({ posts, category, dateFormat }) {
  return (
    <div>
      <DateFilter />
      {posts
        .filter(post => {
          console.log(post.categories)
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
          />
        ))}
    </div>
  );
}

Blog.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      _createdAt: PropTypes.string.isRequired,
      body: PropTypes.string,
      categories: PropTypes.string.isRequired
    })
  ).isRequired,
  category: PropTypes.objectOf(PropTypes.string).isRequired,
  dateFormat: PropTypes.string
};

Blog.defaultProps = {
  dateFormat: 'dddd, MMMM do yyyy'
};
