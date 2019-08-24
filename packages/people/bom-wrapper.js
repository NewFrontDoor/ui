import React from 'react';
import PropTypes from 'prop-types';
import People from './people';
import {useFetch} from './utilities/hooks';

export default function Bomwrapper({apiUrl, email, title}) {
  const [bom, loading, error] = useFetch(apiUrl, {person_type: "bom"});
  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return <People people={bom}  email={email} title={title}/>
}

Bomwrapper.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};