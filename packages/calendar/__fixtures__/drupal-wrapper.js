import React from 'react';
import DrupalEvents from '../src/drupal-wrapper';

export default {
  component: props => (
    <DrupalEvents apiUrl={props.apiUrl} apiParams={props.apiParams} initialView={props.month} />
  ),
  props: {
    apiUrl:
      'https://cornerstoneapi.newfrontdoor.org/api/views/all_events_api',
    apiParams: {
      display_id: 'services_1',
      'date_range_start[value][date]': '2018/11/01',
      'date_range_end[value][date]': '2018/11/30'
    },
    initialView: 'month'
  }
};
