import React from 'react';
import {FeaturedSeries} from '../src';

const props = {
  header: 'Featured Series',
  seriesTitle: 'Series Title',
  seriesUrl: 'http://localhost/series_url',
  artUrl:
    'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg'
};

export default <FeaturedSeries {...props} />;
