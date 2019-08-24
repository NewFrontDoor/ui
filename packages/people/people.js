import React from 'react';
import Person from './person';

export default function People({ people, title, email}) {
  return (
    <React.Fragment>
      <div class="row">
        <div class="col-md-12">
          <h2 class="header-lightBlue text-center">
            {title}
          </h2>
          <p class="text-center">
            <strong>Contact:  <a href="mailto:elders@cornerstonehobart.com">
              {email}
            </a></strong>
          </p>
          <br />
          {people.map(person => {
            return (
              <Person name={person.name} title={person.title} url={person.avatar_url} />
            )
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
