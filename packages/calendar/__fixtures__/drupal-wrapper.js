import React from 'react';
import CalendarWrapper, {drupalEvents} from '../src';

export default {
  component: props => <CalendarWrapper {...props} />,
  props: {
    apiUrl: 'https://cornerstoneapi.newfrontdoor.org/api/views/all_events_api',
    initialView: 'month',
    eventFunction: drupalEvents
  }
};
