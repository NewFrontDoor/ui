import React from 'react';
import {Calendar} from '../src';
import events from './events.json';

const client = {
  fetchEvents: () => {
    return Promise.resolve(events);
  }
};

function handleNav(url) {
  alert(url); // eslint-disable-line no-alert
}

export default (
  <Calendar client={client} handleNav={handleNav} initialView="week" />
);
