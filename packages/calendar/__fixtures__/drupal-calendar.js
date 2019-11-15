import React from 'react';
import Calendar, {drupalClient} from '../src';

const apiUrl =
  'https://cornerstoneapi.newfrontdoor.org/api/views/all_events_api';

export default <Calendar client={drupalClient(apiUrl)} initialView="month" />;
