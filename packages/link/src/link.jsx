import {Link as ThemeUiLink} from 'theme-ui';
import {useMDXComponents} from '@mdx-js/react';

// TODO: const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|api|\/api).*/;

const Link = ({as = undefined, href, isTargetBlank, ...rest}) => {
  const components = useMDXComponents();
  const AppLink = components.a;

  const isNotApi = href && !href.startsWith('/api/');
  const startsWithSlash = href?.startsWith('/');
  const useAppLink = startsWithSlash && isNotApi;

  if (useAppLink && AppLink) {
    return (
      <AppLink as={as} href={href} {...rest}>
        <ThemeUiLink {...rest} />
      </AppLink>
    );
  }

  if (isTargetBlank) {
    rest.target = '_blank';
    rest.rel = 'noreferrer noopener';
  }

  return <ThemeUiLink href={href} {...rest} />;
};

/* Link.propTypes = {
  as: PropTypes.string,
  variant: PropTypes.string,
  href: PropTypes.string.isRequired,
  isTargetBlank: PropTypes.bool,
  hasNoAnchor: PropTypes.bool
};

Link.defaultProps = {
  as: undefined
}; */

export default Link;
