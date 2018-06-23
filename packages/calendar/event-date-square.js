import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';

const EventSquare = props => (
  <div>
    <Text>{props.name}</Text>
  </div>
);

EventSquare.propTypes = {
  name: PropTypes.string.isRequired
};

export default ImageView;
