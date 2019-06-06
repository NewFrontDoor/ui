import React from 'react';
import DrupalEvents from '../drupal-wrapper';

export default {
  component: props => (
    <DrupalEvents url={props.url} initialView={props.month} />
  ),
  props: {
    url:
      'https://cornerstoneapi.newfrontdoor.org/api/views/all_events_api?display_id=services_1&date_range_start[value][date]=2018/11/01&date_range_end[value][date]=2018/11/30',
    initialView: 'month'
  }
};
