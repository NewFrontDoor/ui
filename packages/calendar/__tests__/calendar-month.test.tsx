import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import {format, subMonths, subYears, addMonths, addYears} from 'date-fns';
import {queryCache} from 'react-query';
import {Calendar} from '../src';

afterEach(() => {
  queryCache.clear();
});

async function setup() {
  const client = {
    fetchEvents() {
      return Promise.resolve([]);
    }
  };

  const utils = render(<Calendar initialView="month" client={client} />);

  return utils;
}

test('Loads and displays todays date', async () => {
  const {getByTestId} = await setup();

  const actual = format(new Date(), 'MMMM - yyyy');

  await waitFor(() => {
    expect(getByTestId('calendar-title')).toHaveTextContent(actual);
  });
});

test('Can navigate to the previous month and year', async () => {
  const {getByTestId, getByLabelText} = await setup();

  await waitFor(() => {
    expect(getByLabelText('previous month')).toBeInTheDocument();
  });

  fireEvent.click(getByLabelText('previous month'));

  const previousMonth = subMonths(new Date(), 1);

  await waitFor(() => {
    expect(getByTestId('calendar-title')).toHaveTextContent(
      format(previousMonth, 'MMMM - yyyy')
    );
  });

  fireEvent.click(getByLabelText('previous year'));

  const previousYear = subYears(previousMonth, 1);

  await waitFor(() => {
    expect(getByTestId('calendar-title')).toHaveTextContent(
      format(previousYear, 'MMMM - yyyy')
    );
  });
});

test('Can navigate to the next month and year', async () => {
  const {getByTestId, getByLabelText} = await setup();

  await waitFor(() => {
    expect(getByLabelText('next month')).toBeInTheDocument();
  });

  fireEvent.click(getByLabelText('next month'));

  const nextMonth = addMonths(new Date(), 1);

  await waitFor(() => {
    expect(getByTestId('calendar-title')).toHaveTextContent(
      format(nextMonth, 'MMMM - yyyy')
    );
  });
  fireEvent.click(getByLabelText('next year'));

  const nextYear = addYears(nextMonth, 1);

  await waitFor(() => {
    expect(getByTestId('calendar-title')).toHaveTextContent(
      format(nextYear, 'MMMM - yyyy')
    );
  });
});
