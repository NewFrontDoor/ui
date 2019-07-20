import ky from 'ky-universal';
import {addHours, startOfMonth, endOfMonth, format} from 'date-fns';

function createDrupalClient(apiUrl) {
  return {
    async fetchEvents(currentDate) {
      const startDate = format(startOfMonth(currentDate), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(currentDate), 'yyyy-MM-dd');

      const result = await ky(apiUrl, {
        searchParams: {
          start: startDate,
          end: endDate
        },
        mode: 'cors',
        credentials: 'omit'
      }).json();

      const normalisedData = result.map(event => {
        const normalisedEvent = {
          ...event,
          start_date: addHours(new Date(event.start_date), 10),
          end_date: addHours(new Date(event.end_date), 10)
        };
        return normalisedEvent;
      });

      return normalisedData;
    }
  };
}

export default createDrupalClient;
