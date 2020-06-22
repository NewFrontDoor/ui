/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import Post from './post';

const Blog = (props) => {
  const {posts, category} = props;
  return (
    <div>
      {posts
        .filter((post) => {
          if (category && Object.keys(category).length !== 0) {
            return post.categories.map((a) => a.title).includes(category);
          }

          return post;
        })
        .sort((a, b) => {
          return (
            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
          );
        })
        .map((post) => (
          <Post key={post.title} {...post} {...props} />
        ))}
    </div>
  );
};

Blog.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      _createdAt: PropTypes.string.isRequired,
      body: PropTypes.oneOf([PropTypes.array, PropTypes.string]).isRequired,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string
        })
      ).isRequired
    })
  ).isRequired,
  category: PropTypes.objectOf(PropTypes.string)
};

export default Blog;
