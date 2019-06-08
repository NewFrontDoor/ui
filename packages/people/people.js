import React from 'react';
import Person from './person';
export default function People({ people }) {
  return (
    <div class="row">
      <div class="col-md-12">
        <h2 class="header-lightBlue text-center">Elders</h2>
        <p class="text-center">
          <strong>Contact:  <a href="mailto:elders@cornerstonehobart.com">elders@cornerstonehobart.com</a></strong>
        </p>
        <br />
        {people.map(person => {
          return (
            <Person name={person.name} title={person.title} url={person.avatar_url}/>
          )
        })}
      </div>
    </div>


  );
}
