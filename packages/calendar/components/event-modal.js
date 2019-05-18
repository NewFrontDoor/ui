import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import {format} from 'date-fns/esm';

const EventModal = props => (
  <div>
    <Text element="h2">{props.name}</Text>
    <Text element="h3">
      {format(props.start_date, 'PPPPp')} - {format(props.end_date, 'p')}
    </Text>
    <Text element="dt">Location</Text>
    <Text element="dd">{props.where}</Text>
    <div dangerouslySetInnerHTML={{__html: props.description}} />
  </div>
);

EventModal.propTypes = {
  name: PropTypes.string.isRequired
};

export default EventModal;
