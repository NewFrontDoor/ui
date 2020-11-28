import React, {useContext, useReducer, Dispatch} from 'react';
import {usePaginatedQuery, QueryStatus} from 'react-query';
import {
  addMonths,
  subMonths,
  addWeeks,
  addDays,
  subDays,
  subWeeks
} from 'date-fns/fp';
import {update} from 'lodash/fp';

import {buildCalendarData} from './utilities/date-utils-grid';

import {
  CalendarData,
  CalendarClient,
  CalendarView,
  CalendarState
} from './types';

export const CalendarDispatch = React.createContext<Dispatch<Action>>(
  (_: Action) => undefined
);

export const useCalendarDispatch = (): Dispatch<Action> =>
  useContext(CalendarDispatch);

type Action =
  | {
      type: 'see-more';
      date: Date;
    }
  | {
      type: 'set-view';
      view: CalendarView;
    }
  | {type: 'today'}
  | {
      type: 'set-date';
      date: Date;
    }
  | {type: 'decrement-step'}
  | {type: 'increment-step'}
  | {type: 'decrement-jump'}
  | {type: 'increment-jump'};

const previousYear = update('currentDate', subMonths(12));
const previousMonth = update('currentDate', subMonths(1));
const previousWeek = update('currentDate', subWeeks(1));
const previousDay = update('currentDate', subDays(1));
const nextDay = update('currentDate', addDays(1));
const nextWeek = update('currentDate', addWeeks(1));
const nextMonth = update('currentDate', addMonths(1));
const nextYear = update('currentDate', addMonths(12));

function decrementStep(state: CalendarState): CalendarState {
  switch (state.calendarView) {
    case 'day':
      return previousDay(state);

    case 'week':
      return previousWeek(state);

    case 'month':
      return previousMonth(state);

    default:
      return previousMonth(state);
  }
}

function decrementJump(state: CalendarState): CalendarState {
  switch (state.calendarView) {
    case 'day':
      return previousWeek(state);

    case 'week':
      return previousMonth(state);

    case 'month':
      return previousYear(state);

    default:
      return previousYear(state);
  }
}

function incrementStep(state: CalendarState): CalendarState {
  switch (state.calendarView) {
    case 'day':
      return nextDay(state);

    case 'week':
      return nextWeek(state);

    case 'month':
      return nextMonth(state);

    default:
      return nextMonth(state);
  }
}

function incrementJump(state: CalendarState): CalendarState {
  switch (state.calendarView) {
    case 'day':
      return nextWeek(state);

    case 'week':
      return nextMonth(state);

    case 'month':
      return nextYear(state);

    default:
      return nextYear(state);
  }
}

function reducer(state: CalendarState, action: Action): CalendarState {
  switch (action.type) {
    case 'see-more':
      return {
        ...state,
        currentDate: action.date,
        calendarView: 'week'
      };
    case 'set-view':
      return {
        ...state,
        calendarView: action.view
      };
    case 'today':
      return {
        ...state,
        currentDate: new Date()
      };
    case 'set-date':
      return {
        ...state,
        currentDate: action.date
      };
    case 'decrement-step':
      return decrementStep(state);
    case 'decrement-jump':
      return decrementJump(state);
    case 'increment-step':
      return incrementStep(state);
    case 'increment-jump':
      return incrementJump(state);
    default:
      return state;
  }
}

function init(calendarView: CalendarView): CalendarState {
  return {
    calendarView,
    currentDate: new Date()
  };
}

type UseCalendarEvents = [CalendarData, QueryStatus, unknown, Dispatch<Action>];

export function useCalendarEvents(
  initialView: CalendarView,
  client: CalendarClient
): UseCalendarEvents {
  const [{currentDate, calendarView}, dispatch] = useReducer(
    reducer,
    initialView,
    init
  );

  const {
    resolvedData,
    status,
    error
  } = usePaginatedQuery(currentDate.toISOString(), async (date: string) =>
    client.fetchEvents(date)
  );

  const calendarData = buildCalendarData(
    {calendarView, currentDate},
    resolvedData ?? []
  );

  return [calendarData, status, error, dispatch];
}
