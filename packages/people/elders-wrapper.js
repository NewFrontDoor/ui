import React from 'react';
import PropTypes from 'prop-types';
import People from './people';
import {useFetch} from './utilities/hooks';

export default function Elderswrapper({apiUrl, apiParams}) {
  const [data, loading, error] = useFetch(apiUrl, apiParams);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return <People people={data} />;
}

Elderswrapper.propTypes = {
  url: PropTypes.string.isRequired,
};