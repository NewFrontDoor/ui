import React from 'react';
import PropTypes from 'prop-types';
import People from './people';
import {useFetch} from './utilities/hooks';

export default function Staffwrapper({apiUrl, email, title}) {
  const [staff, loading, error] = useFetch(apiUrl, {person_type:"staff"});
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return <People people={staff}  email={email} title={title}/>;
}

Staffwrapper.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};