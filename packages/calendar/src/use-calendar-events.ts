import React, {useContext, useReducer, Dispatch} from 'react';
import {useQuery} from 'react-query';
import {
  addMonths,
  subMonths,
  addWeeks,
  addDays,
  subDays,
  subWeeks
} from 'date-fns';

import {
  buildCalendarData,
  CalendarView,
  CalendarDay,
  CalendarMonth,
  InputEvent
} from './utilities/date-utils-grid';

export const CalendarDispatch = React.createContext<Dispatch<Action>>(
  (_: Action) => undefined
);

export const useCalendarDispatch = (): Dispatch<Action> =>
  useContext(CalendarDispatch);

type State = {
  calendarView: CalendarView;
  currentDate: Date;
};

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
  | {type: 'decrement-year'}
  | {type: 'decrement-month'}
  | {type: 'decrement-week'}
  | {type: 'decrement-day'}
  | {type: 'increment-year'}
  | {type: 'increment-month'}
  | {type: 'increment-week'}
  | {type: 'increment-day'};

function reducer(state: State, action: Action): State {
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
    case 'decrement-year':
      return {
        ...state,
        currentDate: subMonths(state.currentDate, 12)
      };
    case 'decrement-month':
      return {
        ...state,
        currentDate: subMonths(state.currentDate, 1)
      };
    case 'decrement-week':
      return {
        ...state,
        currentDate: subWeeks(state.currentDate, 1)
      };
    case 'decrement-day':
      return {
        ...state,
        currentDate: subDays(state.currentDate, 1)
      };
    case 'increment-day':
      return {
        ...state,
        currentDate: addDays(state.currentDate, 1)
      };
    case 'increment-week':
      return {
        ...state,
        currentDate: addWeeks(state.currentDate, 1)
      };
    case 'increment-month':
      return {
        ...state,
        currentDate: addMonths(state.currentDate, 1)
      };
    case 'increment-year':
      return {
        ...state,
        currentDate: addMonths(state.currentDate, 12)
      };
    default:
      return state;
  }
}

function init(calendarView: CalendarView): State {
  return {
    calendarView,
    currentDate: new Date()
  };
}

type Status = 'loading' | 'error' | 'success';

type QueryResult = {
  data?: InputEvent[];
  status: Status;
  error?: Error;
};

type UseCalendarEvents = [
  {
    calendarData: CalendarMonth | CalendarDay[] | CalendarDay | [];
    currentDate: Date;
    calendarView: string;
  },
  Status,
  Error | undefined,
  Dispatch<Action>
];

export type CalendarClient = {
  fetchEvents(date: Date): Promise<InputEvent[]>;
};

export function useCalendarEvents(
  initialView: CalendarView,
  client: CalendarClient
): UseCalendarEvents {
  const [{currentDate, calendarView}, dispatch] = useReducer(
    reducer,
    initialView,
    init
  );

  const {data, status, error}: QueryResult = useQuery(
    [currentDate.toISOString()],
    client.fetchEvents
  );

  const calendarData =
    (data && buildCalendarData(calendarView, currentDate, data)) ?? [];

  return [{calendarData, currentDate, calendarView}, status, error, dispatch];
}
