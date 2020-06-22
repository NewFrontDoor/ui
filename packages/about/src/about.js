import React from 'react';
import PropTypes from 'prop-types';
import {PortalWithState} from 'react-portal';
import ImageView from './image-view';
import Modal from './modal';
import PersonModal from './person-modal';

const About = (props) => {
  return (
    <div>
      {props.people.map((person) => (
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
                <PersonModal {...person} />
              </Modal>
            )
          ]}
        </PortalWithState>
      ))}
    </div>
  );
};

About.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string
    })
  ).isRequired
};

export default About;
