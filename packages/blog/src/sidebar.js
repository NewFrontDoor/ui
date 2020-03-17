/** @jsx jsx */
import PropTypes from 'prop-types';
import React from 'react';
import {jsx, Styled} from 'theme-ui';
import format from 'date-fns/format';

const Sidebar = ({
  title,
  author,
  _createdAt,
  dateFormat,
  readingLength,
  categories,
  Link,
  overrides
}) => {
  return (
    <aside
      sx={{
        flex: '1 0 auto',
        height: ['150px' || '300px'],
        overflow: 'hidden',
        width: '250px',
        padding: '20px',
        position: 'sticky',
        top: ['40px' || '110px'],
        background: 'inherit',
        marginRight: '30px',
        ...overrides
      }}
    >
      <Styled.h2>{title}</Styled.h2>
      <div>
        {author && (
          <Link link={author._id}>
            <p>{author}</p>
          </Link>
        )}
        <p>{format(new Date(_createdAt), dateFormat)}</p>
        <p>{readingLength.text}</p>
        <span sx={{display: ['none', 'block']}}>
          <ul>
            {categories.map(category => (
              <li key={category.title + _createdAt}>
                <Link link={category._id}>
                  <p>{category.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </span>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  _createdAt: PropTypes.string.isRequired,
  dateFormat: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string
    })
  ).isRequired,
  Link: PropTypes.element.isRequired,
  overrides: PropTypes.object,
  readingLength: PropTypes.string
};

Sidebar.defaultProps = {
  overrides: {},
  dateFormat: 'EEEE, MMMM do yyyy'
};

export default Sidebar;
