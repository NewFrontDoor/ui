import {
  lastDayOfMonth,
  getDaysInMonth,
  subMonths,
  format,
  startOfWeek,
  endOfMonth,
  lastDayOfWeek,
  getWeek,
  getDay,
  addHours
} from 'date-fns/esm';

function chunkArray(myArray) {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, 7));
  }
  return results;
}

export function monthBuilder(passedDate, eventData) {
  const daysInMonth = getDaysInMonth(passedDate);
  const builder = [...new Array(daysInMonth)].map((val, index) => [
    index + 1,
    'current'
  ]);
  const fullbuilder = builder.concat(
    [...new Array(14)].map((val, index) => [index + 1, 'next'])
  );
  const lastDatePrevMonth = lastDayOfMonth(subMonths(passedDate, 1));
  const lastSundayPrevMonthDate =
    format(lastDatePrevMonth, 'd') - format(lastDatePrevMonth, 'i');
  const unshiftContent = new Array(
    format(lastDatePrevMonth, 'd') - lastSundayPrevMonthDate + 1
  )
    .fill()
    .map((item, index) => [lastSundayPrevMonthDate + index, 'prev']);
  fullbuilder.unshift(...unshiftContent);
  return chunkArray(fullbuilder.slice(0, 42));
}

export function eventArrayBuilder(events) {
  const eventObj = {};
  events.map(event => {
    let iterator = 0;
    const week = getWeek(addHours(event.start_date, 10), {weekStartsOn: 0});
    const day = getDay(addHours(event.start_date, 10));
    if (!eventObj.hasOwnProperty(week)) {
      eventObj[week] = [];
      eventObj[week].push(new Array(7).fill(null));
    }
    if (eventObj[week][iterator][day] === null) {
      eventObj[week][iterator].splice(day, 1, event);
    } else {
      iterator++;
      eventObj[week].push(new Array(7).fill(null));
      eventObj[week][iterator].splice(day, 1, event);
    }
  });
  return eventObj;
}
