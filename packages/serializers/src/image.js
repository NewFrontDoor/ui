import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'theme-ui';

// Still can't make up my mind if baking padding in is a good idea or not...

const ImageSerializer = ({node, urlFor}) => {
  const {alignment, width, variant, wrapping} = node;

  const align =
    wrapping === 'float'
      ? {float: alignment, padding: '20px'}
      : {display: 'block', margin: alignment === 'center' ? 'auto' : 0};

  return (
    <Image
      variant={variant}
      sx={{...align, width: `${width || '100'}%`}}
      src={urlFor(node).url()}
    />
  );
};

ImageSerializer.propTypes = {
  node: PropTypes.node.isRequired,
  urlFor: PropTypes.func.isRequired
};
