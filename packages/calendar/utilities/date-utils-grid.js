import {
  lastDayOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
  addDays,
  format,
  getDay,
  subDays,
  isSameDay,
  getYear,
  addHours,
  differenceInDays,
  startOfMonth
} from 'date-fns/esm';

// ChunkArray splits fullMonthCalendar into week (7 day) chunks
function chunkArray(myArray) {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, 7));
  }

  return results;
}

// BuildCalendarArray() creates an array for
// every day required on the calendar view grid
function buildCalendarArray(passedDate) {
  const prevMonth = format(subMonths(passedDate, 1), 'L');
  const nextMonth = format(addMonths(passedDate, 1), 'L');
  const year = getYear(passedDate);
  const firstDate = startOfMonth(passedDate);
  const firstDateNextMonth = startOfMonth(addMonths(passedDate, 1));
  const lastDatePrevMonth = lastDayOfMonth(subMonths(passedDate, 1));
  const lastSundayPrevMonthDate =
    format(lastDatePrevMonth, 'd') - getDay(lastDatePrevMonth);
  const lastSundayPrevMonth = subDays(
    lastDatePrevMonth,
    getDay(lastDatePrevMonth)
  );
  // Build up the array of days in this month
  const mainMonthArray = [...new Array(getDaysInMonth(passedDate))].map(
    (val, index) => ({
      day: (index + 1).toString().padStart(2, '0'),
      monthYear: [format(passedDate, 'L'), year],
      currentMonth: true,
      actualDate: addDays(firstDate, index),
      events: []
    })
  );
  let fullCalendarView;
  // If month doesn't end on a Saturday, complete the week
  if (6 - getDay(lastDayOfMonth(passedDate)) > 0) {
    fullCalendarView = mainMonthArray.concat(
      [...new Array(6 - getDay(lastDayOfMonth(passedDate)))].map(
        (val, index) => ({
          day: (index + 1).toString().padStart(2, '0'),
          monthYear: [nextMonth, year],
          currentMonth: false,
          actualDate: addDays(firstDateNextMonth, index),
          events: []
        })
      )
    );
  } else {
    fullCalendarView = mainMonthArray;
  }

  // If the month doesn't begin on a Sunday, complete the week
  if (getDay(new Date(lastDatePrevMonth)) != 6) {
    const unshiftContent = new Array(
      format(lastDatePrevMonth, 'd') - lastSundayPrevMonthDate + 1
    )
      .fill()
      .map((val, index) => ({
        day: (lastSundayPrevMonthDate + index).toString(),
        monthYear: [prevMonth, year],
        currentMonth: false,
        actualDate: addDays(lastSundayPrevMonth, index),
        events: []
      }));
    // Prefix the days to the full month array
    fullCalendarView.unshift(...unshiftContent);
  }

  return fullCalendarView;
}

export function monthBuilder(passedDate, events) {
  const fullMonthCalendar = buildCalendarArray(passedDate);
  // Place events into the fullMonthCalendar array
  console.log(fullMonthCalendar[8]);
  console.log(fullMonthCalendar[9]);
  events.map(event => {
    const normalisedEvent = {
      name: event.name,
      color: event.color,
      start_date: addHours(new Date(event.start_date), 10),
      end_date: addHours(new Date(event.end_date), 10),
      start_date_format: format(
        addHours(new Date(event.start_date), 10),
        'yyyy-MM-dd'
      ),
      start_time: format(
        addHours(new Date(event.start_date), 10),
        "h:mmaaaaa'm'"
      ),
      end_date_format: format(
        addHours(new Date(event.end_date), 10),
        'yyyy-MM-dd'
      ),
      end_time: format(addHours(new Date(event.end_date), 10), "h:mmaaaaa'm'"),
      event_length:
        differenceInDays(
          addHours(new Date(event.end_date), 10),
          addHours(new Date(event.end_date), 10)
        ) + 1,
      description: event.description,
      location: event.where,
      url: event.url
    };
    const date = new Date(normalisedEvent.start_date);
    const calIndex = fullMonthCalendar.findIndex(element =>
      isSameDay(element.actualDate, date)
    );
    if (calIndex < 0) {
      return;
    }

    fullMonthCalendar[calIndex].events.push(normalisedEvent);
  });

  // ChunkArray splits fullMonthCalendar into week (7 day) chunks
  return chunkArray(fullMonthCalendar);
}
