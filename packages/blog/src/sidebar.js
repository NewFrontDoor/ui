/** @jsx jsx */
import PropTypes from 'prop-types';
import React from 'react';
import {jsx, Styled} from 'theme-ui';
import format from 'date-fns/format';

const Sidebar = ({
  height,
  title,
  top,
  date,
  dateFormat,
  readingLength,
  categories,
  link,
  overrides
}) => {
  return (
    <div
      sx={{
        flex: '1 0 auto',
        height: ['150px', height || '300px'],
        overflow: 'hidden',
        width: '250px',
        padding: '20px',
        position: 'sticky',
        top: ['40px', top || '110px'],
        background: 'inherit',
        ...overrides
      }}
    >
      <Styled.h2>{title}</Styled.h2>
      <br />
      <small>{format(new Date(date), dateFormat)}</small>
      <br />
      <small>{readingLength.text}</small>
      <br />
      <small sx={{display: ['none', 'block']}}>
        <ul>
          {categories.map(category => (
            <li key={category.title + date}>{link(category.title)}</li>
          ))}
        </ul>
      </small>
    </div>
  );
};

Sidebar.propTypes = {
  categories: PropTypes.any,
  date: PropTypes.any,
  dateFormat: PropTypes.any,
  height: PropTypes.any,
  top: PropTypes.any,
  link: PropTypes.any,
  readingLength: PropTypes.any,
  title: PropTypes.any,
  overrides: PropTypes.object
};

export default Sidebar;
