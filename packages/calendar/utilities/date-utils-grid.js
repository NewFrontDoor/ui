import {
  lastDayOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
  format,
  getDay,
  getDate,
  getMonth,
  getYear,
  addHours,
  differenceInDays
} from 'date-fns/esm';

//chunkArray splits fullMonthCalendar into week (7 day) chunks
function chunkArray(myArray) {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, 7));
  }
  return results;
}

//buildCalendarArray() creates an array for
//every day required on the calendar view grid
function buildCalendarArray(passedDate) {
  const prevMonth = format(subMonths(passedDate, 1), 'L');
  const nextMonth = format(addMonths(passedDate, 1), 'L');
  const year = getYear(passedDate);
  const lastDatePrevMonth = lastDayOfMonth(subMonths(passedDate, 1));
  const lastSundayPrevMonthDate = format(lastDatePrevMonth, 'd') - getDay(lastDatePrevMonth);
  //build up the array of days in this month
  var mainMonthArray = [...new Array(getDaysInMonth(passedDate))].map(
    (val, index) => [
      (index + 1).toString().padStart(2, '0'),
      [format(passedDate, 'L'), year],
      'current'
    ]
  )
  //if month doesn't end on a Saturday, complete the week
  if (6 - getDay(lastDayOfMonth(passedDate)) != 0) {
    var fullCalendarView = mainMonthArray.concat(
      [...new Array(6 - getDay(lastDayOfMonth(passedDate)))].map(
        (val, index) => [
          (index + 1).toString().padStart(2, '0'),
          [nextMonth, year],
          'next'
        ]
      )
    );
  } else {
    var fullCalendarView = mainMonthArray;
  }

  //if the month doesn't begin on a Sunday, complete the week
  if (getDay(new Date(lastDatePrevMonth)) != 6) {
    var unshiftContent = new Array(format(lastDatePrevMonth, 'd') - lastSundayPrevMonthDate + 1)
      .fill()
      .map(
        (val, index) => [
          (lastSundayPrevMonthDate + index).toString(),
          [prevMonth, year],
          'prev'
        ]
      );
    //prefix the days to the full month array
    fullCalendarView.unshift(...unshiftContent);
  }
  return fullCalendarView;
}

export function monthBuilder(passedDate, events) {
  const fullMonthCalendar = buildCalendarArray(passedDate);
  //place events into the fullMonthCalendar array
  events.map((event) => {
    const normalisedEvent = {
      name: event.name,
      color: event.color,
      start_date: format(addHours(new Date(event.start_date), 10), 'yyyy-MM-dd'),
      start_time: format(addHours(new Date(event.start_date), 10), "h:mmaaaaa'm'"),
      end_date: format(addHours(new Date(event.end_date), 10), 'yyyy-MM-dd'),
      end_time: format(addHours(new Date(event.end_date), 10), "h:mmaaaaa'm'"),
      event_length: differenceInDays(new Date(event.end_date), new Date(event.start_date)) + 1,
      description: event.description,
      location: event.where,
      url: event.url,
    }
    const year = getYear(new Date(normalisedEvent.start_date));
    const month = getMonth(new Date(normalisedEvent.start_date)) + 1;
    const day = getDate(new Date(normalisedEvent.start_date));
    const calIndex = fullMonthCalendar.findIndex(element => element[0] == day && element[1][0] == month && element[1][1] == year);
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