/** @jsx jsx */
import {jsx, Link as ThemeUiLink} from 'theme-ui';
import {useMDXComponents} from '@mdx-js/react';
import PropTypes from 'prop-types';

// TODO: const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|api|\/api).*/;

const Link = props => {
  const components = useMDXComponents();
  const AppLink = components.a;

  const {as, href, isInternal, isTargetBlank, ...rest} = props;
  const isNotApi = href && !href.startsWith('/api/');

  if (href && isInternal && isNotApi) {
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

Link.propTypes = {
  as: PropTypes.string,
  variant: PropTypes.string,
  href: PropTypes.string,
  isInternal: PropTypes.bool,
  isTargetBlank: PropTypes.bool,
  hasNoAnchor: PropTypes.bool
};

Link.defaultProps = {
  as: undefined,
  href: undefined
};

export default Link;
