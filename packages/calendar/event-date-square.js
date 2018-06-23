import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';

const ImageView = props => (
  <div>
    <img src={props.image} />
    <Text>{props.name}</Text>
  </div>
);

ImageView.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default ImageView;
