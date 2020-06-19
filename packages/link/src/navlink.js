import React from 'react';
import {Styled} from 'theme-ui';
import {useRouter} from 'next/router';
import Link from './link';
import PropTypes from 'prop-types';

/** Navlink **/
// Basically just highlights on route and has a 'nav' variant prop

const Navlink = ({link, text}) => {
  const router = useRouter();
  const {slug} = router.query;

  return (
    <Styled.li>
      <Link link={link} variant="nav" color={slug === link ? 'active' : ''}>
        {text}
      </Link>
    </Styled.li>
  );
};

Navlink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Navlink;
