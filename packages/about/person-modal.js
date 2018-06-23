import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';

const PersonModal = props => (
  <div>
    <Text element="h2">{props.name}</Text>
    <img src={props.image} />
    <Text element="p">{props.body}</Text>
    <Text element="h3">Contact</Text>
    <Text>{props.email}</Text>
    <Text>{props.phone}</Text>
  </div>
);

PersonModal.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string
};

PersonModal.defaultProps = {
  email: '',
  phone: ''
};

export default PersonModal;
