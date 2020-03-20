import React from 'react';
import {render, fireEvent, cleanup, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {SearchCollection} from '../src';

afterEach(cleanup);

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

  const utils = render(
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
    ...utils,
    passSearchArray,
    setSubset,
    searchbox: utils.getByLabelText('Filter talks:'),
    checkbox: utils.getByLabelText('use inclusive mode')
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
