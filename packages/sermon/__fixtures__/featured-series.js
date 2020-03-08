import React from 'react';
import {FeaturedSeries} from '../src';

const props = {
  header: 'Featured Series',
  loading: false,
  seriesData: {
    id: 'featured-series',
    title: 'Series Title',
    link: 'http://localhost/series_url',
    image:
      'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg'
  }
};

export default <FeaturedSeries {...props} />;
