import React from 'react';
import PropTypes from 'prop-types';
import Person from './person';

const People = ({people, title, email}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <h2 className="header-lightBlue text-center">{title}</h2>
        <p className="text-center">
          <strong>
            Contact: <a href="mailto:elders@cornerstonehobart.com">{email}</a>
          </strong>
        </p>
        <br />
        {people.map(person => {
          return (
            <Person
              key={person.name + title}
              name={person.name}
              title={person.title}
              avatar={person.avatar_url}
            />
          );
        })}
      </div>
    </div>
  );
};

People.propTypes = {
  email: PropTypes.string,
  title: PropTypes.string,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      avatar_url: PropTypes.string
    })
  )
};

export default People;
