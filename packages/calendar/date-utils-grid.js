import {
  lastDayOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
  format,
  getDate,
  getMonth,
  addHours,
  toDate,
  getYear
} from 'date-fns/esm';

function chunkArray(myArray) {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, 7));
  }
  return results;
}

export function monthBuilder(passedDate, events) {
  const daysInMonth = getDaysInMonth(passedDate);
  const monthInt = format(passedDate, 'LL')
  const builder = [...new Array(daysInMonth)].map((val, index) => [
    (index + 1).toString().padStart(2, '0'),
    monthInt,
    'current'
  ]);
  const fullbuilder = builder.concat(
    [...new Array(14)].map((val, index) => [(index + 1).toString().padStart(2, '0'), format(addMonths(passedDate, 1), 'LL'), 'next'])
  );
  const lastDatePrevMonth = lastDayOfMonth(subMonths(passedDate, 1));
  const lastSundayPrevMonthDate = format(lastDatePrevMonth, 'd') - format(lastDatePrevMonth, 'i');
  const unshiftContent = new Array(format(lastDatePrevMonth, 'd') - lastSundayPrevMonthDate + 1)
    .fill()
    .map((item, index) => [(lastSundayPrevMonthDate + index).toString(), format(subMonths(passedDate, 1), 'LL'), 'prev']);
  fullbuilder.unshift(...unshiftContent);
  
  var relevantEvents = events.filter((event, index, arr) => {
    const localDate = addHours(event.start_date, 10);
    const localEndDate = addHours(event.end_date, 10);
    const day = fullbuilder[42][0];
    const prevMonth = format(subMonths(passedDate, 1), 'LL');
    const month = fullbuilder[42][1];
    const year = getYear(localDate).toString();
    return localEndDate >= toDate(year + prevMonth + lastSundayPrevMonthDate) && localDate <= toDate(year + month + day)
  })
  relevantEvents.map((event) => {
    const month = getMonth(event.start_date) + 1;
    const day = getDate(event.start_date);
    var ind = fullbuilder.findIndex(element => element[0] == day && element[1] == month);
    if (ind < 0) {
      return;
    }
    fullbuilder[ind].push(event);
    return;
  })
  return chunkArray(fullbuilder.slice(0, 42));
}