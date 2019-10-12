import {RecentSeries} from '../src';

export default {
  component: RecentSeries,
  fetch: [
    {
      matcher: '*',
      response: [
        {
          node_title: 'Recent Series 1',
          start_date:
            '<span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-05-19T00:00:00+10:00">Sunday, May 19, 2019</span>',
          end_date:
            '<span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-05-19T00:00:00+10:00">Sunday, June 16, 2019</span>',
          series_img:
            'https://cornerstoneapi.newfrontdoor.org/sites/cornerstoneapi.newfrontdoor.org/files/wave-1913559_1920.jpg',
          series_id: '1'
        },
        {
          node_title: 'Recent Series 2',
          start_date:
            '<span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-02-10T00:00:00+11:00">Sunday, February 10, 2019</span>',
          end_date:
            '<span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-02-10T00:00:00+11:00">Saturday, June 1, 2019</span>',
          series_img:
            'https://cornerstoneapi.newfrontdoor.org/sites/cornerstoneapi.newfrontdoor.org/files/Series.jpg',
          series_id: '723'
        },
        {
          node_title: 'The Lord&#039;s Supper',
          start_date:
            '<span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-04-28T00:00:00+10:00">Sunday, April 28, 2019</span>',
          end_date:
            '<span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-04-28T00:00:00+10:00">Sunday, May 19, 2019</span>',
          series_img:
            'https://cornerstoneapi.newfrontdoor.org/sites/cornerstoneapi.newfrontdoor.org/files/image_17.jpg',
          series_id: '781'
        }
      ]
    }
  ]
};
