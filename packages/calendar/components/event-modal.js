import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';

const EventModal = props => (
  <div>
    {console.log(props)}
    <Text element="h2">{props.name}</Text>
    <Text element="h4">{props.start_time} - {props.end_time}</Text>
    <dl>
    <Text element="dt">Location</Text>
    <Text element="dd">{props.location}</Text>
    </dl>
    <section dangerouslySetInnerHTML={{__html: props.description}} />
  </div>
);

EventModal.propTypes = {
  name: PropTypes.string.isRequired
};

export default EventModal;
