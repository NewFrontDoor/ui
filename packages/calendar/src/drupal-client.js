import ky from 'ky-universal';
import {startOfMonth, endOfMonth, format} from 'date-fns';

function createDrupalClient(apiUrl) {
  return {
    async fetchEvents(currentDate) {
      const startDate = format(startOfMonth(currentDate), 'yyyy/MM/dd');
      const endDate = format(endOfMonth(currentDate), 'yyyy/MM/dd');

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
          ...event
        };
        return normalisedEvent;
      });

      return normalisedData;
    }
  };
}

export default createDrupalClient;
