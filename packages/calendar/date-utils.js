import {lastDayOfMonth, getDaysInMonth, subMonths, format} from 'date-fns/esm';

export function monthBuilder(passedDate) {
  function chunkArray(myArray) {
    const results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, 7));
    }
    return results;
  }

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
