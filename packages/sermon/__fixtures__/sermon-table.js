import React from 'react';
import {SermonTable} from '../src';
import data from './sermons';

const headers = [
  {heading: 'Title', key: 'node_title', searchable: true},
  {heading: 'Series', key: 'sermonseries', searchable: true},
  {heading: 'Bible Passage(s)', key: 'text', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {
    heading: 'Date Preached',
    key: 'datepreached',
    searchable: false,
    hideable: true
  }
];

export default (
  <SermonTable
    sermons={data}
    headers={headers}
    titleKey="node_title"
    sermonDirectory="talks"
    renderLink={(directory, slug, title) => <a>{title}</a>}
    passedSx={{width: '100%'}}
  />
);
