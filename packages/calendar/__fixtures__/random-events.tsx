
import {
  addHours,
  addDays,
  startOfMonth,
  format,
  parseISO,
  differenceInDays
} from 'date-fns';

import {Calendar} from '../src';
import type {CalendarEvent} from '../src/types';

export function buildEvent(currentDate: Date): CalendarEvent {
  const twoMonthsAgo = startOfMonth(currentDate);
  const eventIndex =
    Math.abs(currentDate.getFullYear() * 12 + currentDate.getMonth()) % 10;

  const startDate = addDays(twoMonthsAgo, eventIndex);
  const endDate = addHours(startDate, (eventIndex % 6) + 1);
  const startTime = format(startDate, "h:mmaaaaa'm'");
  const endTime = format(endDate, "h:mmaaaaa'm'");
  const eventLength = differenceInDays(endDate, startDate) + 1;

  return {
    id: `cosmos-random-event-${eventIndex}`,
    name: `Fixture Event ${eventIndex + 1}`,
    description: 'Deterministic event data for Cosmos.',
    location: 'Main Auditorium',
    startDate,
    endDate,
    startTime,
    endTime,
    eventLength,
    color: ['#2f80ed', '#27ae60', '#f2994a', '#9b51e0'][eventIndex % 4]
  };
}

const client = {
  async fetchEvents(date: string) {
    const currentDate = parseISO(date);

    const events = Array.from({length: 12})
      .map((_, index) => buildEvent(addDays(currentDate, index)))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return Promise.resolve(events);
  }
};

export default <Calendar client={client} initialView="month" />;
