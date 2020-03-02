import React from 'react';
import PropTypes from 'prop-types';
import MineralLink from 'mineral-ui/Link';

const Link = props => (
  <MineralLink
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

export default Link;
