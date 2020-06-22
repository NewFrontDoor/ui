import React from 'react';
import PropTypes from 'prop-types';

const PersonModal = (props) => (
  <div>
    <h2>{props.name}</h2>
    <img src={props.image} />
    <p>{props.body}</p>
    <h3>Contact</h3>
    <p>{props.email}</p>
    <p>{props.phone}</p>
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
