import {
  lastDayOfMonth,
  getDaysInMonth,
  subMonths,
  format,
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
    let iterator = 1;
    const localDate = addHours(event.start_date, 10);
    const localEndDate = addHours(event.end_date, 10);
    const week = getWeek(localDate, {weekStartsOn: 0});
    const day = getDay(localDate);
    const endDay = getDay(localEndDate);
    const eventCopy = Object.assign({}, event);
    eventCopy.start_date = localDate;
    eventCopy.end_date = localEndDate;
    if (!eventObj.hasOwnProperty(week)) {
      eventObj[week] = [];
      eventObj[week].push(new Array(7).fill(null));
      eventObj[week].push(new Array(7).fill(null));
    }
    if (eventCopy.all_day === 1) {
      eventObj[week][0].splice(day, 1, eventCopy);
    } else if (eventObj[week][iterator][day] === null) {
      eventObj[week][iterator].splice(day, 1, eventCopy);
    } else {
      iterator++;
      eventObj[week].push(new Array(7).fill(null));
      eventObj[week][iterator].splice(day, 1, eventCopy);
    }
  });
  return eventObj;
}
