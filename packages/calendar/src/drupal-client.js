import ky from 'ky-universal';
import {addMonths, subMonths, startOfMonth, endOfMonth, format} from 'date-fns';

export default function createDrupalClient(apiUrl) {
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
          ...event,
          calendar_id: event.nid
        };
        console.log(normalisedEvent);
        return normalisedEvent;
      });

      console.log(normalisedData);

      return normalisedData;
    }
  };
}