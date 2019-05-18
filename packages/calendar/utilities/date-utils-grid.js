import {
  lastDayOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
  format,
  getDay,
  getDate,
  getMonth,
  addHours,
  differenceInDays
} from 'date-fns/esm';

function chunkArray(myArray) {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, 7));
  }
  return results;
}

function buildFullCalendarArray(passedDate, lastDatePrevMonth, lastSundayPrevMonthDate, pm, nm) {
  //build up the array of days in this month
  var mainMonthArray = [...new Array(getDaysInMonth(passedDate))].map(
    (val, index) => [
    (index + 1).toString().padStart(2, '0'),
    format(passedDate, 'L'),
    'current'
  ])
  //if month doesn't end on a Saturday, complete the week
  if (6 - getDay(lastDayOfMonth(passedDate)) != 0) {
    var fullCalendarView = mainMonthArray.concat(
      [...new Array(6 - getDay(lastDayOfMonth(passedDate)))].map(
        (val, index) => [
          (index + 1).toString().padStart(2, '0'),
          nm,
          'next'
        ]
      )
    );
  } else {
    var fullCalendarView = mainMonthArray;
  }

  //if the month doesn't begin on a sunday
  console.log(getDay(new Date(lastDatePrevMonth)));
  if (getDay(new Date(lastDatePrevMonth)) != 6) {
    //determine how many days are missing in the week of the first day of the month,
    //and create an array of these days
    console.log("last sunday of previous month - " + lastSundayPrevMonthDate);
    console.log(format(lastDatePrevMonth, 'd') - lastSundayPrevMonthDate + 1);
    var unshiftContent = new Array(format(lastDatePrevMonth, 'd') - lastSundayPrevMonthDate + 1)
      .fill()
      .map(
        (val, index) => [
          (lastSundayPrevMonthDate + index).toString(),
          pm,
          'prev'
        ]
      );
    //prefix the days to the full month array
    fullCalendarView.unshift(...unshiftContent);

    //return the 6 week view
    return fullCalendarView;
  }

  //return the 5 week view
  return fullCalendarView;
}

export function monthBuilder(passedDate, events) {
  const pm = format(subMonths(passedDate, 1), 'L');
  const nm = format(addMonths(passedDate, 1), 'L');
  const lastDatePrevMonth = lastDayOfMonth(subMonths(passedDate, 1));
  const lastSundayPrevMonthDate = format(lastDatePrevMonth, 'd') - getDay(lastDatePrevMonth);

  const fullMonthCalendar = buildFullCalendarArray(passedDate, lastDatePrevMonth, lastSundayPrevMonthDate, pm, nm);

  //place events into the fullMonthCalendar array
  events.map((event) => {
    const normalisedEvent = {
      name: event.name,
      color: event.color,
      start_date: format(addHours(new Date(event.start_date), 10), 'yyyy-MM-dd'),
      start_time: format(addHours(new Date(event.start_date), 10), 'HH:mm:ss'),
      end_date: format(addHours(new Date(event.end_date), 10), 'yyyy-MM-dd'),
      end_time: format(addHours(new Date(event.end_date), 10), 'HH:mm:ss'),
      event_length: differenceInDays(new Date(event.end_date), new Date(event.start_date)) + 1,
      description: event.description,
      location: event.where,
      url: event.url,
    }
    const month = getMonth(new Date(normalisedEvent.start_date)) + 1;
    const day = getDate(new Date(normalisedEvent.start_date));
    var calIndex = fullMonthCalendar.findIndex(element => element[0] == day && element[1] == month);
    if (calIndex < 0) {
      return;
    }
    if (!fullMonthCalendar[calIndex][3]) fullMonthCalendar[calIndex].push(new Array());
    fullMonthCalendar[calIndex][3].push(normalisedEvent);
    return;
  })

  //chunkArray splits fullMonthCalendar into week (7 day) chunks
  return chunkArray(fullMonthCalendar);
}