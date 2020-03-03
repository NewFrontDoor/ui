import React from 'react';
import PropTypes from 'prop-types';

const Person = ({title, name, avatar}) => {
  return (
    <div className="person-container col-md-3 col-sm-6">
      <div className="person-image">
        <img className="image-center" src={avatar} alt={name} />
      </div>
      <div className="person-name text-center">{name}</div>
      <div className="person-title text-center">{title}</div>
    </div>
  );
};

Person.propTypes = {
  name: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  avatar: PropTypes.string
};

export default Person;
