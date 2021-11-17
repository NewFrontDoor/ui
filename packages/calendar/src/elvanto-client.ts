import ky from 'ky';
import {
  addHours,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  format,
  parseISO,
  differenceInDays
} from 'date-fns';

import {CalendarEvent} from './types';

type ElvantoClient = {
  fetchEvents: (date: string) => Promise<CalendarEvent[]>;
};

type ElvantoEvent = {
  id: string;
  nid: string;
  name: string;
  color: string;
  start_date: string;
  end_date: string;
  description?: string;
  location?: string;
  url?: string;
  where?: string;
};

export default function createElvantoClient(apiUrl: string): ElvantoClient {
  return {
    async fetchEvents(date: string): Promise<CalendarEvent[]> {
      const currentDate = parseISO(date);
      const startDate = format(
        subMonths(startOfMonth(currentDate), 1),
        'yyyy-MM-dd'
      );
      const endDate = format(
        addMonths(endOfMonth(currentDate), 1),
        'yyyy-MM-dd'
      );

      const result = await ky(apiUrl, {
        searchParams: {
          start: startDate,
          end: endDate
        },
        mode: 'cors',
        credentials: 'omit'
      }).json<ElvantoEvent[]>();

      const normalisedData = result.map((event) => {
        const startDate = addHours(new Date(event.start_date), 10);
        const endDate = addHours(new Date(event.end_date), 10);
        const startTime = format(startDate, "h:mmaaaaa'm'");
        const endTime = format(endDate, "h:mmaaaaa'm'");
        const eventLength = differenceInDays(endDate, startDate) + 1;

        return {
          ...event,
          startDate,
          endDate,
          startTime,
          endTime,
          eventLength
        };
      });

      return normalisedData;
    }
  };
}
