import React from 'react';
import PropTypes from 'prop-types';
import {Styled} from 'theme-ui';
import Link from './link';

/** Navlink **/
// Basically just highlights on route and has a 'nav' variant prop
const Navlink = ({href, active, children}) => {
  return (
    <Styled.li>
      <Link href={href} variant="nav" color={active ? 'active' : ''}>
        {children}
      </Link>
    </Styled.li>
  );
};

Navlink.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

Navlink.defaulProps = {
  active: false
};

export default Navlink;
