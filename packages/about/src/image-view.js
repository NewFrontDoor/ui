import React from 'react';
import PropTypes from 'prop-types';

const ImageView = (props) => (
  <div>
    <img src={props.image} />
    <p>{props.name}</p>
  </div>
);

ImageView.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default ImageView;
