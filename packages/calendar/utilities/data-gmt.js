import {
    format,
    parseISO,
    addHours
  } from 'date-fns/esm';

export function localiseEvents(events) {
    var updatedEvents = events.map(event => {
        var eventStart = addHours(parseISO(event.start_date), 10);
        var eventEnd = addHours(parseISO(event.end_date), 10);
        event.start_date = format(eventStart, 'yyyy-MM-dd HH:mm:ss');
        event.end_date = format(eventEnd, 'yyyy-MM-dd HH:mm:ss');
        return event;
    })
    return updatedEvents;
};