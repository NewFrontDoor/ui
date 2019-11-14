import {SearchCollection} from '../src';

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

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Source', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {heading: 'Date delivered', key: 'date', searchable: false}
];

export default {
  component: SearchCollection,
  props: {
    headers,
    dataCollection: sermonData,
    setSubset: () => {},
    labels: {
      searchbox: 'Filter talks:',
      checkbox: 'use inclusive mode'
    }
  }
};
