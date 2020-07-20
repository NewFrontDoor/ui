import React from 'react';
import {useThemeUI} from 'theme-ui';
import {Link} from './link';
import PropTypes from 'prop-types';

const LinkSerializer = ({node}) => {
  const {theme} = useThemeUI();
  const styles = Object.keys(theme.text);
  const {action, link, style = 'normal'} = node;

  if (styles.includes(style)) {
    return <Link variant={style}>{action}</Link>;
  }

  return <Link link={link}>{action}</Link>;
};

LinkSerializer.propTypes = {
  node: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  action: PropTypes.any,
  style: PropTypes.string
};
