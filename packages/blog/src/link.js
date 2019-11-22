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
    <span dangerouslySetInnerHTML={{ __html: props.title }} />
  </MineralLink>
);

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string.isRequired,
  prefetch: PropTypes.bool
};

Link.defaultProps = {
  as: undefined,
  prefetch: false
};

export default Link;
