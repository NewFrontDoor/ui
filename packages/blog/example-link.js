/* This is an example link component which will need to
be amended for the specific use case/dependencies required */
import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'react-router-dom/Link';
// Or your preferred Link component from NextJS etc.
import MineralLink from 'mineral-ui/Link';

const Link = props => (
  <MineralLink
    element={RouterLink}
    to={{
      pathname: '/blog',
      search: `?category=${props.title}`
    }}
  >
    {props.title}
  </MineralLink>
);

Link.propTypes = {
  title: PropTypes.string
};

Link.defaultProps = {
  title: undefined
};

export default Link;
