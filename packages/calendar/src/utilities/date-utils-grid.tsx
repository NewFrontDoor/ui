import {
  addDays,
  eachDayOfInterval,
  endOfDay,
  endOfWeek,
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

import {
  CalendarState,
  CalendarData,
  CalendarEvent,
  CalendarDay,
  CalendarMonth,
  Day
} from '../types';

function buildDay(inputDate: Date, mapDay: MapDay): CalendarDay {
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

function buildWeek(
  date: Date,
  mapDay: MapDay,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
): CalendarDay[] {
  const start = startOfWeek(date, {weekStartsOn});
  const end = endOfWeek(date, {weekStartsOn});
  return eachDayOfInterval({start, end}).map(day => buildDay(day, mapDay));
}

function buildMonth(
  inputDate: Date,
  mapDay: MapDay,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
): CalendarMonth {
  const date = new Date(inputDate);
  const startDate = startOfWeek(startOfMonth(date), {weekStartsOn});
  const numberOfWeeks = getWeeksInMonth(date);
  const month: CalendarMonth = [];
  let weekIndex: number;
  let week: CalendarDay[];
  let weekNumber: number;
  let startOfWeekDate: Date;

  for (weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
    startOfWeekDate = addDays(startDate, weekIndex * 7);
    weekNumber = getWeek(startOfWeekDate);
    week = buildWeek(startOfWeekDate, mapDay, weekStartsOn).map(day => {
      return {
        ...day,
        isPeripheral: !isSameMonth(date, day.date)
      };
    });

    month.push({week, weekNumber});
  }

  return month;
}

function getEvents(events: CalendarEvent[]) {
  return function(day: Day): CalendarDay {
    const todaysEvents = events.filter(event => {
      return isSameDay(event.startDate, day.date);
    });

    const eventsOnToday = events.filter(event => {
      const start = startOfDay(event.startDate);
      const end = endOfDay(event.endDate);
      return isWithinInterval(day.date, {start, end});
    });

    return {
      ...day,
      events: todaysEvents,
      numberOfEventsToday: eventsOnToday.length
    };
  };
}

export function calendarDay(
  currentDate: Date,
  events: CalendarEvent[]
): CalendarData {
  const withEvents = getEvents(events);
  return {
    calendarView: 'day',
    dayData: buildDay(currentDate, withEvents),
    currentDate
  };
}

export function calendarWeek(
  currentDate: Date,
  events: CalendarEvent[]
): CalendarData {
  const withEvents = getEvents(events);
  return {
    calendarView: 'week',
    weekData: buildWeek(currentDate, withEvents),
    currentDate
  };
}

export function calendarMonth(
  currentDate: Date,
  events: CalendarEvent[]
): CalendarData {
  const withEvents = getEvents(events);
  return {
    calendarView: 'month',
    monthData: buildMonth(currentDate, withEvents),
    currentDate
  };
}

type MapDay = (day: Day) => CalendarDay;

export function buildCalendarData(
  {calendarView, currentDate}: CalendarState,
  events: CalendarEvent[]
): CalendarData {
  if (calendarView === 'day') {
    return calendarDay(currentDate, events);
  }

  if (calendarView === 'week') {
    return calendarWeek(currentDate, events);
  }

  if (calendarView === 'month') {
    return calendarMonth(currentDate, events);
  }
}
