import React from 'react';
import Person from './person';

export default function People({people}) {
  return (
    <div className="row">
      <div className="col-md-12">
        <h2 className="header-lightBlue text-center">Elders</h2>
        <p className="text-center">
          <strong>
            Contact:{' '}
            <a href="mailto:elders@cornerstonehobart.com">
              elders@cornerstonehobart.com
            </a>
          </strong>
        </p>
        <br />
        {people.map(person => {
          return (
            <Person
              name={person.name}
              title={person.title}
              url={person.avatar_url}
            />
          );
        })}
      </div>
    </div>
  );
}
