import React from 'react';
import PropTypes from 'prop-types';
import {PortalWithState} from 'react-portal';
import ImageView from './image-view';
import Modal from './modal';
import PersonModal from './person-modal';

export default class Calendar extends React.Component {
  render() {
    return (
      <div>
        {this.props.events.map(event => (
          <PortalWithState
            key={person.name + '-portal'}
            closeOnOutsideClick
            closeOnEsc
          >
            {({openPortal, closePortal, portal}) => [
              <ImageView
                key={person.image}
                image={person.image}
                name={person.name}
                onClick={openPortal}
              />,
              portal(
                <Modal closeClick={closePortal}>
                  <PersonModal person={person} />
                </Modal>
              )
            ]}
          </PortalWithState>
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      picture: PropTypes.string,
      // eslint-disable-next-line camelcase
      calendar_id: PropTypes.string.isRequired,
      interval: PropTypes.string,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      admin_notes: PropTypes.string,
      where: PropTypes.string,
      // eslint-disable-next-line camelcase
      start_date: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      end_date: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      all_day: PropTypes.string.isRequired,
      url: PropTypes.string,
      color: PropTypes.string,
      locations: PropTypes.object
    })
  ).isRequired
};
