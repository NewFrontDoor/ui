import React from 'react';
import {render, fireEvent, cleanup, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {format, subMonths, subYears, addMonths, addYears} from 'date-fns';
import Calendar from '../src';

afterEach(cleanup);

test('Loads and displays todays date', async () => {
  const client = {
    fetchEvents() {
      return Promise.resolve([]);
    }
  };

  const {getByTestId} = render(
    <Calendar initialView="month" client={client} />
  );

  const actual = format(new Date(), 'MMMM - yyyy');

  await wait(() => {
    expect(getByTestId('calendar-title')).toHaveTextContent(actual);
  });
});

test('Can navigate to the previous month and year', async () => {
  const client = {
    fetchEvents() {
      return Promise.resolve([]);
    }
  };

  const {getByTestId, getByLabelText} = render(
    <Calendar initialView="month" client={client} />
  );

  await wait(() => {
    expect(getByLabelText('previous month')).toBeInTheDocument();
  });

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

test('Can navigate to the next month and year', async () => {
  const client = {
    fetchEvents() {
      return Promise.resolve([]);
    }
  };

  const {getByTestId, getByLabelText} = render(
    <Calendar initialView="month" client={client} />
  );

  await wait(() => {
    expect(getByLabelText('next month')).toBeInTheDocument();
  });

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
