/** @jsx jsx */
import PropTypes from 'prop-types';
import {Styled, Flex, jsx} from 'theme-ui';
import format from 'date-fns/format';

const PostPage = ({post, dateFormat, link, blockText}) => {
  const {title, author, _createdAt, categories, date, body} = post;
  return (
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
      <Styled.h2>{title}</Styled.h2>
      <small>by {author}</small>
      <small>Posted on {format(new Date(_createdAt), dateFormat)}</small>
      <small sx={{display: ['none', 'block']}}>
        <ul>
          {categories.map((category) => (
            <li key={category.title + date}>{link(category)}</li>
          ))}
        </ul>
      </small>
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
  );
};

PostPage.propTypes = {
  dateFormat: PropTypes.string,
  link: PropTypes.func.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    _createdAt: PropTypes.string,
    categories: PropTypes.array,
    date: PropTypes.string,
    body: PropTypes.any
  }).isRequired,
  blockText: PropTypes.func.isRequired
};

PostPage.defaultProps = {
  dateFormat: 'dddd, MMMM do yyyy'
};

export default PostPage;
