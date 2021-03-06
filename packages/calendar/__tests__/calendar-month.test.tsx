import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {render, fireEvent, screen, RenderResult} from '@testing-library/react';
import {format, subMonths, subYears, addMonths, addYears} from 'date-fns';
import {Calendar} from '../src';

jest.mock('ky', () => {
  return {
    __esModule: true,
    default: {}
  };
});

function setup(queryClient: QueryClient): RenderResult {
  const client = {
    async fetchEvents() {
      return Promise.resolve([]);
    }
  };

  return render(
    <QueryClientProvider client={queryClient}>
      <Calendar initialView="month" client={client} />
    </QueryClientProvider>
  );
}

test('Loads and displays todays date', async () => {
  const queryClient = new QueryClient();

  setup(queryClient);

  const actual = format(new Date(), 'MMMM - yyyy');
  const title = await screen.findByTestId('calendar-title');
  expect(title).toHaveTextContent(actual);

  queryClient.clear();
});

test('Can navigate to the previous month and year', async () => {
  const queryClient = new QueryClient();
  setup(queryClient);

  const previousMonthButton = await screen.findByLabelText('previous month');
  expect(previousMonthButton).toBeInTheDocument();

  fireEvent.click(previousMonthButton);

  const previousMonth = subMonths(new Date(), 1);

  const title = screen.getByTestId('calendar-title');
  expect(title).toHaveTextContent(format(previousMonth, 'MMMM - yyyy'));

  const previousYearButton = await screen.findByLabelText('previous year');
  fireEvent.click(previousYearButton);

  const previousYear = subYears(previousMonth, 1);

  expect(title).toHaveTextContent(format(previousYear, 'MMMM - yyyy'));

  queryClient.clear();
});

test('Can navigate to the next month and year', async () => {
  const queryClient = new QueryClient();
  setup(queryClient);

  const nextMonthButton = await screen.findByLabelText('next month');
  expect(nextMonthButton).toBeInTheDocument();

  fireEvent.click(nextMonthButton);

  const nextMonth = addMonths(new Date(), 1);

  const title = screen.getByTestId('calendar-title');
  expect(title).toHaveTextContent(format(nextMonth, 'MMMM - yyyy'));

  const nextYearButton = screen.getByLabelText('next year');
  fireEvent.click(nextYearButton);

  const nextYear = addYears(nextMonth, 1);

  expect(title).toHaveTextContent(format(nextYear, 'MMMM - yyyy'));

  queryClient.clear();
});
