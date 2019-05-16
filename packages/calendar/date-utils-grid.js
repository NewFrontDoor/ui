import {
  lastDayOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
  format,
  parse,
  parseISO,
  getDate,
  getMonth,
  toDate,
  getYear,
  isDate
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
  //build up an array of this month according to the days in month
  const builder = [...new Array(daysInMonth)].map((val, index) => [
    (index + 1).toString().padStart(2, '0'),
    monthInt,
    'current'
  ]);
  //add the first two weeks of the first month
  const fullbuilder = builder.concat(
    [...new Array(14)].map((val, index) => [(index + 1).toString().padStart(2, '0'), format(addMonths(passedDate, 1), 'LL'), 'next'])
  );
  //work out the date of the last sunday of the previous month
  const lastDatePrevMonth = lastDayOfMonth(subMonths(passedDate, 1));
  const lastSundayPrevMonthDate = format(lastDatePrevMonth, 'd') - format(lastDatePrevMonth, 'i');
  //add the last two weeks of the previous month to the array
  const unshiftContent = new Array(format(lastDatePrevMonth, 'd') - lastSundayPrevMonthDate + 1)
    .fill()
    .map((item, index) => [(lastSundayPrevMonthDate + index).toString(), format(subMonths(passedDate, 1), 'LL'), 'prev']);
  fullbuilder.unshift(...unshiftContent);
  
  var relevantEvents = events.filter((event, index, arr) => {
    const localDate = parseISO(event.start_date);
    const localEndDate = parseISO(event.end_date);
    const day = fullbuilder[42][0];
    const prevMonth = format(subMonths(passedDate, 1), 'LL');

    const month = fullbuilder[42][1];
    const year = getYear(localDate).toString();
    return localEndDate >= toDate(parseISO(year + prevMonth + lastSundayPrevMonthDate)) && localDate <= toDate(parseISO(year + month + day))
  })
  relevantEvents.map((event) => {
    const month = getMonth(parseISO(event.start_date)) + 1;
    const day = getDate(parseISO(event.start_date));
    var ind = fullbuilder.findIndex(element => element[0] == day && element[1] == month);
    if (ind < 0) {
      return;
    }
    fullbuilder[ind].push(event);
    return;
  })
  return chunkArray(fullbuilder.slice(0, 42));
}