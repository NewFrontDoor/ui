import React from 'react';
import {SermonSeriesList} from '../src';
import data from './sermons';

export default <SermonSeriesList loading={!data} seriesSermonList={data} />;
