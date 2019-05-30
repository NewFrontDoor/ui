import React from 'react';
import PropTypes from 'prop-types';
import CalendarParent from './calendar-parent';
import {useFetch} from './utilities/hooks.js';

export function DrupalEvents({url, initialView}) {
  const [data, loading] = useFetch(url);
  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <CalendarParent events={data} initialView={initialView} />
      )}
    </>
  );
}

DrupalEvents.propTypes = {
  url: PropTypes.string.isRequired,
  initialView: PropTypes.oneOf(['day', 'week', 'month'])
};

DrupalEvents.defaultProps = {
  initialView: 'month'
};
