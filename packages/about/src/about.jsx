import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import ImageView from './image-view';
import Modal from './modal';
import PersonModal from './person-modal';

const PersonPortal = ({person}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const modal =
    isOpen && typeof document !== 'undefined'
      ? createPortal(
          <Modal closeClick={() => setIsOpen(false)}>
            <PersonModal {...person} />
          </Modal>,
          document.body
        )
      : null;

  return (
    <>
      <ImageView
        image={person.image}
        name={person.name}
        onClick={() => setIsOpen(true)}
      />
      {modal}
    </>
  );
};

const About = (props) => {
  return (
    <div>
      {props.people.map((person) => (
        <PersonPortal key={person.name + '-portal'} person={person} />
      ))}
    </div>
  );
};

/*
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
*/

export default About;
