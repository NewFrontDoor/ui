import React, {useContext} from 'react';

const CalendarDispatch = React.createContext(() => {});

export const useCalendarDispatch = () => useContext(CalendarDispatch);

export default CalendarDispatch;
