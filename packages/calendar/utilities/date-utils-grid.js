import {
  addDays,
  addHours,
  differenceInDays,
  format,
  getWeek,
  isSameDay,
  startOfMonth,
  isWeekend,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isAfter,
  startOfDay,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth
} from 'date-fns/esm';

const NUMBER_OF_WEEKS = 6;

function buildDay(inputDate) {
  const today = new Date();
  const date = startOfDay(inputDate);

  return {
    date,
    isToday: isSameDay(today, date),
    isWeekend: isWeekend(date),
    isFirstDayOfMonth: isFirstDayOfMonth(date),
    isLastDayOfMonth: isLastDayOfMonth(date),
    isFuture: isAfter(date, today)
  };
}

function buildWeek(date, weekStartsAt = 0) {
  const start = startOfWeek(date, weekStartsAt);
  const end = endOfWeek(date, weekStartsAt);
  return eachDayOfInterval({start, end}).map(buildDay);
}

function buildMonth(inputDate, mapDay, weekStartsAt = 0) {
  const date = new Date(inputDate);
  const startDate = startOfWeek(startOfMonth(date), weekStartsAt);
  const month = [];
  let weekIndex;
  let week;
  let weekNumber;
  let startOfWeekDate;

  for (weekIndex = 0; weekIndex < NUMBER_OF_WEEKS; weekIndex++) {
    startOfWeekDate = addDays(startDate, weekIndex * 7);
    weekNumber = getWeek(startOfWeekDate);
    week = buildWeek(startOfWeekDate, weekStartsAt).map(dayData => {
      return mapDay(
        Object.assign(dayData, {
          isDummy: !isSameMonth(date, dayData.date)
        })
      );
    });

    month.push({week, weekNumber});
  }

  return month;
}

export function monthBuilder(passedDate, events) {
  function getEvents(day) {
    let normalisedEvents = [];

    if (!day.isDummy) {
      const todaysEvents = events.filter(event => {
        const startDate = addHours(new Date(event.start_date), 10);
        return isSameDay(startDate, day.date);
      });

      normalisedEvents = todaysEvents.map(event => {
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
              addHours(new Date(event.end_date), 10)
            ) + 1,
          description: event.description,
          location: event.where,
          url: event.url
        };

        return normalisedEvent;
      });
    }

    day.events = normalisedEvents;

    return Object.assign(day, {events: normalisedEvents});
  }

  return buildMonth(passedDate, getEvents);
}
