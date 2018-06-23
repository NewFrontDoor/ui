import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';

const EventModal = props => (
  <div>
    <Text element="h2">{props.name}</Text>
  </div>
);

EventModal.propTypes = {
  name: PropTypes.string.isRequired
};

export default EventModal;
