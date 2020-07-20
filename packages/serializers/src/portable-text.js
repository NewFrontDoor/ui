import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';

const PortableText = ({blocks, serializers}) => (
  <BlockContent blocks={blocks} serializers={serializers} />
);

PortableText.propTypes = {
  blocks: PropTypes.array.isRequired,
  serializers: PropTypes.object.isRequired
};

export default PortableText;
