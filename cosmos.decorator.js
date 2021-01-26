import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider} from 'theme-ui';
import {QueryClient, QueryClientProvider} from 'react-query';
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

const decorator = (props) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme} components={components} {...props} />
    </QueryClientProvider>
  );
};

export default decorator;
