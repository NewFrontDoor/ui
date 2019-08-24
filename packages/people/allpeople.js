import React from 'react';
import Person from './person';
import {useFetch} from './utilities/hooks';
export default function People({ groups, apiUrl }) {
  const [apiData, loading, error] = useFetch(apiUrl);
  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (<div>
    {groups.map(group => {
      return (
        <div class="row">
          <div class="col-md-12">
            <h2 class="header-lightBlue text-center">{group.title}</h2>
            <p class="text-center">
              <strong>Contact:  <a href={`mailto:${group.email}`}>{group.email}</a></strong>
            </p>
            <br />
            {apiData.filter(type => {
              console.log(type.roles)
              console.log(type.roles.includes(group.type))
              return type.roles.includes(group.type)
            }).map(person => {
              return (
                <Person name={person.name} title={person.title} url={person.avatar_url} />
              )
            })}
          </div>
        </div>
      );
    })}
  </div>)

}
