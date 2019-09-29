import React from 'react';
import PropTypes from 'prop-types';
import People from './people';
import {useFetch} from './utilities/hooks';

export default function AllPeople({groups, apiUrl}) {
  const [apiData, loading, error] = useFetch(apiUrl);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {groups.map(group => {
        return (
          <People
            key={group.title}
            people={apiData.filter(type => type.roles.includes(group.type))}
            email={group.email}
            title={group.title}
          />
        );
      })}
    </div>
  );
}

AllPeople.propTypes = {
  groups: PropTypes.array.isRequired,
  apiUrl: PropTypes.string.isRequired
};
