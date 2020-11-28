import React from 'react';
import {format, differenceInDays} from 'date-fns';
import {Calendar} from '../src';
import events from './events.json';
import {CalendarEvent} from '../src/types';

const client = {
  async fetchEvents(_date: string): Promise<CalendarEvent[]> {
    return Promise.resolve(
      events.map((event) => {
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        const startDateFormat = format(startDate, 'yyyy-MM-dd');
        const startTime = format(startDate, "h:mmaaaaa'm'");
        const endDateFormat = format(endDate, 'yyyy-MM-dd');
        const endTime = format(endDate, "h:mmaaaaa'm'");
        const eventLength = differenceInDays(endDate, startDate) + 1;

        return {
          ...event,
          startDate,
          endDate,
          startDateFormat,
          startTime,
          endDateFormat,
          endTime,
          eventLength
        };
      })
    );
  }
};

function handleNav(url: string): void {
  alert(url); // eslint-disable-line no-alert
}

export default (
  <Calendar client={client} handleNav={handleNav} initialView="week" />
);
