import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider} from 'theme-ui';
import theme from './cosmos/theme';

function pageLookup(href) {
  // This depends on the fact that no sub-subdirectory of pages contains an index file
  if (href.includes('/')) {
    const root = href
      .split('/')
      .pop()
      .reduce((url, element) => {
        return url.concat('/', element);
      });
    return `/${root}/[slug]`;
  }

  switch (href) {
    case '':
    case 'sermons':
    case 'search':
    case 'all-sermons':
      return `/${href}`;
    default:
      return '/[slug]';
  }
}

const Link = ({href, ...rest}) => {
  return <a href={pageLookup(href)} {...rest} />;
};

Link.propTypes = {
  href: PropTypes.string.isRequired
};

const components = {a: Link};

export default (props) => {
  return <ThemeProvider theme={theme} components={components} {...props} />;
};
