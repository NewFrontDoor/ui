/** @jsx jsx */
import {jsx, Label, Input} from 'theme-ui';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {searchData, searchArray} from './filter-utility';
import {useDebouncedCallback} from 'use-debounce';

const SearchCollection = ({
  dataCollection,
  setSubset,
  fields,
  labels,
  passSearchArray,
  returnEmptySubset,
  passedSx
}) => {
  const [searchString, setSearchString] = useState('');
  const [isInclusive, setIsInclusive] = useState(false);
  const [debouncedCallback] = useDebouncedCallback(
    // Function
    value => {
      setSearchString(value);
    },
    // Delay in ms
    1000
  );

  useEffect(() => {
    const searchParams = {
      searchString,
      isInclusive
    };
    passSearchArray(searchArray(searchParams));
    const subset = searchData(
      searchParams,
      dataCollection,
      fields,
      returnEmptySubset
    );
    setSubset(subset);
  }, [
    searchString,
    isInclusive,
    dataCollection,
    fields,
    returnEmptySubset,
    passSearchArray,
    setSubset
  ]);

  return (
    <div sx={passedSx}>
      <Label htmlFor="searchbox">{labels.searchbox} </Label>
      <Input
        type="text"
        id="searchBox"
        name="searchBox"
        disabled={!dataCollection}
        value={searchString}
        onChange={e => debouncedCallback(e.target.value)}
      />
      <Label htmlFor="searchbox">{labels.checkbox} </Label>
      <Input
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
};

SearchCollection.defaultProps = {
  dataCollection: null,
  labels: {
    searchbox: 'Filter sermons:',
    checkbox: 'Use inclusive mode:'
  },
  passSearchArray: () => {},
  returnEmptySubset: false,
  passedSx: {}
};

SearchCollection.propTypes = {
  dataCollection: PropTypes.array,
  setSubset: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  labels: PropTypes.objectOf(PropTypes.string),
  passSearchArray: PropTypes.func,
  returnEmptySubset: PropTypes.bool,
  passedSx: PropTypes.object
};

export default SearchCollection;
