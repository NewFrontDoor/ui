import React from 'react';
import Person from './person';

export default function People({people, title, email}) {
  return (
    <>
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
                name={person.name}
                title={person.title}
                avatar={person.avatar_url}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
