import React from 'react';
import {SermonTable} from '../src';
import data from './sermons';

const headers = [
    {heading: 'Title', key: 'node_title', searchable: true},
    {heading: 'Series', key: 'sermonseries', searchable: true},
    {heading: 'Bible Passage(s)', key: 'text', searchable: true},
    {heading: 'Speaker', key: 'preacher', searchable: true},
    {heading: 'Date Preached', key: 'datepreached', searchable: false},
  ];

export default <SermonTable sermons={data} columnHide={[2,3]} headers={headers} sermonDirectory="talks"
renderLink={(directory, slug, title) => (
  <a>{title}</a>
)}
/>;
