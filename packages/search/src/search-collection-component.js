import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {searchData} from './filter-utility';

export default function SearchCollection({
  dataCollection,
  setSubset,
  fields,
  labels
}) {
  const [searchString, setSearchString] = useState('');
  const [isInclusive, setIsInclusive] = useState(false);

  function updateSubset(value) {
    setSearchString(value);
    const searchParams = {
      searchString: value,
      isInclusive
    };
    const subset = searchData(searchParams, dataCollection, fields);
    setSubset(subset);
  }

  return (
    <div>
      <label htmlFor="searchbox">{labels.searchbox} </label>
      <input
        type="text"
        id="searchBox"
        name="searchBox"
        disabled={!dataCollection}
        value={searchString}
        onChange={e => updateSubset(e.target.value || '')}
      />
      <label htmlFor="searchbox">{labels.checkbox} </label>
      <input
        type="checkbox"
        id="isInclusive"
        name="isInclusive"
        checked={isInclusive}
        disabled={!dataCollection}
        onChange={e => {
          setIsInclusive(e.target.checked);
        }}
      />
    </div>
  );
}

SearchCollection.defaultProps = {
  dataCollection: null,
  labels: {
    searchbox: 'Filter sermons:',
    checkbox: 'Use inclusive mode:'
  }
};

SearchCollection.propTypes = {
  dataCollection: PropTypes.array,
  setSubset: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  labels: PropTypes.objectOf(PropTypes.string)
};
