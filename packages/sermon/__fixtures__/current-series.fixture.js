import {CurrentSeries} from '../src';

export default {
  component: CurrentSeries,
  props: {
    header: 'Current Series',
    loading: false,
    seriesData: {
      id: 'current-series',
      title: 'Series Title',
      link: 'http://localhost/series_url',
      image:
        'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg'
    }
  }
};
