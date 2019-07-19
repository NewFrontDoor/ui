import React from 'react';
import { DrupalEvents } from '../src';

export default {
  component: props => (
    <DrupalEvents
      apiUrl={'https://cornerstoneapi.newfrontdoor.org/api/views/all_events_api'}
      apiParams={{
      'display_id': 'services_1',
      'date_range_start[value][date]': '2019/07/01',
      'date_range_end[value][date]': '2019/07/30'
    }} initialView={'month'} />
  ),
  props: {
    'apiUrl':
      'https://cornerstoneapi.newfrontdoor.org/api/views/all_events_api',
    apiParams: {
      'display_id': 'services_1',
      'date_range_start[value][date]': '2018/11/01',
      'date_range_end[value][date]': '2018/11/30'
    },
    initialView: 'month'
  }
};
