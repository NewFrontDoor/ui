import React from 'react';
import Calendar from '../src';
// eslint-disable-next-line import/extensions
import events from './events.json';

const client = {
  fetchEvents: () => {
    return Promise.resolve(events);
  }
};

export default <Calendar client={client} initialView="week" />;
