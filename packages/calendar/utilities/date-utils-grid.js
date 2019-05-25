import {
  addDays,
  addHours,
  differenceInDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  getWeek,
  getWeeksInMonth,
  isAfter,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfDay,
  startOfMonth,
  startOfWeek
} from 'date-fns';

function buildDay(inputDate, mapDay) {
  const today = new Date();
  const date = startOfDay(inputDate);

  return mapDay({
    date,
    isToday: isSameDay(today, date),
    isWeekend: isWeekend(date),
    isFirstDayOfMonth: isFirstDayOfMonth(date),
    isLastDayOfMonth: isLastDayOfMonth(date),
    isFuture: isAfter(date, today)
  });
}

function buildWeek(date, mapDay, weekStartsAt = 0) {
  const start = startOfWeek(date, weekStartsAt);
  const end = endOfWeek(date, weekStartsAt);
  return eachDayOfInterval({start, end}).map(day => buildDay(day, mapDay));
}

function buildMonth(inputDate, mapDay, weekStartsAt = 0) {
  const date = new Date(inputDate);
  const startDate = startOfWeek(startOfMonth(date), weekStartsAt);
  const numberOfWeeks = getWeeksInMonth(date);
  const month = [];
  let weekIndex;
  let week;
  let weekNumber;
  let startOfWeekDate;

  for (weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
    startOfWeekDate = addDays(startDate, weekIndex * 7);
    weekNumber = getWeek(startOfWeekDate);
    week = buildWeek(startOfWeekDate, mapDay, weekStartsAt).map(dayData => {
      return Object.assign(dayData, {
        isPeripheral: !isSameMonth(date, dayData.date)
      });
    });

    month.push({week, weekNumber});
  }

  return month;
}

function getEvents(events) {
  return function(day) {
    const todaysEvents = events.filter(event => {
      const startDate = addHours(new Date(event.start_date), 10);
      return isSameDay(startDate, day.date);
    });

    const normalisedEvents = todaysEvents.map(event => {
      const normalisedEvent = {
        id: event.id,
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
        end_time: format(
          addHours(new Date(event.end_date), 10),
          "h:mmaaaaa'm'"
        ),
        event_length:
          differenceInDays(
            addHours(new Date(event.end_date), 10),
            addHours(new Date(event.start_date), 10)
          ) + 1,
        description: event.description,
        location: event.where,
        url: event.url
      };

      return normalisedEvent;
    });

    return Object.assign(day, {events: normalisedEvents});
  };
}

export function calendarDay(passedDate, events) {
  const withEvents = getEvents(events);
  return buildDay(passedDate, withEvents);
}

export function calendarWeek(passedDate, events) {
  const withEvents = getEvents(events);
  return buildWeek(passedDate, withEvents);
}

export function calendarMonth(passedDate, events) {
  const withEvents = getEvents(events);
  return buildMonth(passedDate, withEvents);
}

export function buildCalendarData(calendarView, passedDate, events) {
  if (calendarView === 'day') {
    return calendarDay(passedDate, events);
  }

  if (calendarView === 'week') {
    return calendarWeek(passedDate, events);
  }

  return calendarMonth(passedDate, events);
}
