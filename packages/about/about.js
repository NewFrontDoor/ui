import React from 'react';
import PropTypes from 'prop-types';
import {PortalWithState} from 'react-portal';
import ImageView from './image-view';
import Modal from './modal';
import PersonModal from './person-modal';

class About extends React.Component {
  openPerson() {}

  render() {
    return (
      <div>
        {this.props.people.map(person => (
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

About.propTypes = {
  people: PropTypes.object.isRequired
};
