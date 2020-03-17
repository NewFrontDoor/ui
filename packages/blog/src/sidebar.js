/** @jsx jsx */
import PropTypes from 'prop-types';
import React from 'react';
import {jsx, Styled} from 'theme-ui';
import format from 'date-fns/format';

const Sidebar = ({
  title,
  date,
  dateFormat,
  readingLength,
  categories,
  link,
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
        <p>{format(new Date(date), dateFormat)}</p>
        <p>{readingLength.text}</p>
        <span sx={{display: ['none', 'block']}}>
          <ul>
            {categories.map(category => (
              <li key={category.title + date}>{link(category.title)}</li>
            ))}
          </ul>
        </span>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string
    })
  ).isRequired,
  link: PropTypes.func.isRequired,
  overrides: PropTypes.object.isRequired,
  readingLength: PropTypes.string
};

export default Sidebar;
