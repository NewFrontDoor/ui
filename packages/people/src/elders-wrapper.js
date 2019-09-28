import React from 'react';
import PropTypes from 'prop-types';
import People from './people';
import {useFetch} from './utilities/hooks';

export default function Elderswrapper({apiUrl, email, title}) {
  const [elders, loading, error] = useFetch(apiUrl, {person_type: 'elder'});
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <People people={elders} email={email} title={title} />;
}

Elderswrapper.propTypes = {
  apiUrl: PropTypes.string.isRequired
};
