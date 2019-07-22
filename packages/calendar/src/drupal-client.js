import ky from 'ky-universal';
import { decode } from 'he';
import {addMonths, subMonths, startOfMonth, endOfMonth, format} from 'date-fns';

function createDrupalClient(apiUrl) {
  return {
    async fetchEvents(currentDate) {
      const startDate = format(subMonths(startOfMonth(currentDate), 1), 'yyyy/MM/dd');
      const endDate = format(addMonths(endOfMonth(currentDate), 1), 'yyyy/MM/dd');

      const result = await ky(apiUrl, {
        searchParams: {
          display_id: 'services_1',
          'date_range_start[value][date]': startDate,
          'date_range_end[value][date]': endDate
        },
        mode: 'cors',
        credentials: 'omit'
      }).json();

      const normalisedData = result.map(event => {
        const normalisedEvent = {
          calendar_id: event.nid,
          name: decode(event.name),
          ...event
        };
        return normalisedEvent;
      });

      return normalisedData;
    }
  };
}

export default createDrupalClient;
