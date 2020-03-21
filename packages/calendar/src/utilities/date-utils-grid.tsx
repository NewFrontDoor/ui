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
  let weekIndex;
  let week;
  let weekNumber;
  let startOfWeekDate;

  for (weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
    startOfWeekDate = addDays(startDate, weekIndex * 7);
    weekNumber = getWeek(startOfWeekDate);
    week = buildWeek(startOfWeekDate, mapDay, weekStartsOn).map(dayData => {
      return {
        ...dayData,
        isPeripheral: !isSameMonth(date, dayData.date)
      };
    });

    month.push({week, weekNumber});
  }

  return month;
}

function getEvents(events: InputEvent[]) {
  return function(day: Day): CalendarDay {
    const todaysEvents = events.filter(event => {
      return isSameDay(new Date(event.start_date), day.date);
    });

    const eventsOnToday = events.filter(event => {
      const start = startOfDay(new Date(event.start_date));
      const end = endOfDay(new Date(event.end_date));
      return isWithinInterval(day.date, {start, end});
    });

    const normalisedEvents: OutputEvent[] = todaysEvents.map(event => {
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
        location: event.location ?? event.where,
        url: event.url
      };

      return normalisedEvent;
    });

    return {
      ...day,
      events: normalisedEvents,
      numberOfEventsToday: eventsOnToday.length
    };
  };
}

export function calendarDay(
  passedDate: Date,
  events: InputEvent[]
): CalendarDay {
  const withEvents = getEvents(events);
  return buildDay(passedDate, withEvents);
}

export function calendarWeek(
  passedDate: Date,
  events: InputEvent[]
): CalendarDay[] {
  const withEvents = getEvents(events);
  return buildWeek(passedDate, withEvents);
}

export function calendarMonth(
  passedDate: Date,
  events: InputEvent[]
): CalendarMonth {
  const withEvents = getEvents(events);
  return buildMonth(passedDate, withEvents);
}

type MapDay = (day: Day) => CalendarDay;

const calendarView = ['day', 'week', 'month'] as const;

export type CalendarView = typeof calendarView[number];

export type InputEvent = {
  id: string;
  name: string;
  color: string;
  start_date: string;
  end_date: string;
  description?: string;
  location?: string;
  url?: string;
  where?: string;
};

export type OutputEvent = {
  id: string;
  name: string;
  color: string;
  start_date: Date;
  end_date: Date;
  description?: string;
  location?: string;
  url?: string;
};

export type Day = {
  date: Date;
  isToday: boolean;
  isWeekend: boolean;
  isFirstDayOfMonth: boolean;
  isLastDayOfMonth: boolean;
  isFuture: boolean;
};

export type CalendarDay = Day & {
  events: OutputEvent[];
  numberOfEventsToday: number;
};

export type CalendarWeek = {
  weekNumber: number;
  week: CalendarDay[];
};

export type CalendarMonth = CalendarWeek[];

export function buildCalendarData(
  calendarView: 'day',
  passedDate: Date,
  events: InputEvent[]
): CalendarDay;

export function buildCalendarData(
  calendarView: 'week',
  passedDate: Date,
  events: InputEvent[]
): CalendarDay[];

export function buildCalendarData(
  calendarView: 'month',
  passedDate: Date,
  events: InputEvent[]
): CalendarMonth;

export function buildCalendarData(
  calendarView: string,
  passedDate: Date,
  events: InputEvent[]
): CalendarMonth | CalendarDay[] | CalendarDay | undefined;

export function buildCalendarData(
  calendarView: string,
  passedDate: Date,
  events: InputEvent[]
): CalendarMonth | CalendarDay[] | CalendarDay | undefined {
  if (calendarView === 'day') {
    return calendarDay(passedDate, events);
  }

  if (calendarView === 'week') {
    return calendarWeek(passedDate, events);
  }

  if (calendarView === 'month') {
    return calendarMonth(passedDate, events);
  }
}
