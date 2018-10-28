import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Post from './post';

class Blog extends Component {
  render() {
    return (
      <>
        {this.props.posts
          .filter(post => {
            if (
              this.props.category &&
              Object.keys(this.props.category).length !== 0
            ) {
              return post.categories
                .map(a => a.title)
                .includes(this.props.category);
            }
            return post;
          })
          .sort((a, b) => {
            return (
              new Date(a._createdAt).getTime() -
              new Date(b._createdAt).getTime()
            );
          })
          .reverse()
          .map(post => (
            <Post
              key={post.title}
              title={post.title}
              date={post._createdAt}
              dateFormat={this.props.dateFormat}
              categories={post.categories}
              body={post.body}
              renderContent={this.props.renderContent}
              linkComponent={this.props.linkComponent}
            />
          ))}
      </>
    );
  }
}

export default Blog;

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
  linkComponent: PropTypes.func.isRequired,
  renderContent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  dateFormat: PropTypes.string
};

Blog.defaultProps = {
  dateFormat: 'dddd, MMMM do YYYY'
};