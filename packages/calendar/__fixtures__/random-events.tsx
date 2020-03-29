import React from 'react';
import faker from 'faker';
import {
  addHours,
  startOfMonth,
  endOfMonth,
  format,
  parseISO,
  differenceInDays
} from 'date-fns';

import {Calendar} from '../src';
import {CalendarEvent} from '../src/types';

export function buildEvent(currentDate: Date): CalendarEvent {
  const twoMonthsAgo = startOfMonth(currentDate);
  const inTwoMonths = endOfMonth(currentDate);

  const startDate = faker.date.between(twoMonthsAgo, inTwoMonths);
  const endDate = addHours(startDate, faker.random.number({min: 1, max: 48}));
  const startTime = format(startDate, "h:mmaaaaa'm'");
  const endTime = format(endDate, "h:mmaaaaa'm'");
  const eventLength = differenceInDays(endDate, startDate) + 1;

  return {
    id: faker.random.uuid(),
    name: faker.fake(
      '{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}'
    ),
    description: faker.company.catchPhraseDescriptor(),
    location: faker.fake('{{address.streetAddress}} {{address.city}}'),
    startDate,
    endDate,
    startTime,
    endTime,
    eventLength,
    color: faker.internet.color()
  };
}

const client = {
  fetchEvents(date: string) {
    const currentDate = parseISO(date);

    const events = Array.from({length: 50})
      .map(() => buildEvent(currentDate))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return Promise.resolve(events);
  }
};

export default <Calendar client={client} initialView="month" />;
