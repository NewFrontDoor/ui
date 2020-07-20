import React from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';
import {useQuery} from 'react-query';
import People from './people';

async function fetchPeople(apiUrl) {
  return ky(apiUrl).json();
}

const AllPeople = ({groups, apiUrl}) => {
  const {status, data, error} = useQuery(apiUrl, fetchPeople);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {groups.map((group) => {
        return (
          <People
            key={group.title}
            people={data.filter((type) => type.roles.includes(group.type))}
            email={group.email}
            title={group.title}
          />
        );
      })}
    </div>
  );
};

AllPeople.propTypes = {
  groups: PropTypes.array.isRequired,
  apiUrl: PropTypes.string.isRequired
};

export default AllPeople;
