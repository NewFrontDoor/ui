// __tests__/fetch.test.js
import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {format, subMonths, subYears, addMonths, addYears} from 'date-fns';
import Calendar from '../src';

afterEach(cleanup);

test('Loads and displays todays date', () => {
  const {getByTestId} = render(<Calendar initialView="month" events={[]} />);

  const actual = format(new Date(), 'MMMM - yyyy');

  expect(getByTestId('calendar-title')).toHaveTextContent(actual);
});

test('Can navigate to the previous month and year', () => {
  const {getByTestId, getByLabelText} = render(
    <Calendar initialView="month" events={[]} />
  );

  fireEvent.click(getByLabelText('previous month'));
  const previousMonth = subMonths(new Date(), 1);
  expect(getByTestId('calendar-title')).toHaveTextContent(
    format(previousMonth, 'MMMM - yyyy')
  );

  fireEvent.click(getByLabelText('previous year'));
  const previousYear = subYears(previousMonth, 1);
  expect(getByTestId('calendar-title')).toHaveTextContent(
    format(previousYear, 'MMMM - yyyy')
  );
});

test('Can navigate to the next month and year', () => {
  const {getByTestId, getByLabelText} = render(
    <Calendar initialView="month" events={[]} />
  );

  fireEvent.click(getByLabelText('next month'));
  const nextMonth = addMonths(new Date(), 1);
  expect(getByTestId('calendar-title')).toHaveTextContent(
    format(nextMonth, 'MMMM - yyyy')
  );

  fireEvent.click(getByLabelText('next year'));
  const nextYear = addYears(nextMonth, 1);
  expect(getByTestId('calendar-title')).toHaveTextContent(
    format(nextYear, 'MMMM - yyyy')
  );
});
