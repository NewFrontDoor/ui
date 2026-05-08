import {ThemeUIProvider} from 'theme-ui';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ApiContext} from '@newfrontdoor/api-config';
import theme from './cosmos/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

const apiConfig = {
  baseUrl: 'https://cornerstoneapi.newfrontdoor.org/api/views/'
};

function pageLookup(href) {
  if (/^https?:\/\//.test(href)) {
    return href;
  }

  // This depends on the fact that no sub-subdirectory of pages contains an index file
  if (href.includes('/')) {
    const parts = href.split('/').filter(Boolean);
    const root = parts[parts.length - 1];
    return root ? `/${root}/[slug]` : '/[slug]';
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

const components = {a: Link};

const decorator = (props) => {
  return (
    <ApiContext.Provider value={apiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeUIProvider theme={theme} components={components} {...props} />
      </QueryClientProvider>
    </ApiContext.Provider>
  );
};

export default decorator;
