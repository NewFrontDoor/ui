import React from 'react';
import PropTypes from 'prop-types';
import CalendarParent from './calendar-parent';
import {useFetch} from './utilities/hooks';

export function DrupalEvents({url, initialView}) {
  const [data, loading, error] = useFetch(url);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <CalendarParent events={data} initialView={initialView} />;
}

DrupalEvents.propTypes = {
  url: PropTypes.string.isRequired,
  initialView: PropTypes.oneOf(['day', 'week', 'month'])
};

DrupalEvents.defaultProps = {
  initialView: 'month'
};
