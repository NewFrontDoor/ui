import React from 'react';
import PropTypes from 'prop-types';
import People from './people';
import {useFetch} from './utilities/hooks';

export default function Deaconswrapper({apiUrl, email, title}) {
  const [deacons, loading, error] = useFetch(apiUrl, {person_type: 'deacon'});
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <People people={deacons} email={email} title={title} />;
}

Deaconswrapper.propTypes = {
  apiUrl: PropTypes.string.isRequired
};
