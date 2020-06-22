export type CalendarEvent = {
  id: string;
  name: string;
  color: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  eventLength?: number;
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
  events: CalendarEvent[];
  isPeripheral?: boolean;
  numberOfEventsToday: number;
};

export type CalendarWeek = {
  weekNumber: number;
  week: CalendarDay[];
};

export type CalendarMonth = CalendarWeek[];

export type CalendarClient = {
  fetchEvents(date: string): Promise<CalendarEvent[]>;
};

export const calendarViews = ['day', 'week', 'month'] as const;

export type CalendarView = typeof calendarViews[number];

export type CalendarState =
  | {
      calendarView: 'day';
      currentDate: Date;
    }
  | {
      calendarView: 'week';
      currentDate: Date;
    }
  | {
      calendarView: 'month';
      currentDate: Date;
    };

export type CalendarData =
  | {
      calendarView: 'day';
      currentDate: Date;
      dayData: CalendarDay;
      weekData?: void;
      monthData?: void;
    }
  | {
      calendarView: 'week';
      currentDate: Date;
      dayData?: void;
      weekData?: CalendarDay[];
      monthData?: void;
    }
  | {
      calendarView: 'month';
      currentDate: Date;
      dayData?: void;
      weekData?: void;
      monthData?: CalendarMonth;
    };
