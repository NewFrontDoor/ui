import {
  addDays,
  differenceInDays,
  eachDayOfInterval,
  endOfDay,
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
  isWithinInterval,
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
      return isSameDay(new Date(event.start_date), day.date);
    });

    const eventsOnToday = events.filter(event => {
      const start = startOfDay(new Date(event.start_date));
      const end = endOfDay(new Date(event.end_date));
      return isWithinInterval(day.date, {start, end});
    });

    const normalisedEvents = todaysEvents.map(event => {
      const normalisedEvent = {
        ...event,
        id: event.id,
        name: event.name,
        color: event.color,
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date),
        start_date_format: format(new Date(event.start_date), 'yyyy-MM-dd'),
        start_time: format(new Date(event.start_date), "h:mmaaaaa'm'"),
        end_date_format: format(new Date(event.end_date), 'yyyy-MM-dd'),
        end_time: format(new Date(event.end_date), "h:mmaaaaa'm'"),
        event_length:
          differenceInDays(
            new Date(event.end_date),
            new Date(event.start_date)
          ) + 1,
        description: event.description,
        location: event.location || event.where,
        url: event.url
      };

      return normalisedEvent;
    });

    return Object.assign(day, {
      events: normalisedEvents,
      numberOfEventsToday: eventsOnToday.length
    });
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
