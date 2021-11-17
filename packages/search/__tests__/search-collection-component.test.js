import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {SearchCollection} from '../src';

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Source', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {heading: 'Date delivered', key: 'date', searchable: false}
];

const sermonData = [
  {
    title: 'Talk two',
    series: 'Main series',
    book: '1 John 2',
    preacher: 'Speaker One',
    date: '2019-10-13'
  },
  {
    title: 'Talk one',
    series: 'Main series',
    book: '1 John 1',
    preacher: 'Speaker One',
    date: '2019-10-06'
  }
];

function setup() {
  const passSearchArray = jest.fn();
  const setSubset = jest.fn();

  render(
    <SearchCollection
      dataCollection={sermonData}
      headers={headers}
      setSubset={setSubset}
      passSearchArray={passSearchArray}
      labels={{
        searchbox: 'Filter talks:',
        checkbox: 'use inclusive mode'
      }}
    />
  );

  return {
    passSearchArray,
    setSubset,
    searchbox: screen.getByLabelText('Filter talks:'),
    checkbox: screen.getByLabelText('use inclusive mode')
  };
}

test('Loads search component', async () => {
  const {searchbox, checkbox} = setup();

  expect(searchbox).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
});

test('Searches data', async () => {
  const {searchbox, passSearchArray, setSubset} = setup();

  fireEvent.change(searchbox, {target: {value: 'two'}});

  expect(passSearchArray).toHaveBeenCalledWith([]);
  expect(setSubset).toHaveBeenCalledWith(sermonData);
});
