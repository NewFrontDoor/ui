import React from 'react';
import {Styled, Text, useThemeUI} from 'theme-ui';
import BlockContent from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';

const BlockRenderer = (props) => {
  const {theme} = useThemeUI();
  const styles = Object.keys(theme.text);
  const style = props.node.style || 'normal';

  const elements = {
    h1: <Styled.h1>{props.children}</Styled.h1>,
    h2: <Styled.h2>{props.children}</Styled.h2>,
    h3: <Styled.h3>{props.children}</Styled.h3>,
    h4: <Styled.h4>{props.children}</Styled.h4>,
    h5: <Styled.h5>{props.children}</Styled.h5>,
    h6: <Styled.h6>{props.children}</Styled.h6>
  };

  if (/^h\d/.test(style)) return elements[style];

  if (style === 'normal') return <Styled.p>{props.children}</Styled.p>;

  if (style === 'blockquote')
    return <Text variant="blockquote">{props.children}</Text>;

  if (style === 'warning')
    return <Text variant="warning">{props.children}</Text>;

  if (styles.includes(style))
    return <Text variant={style}>{props.children}</Text>;

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props);
};

BlockRenderer.propTypes = {
  children: PropTypes.any,
  node: PropTypes.object.isRequired
};
