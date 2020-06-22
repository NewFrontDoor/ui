import ky from 'ky-universal';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  format,
  parseISO,
  differenceInDays
} from 'date-fns';

import {CalendarEvent} from './types';

type DrupalClient = {
  fetchEvents: (date: string) => Promise<CalendarEvent[]>;
};

type DrupalEvent = {
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

export default function createDrupalClient(apiUrl: string): DrupalClient {
  return {
    async fetchEvents(date: string): Promise<CalendarEvent[]> {
      console.log(date);
      const currentDate = parseISO(date);
      const startDate = format(
        subMonths(startOfMonth(currentDate), 1),
        'yyyy/MM/dd'
      );
      const endDate = format(
        addMonths(endOfMonth(currentDate), 1),
        'yyyy/MM/dd'
      );

      const result = await ky(apiUrl, {
        searchParams: {
          display_id: 'services_1',
          'date_range_start[value][date]': startDate,
          'date_range_end[value][date]': endDate
        },
        mode: 'cors',
        credentials: 'omit'
      }).json<DrupalEvent[]>();

      const normalisedData = result.map((event) => {
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
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
