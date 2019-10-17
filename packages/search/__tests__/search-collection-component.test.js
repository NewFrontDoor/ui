import React from 'react';
import {render, cleanup, wait} from '@testing-library/react';
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

test('Loads search component', async () => {
  const {baseElement} = render(
    <SearchCollection
      dataCollection={sermonData}
      headers={headers}
      setSubset={() => {}}
      labels={{
        searchbox: 'Filter talks:',
        checkbox: 'use inclusive mode'
      }}
    />
  );

  const actual =
    '<div><label for="searchbox">Filter talks: </label><input type="text" id="searchBox" name="searchBox" value=""><label for="searchbox">use inclusive mode </label><input type="checkbox" id="isInclusive" name="isInclusive"></div>';

  await wait(() => {
    expect(baseElement).toContainHTML(actual);
  });
});
