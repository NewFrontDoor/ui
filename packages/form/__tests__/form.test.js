import * as React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
import gridform from '../__fixtures__/gridform';

test('it renders all the fields', () => {
  render(gridform);

  const textboxes = screen.getAllByRole('textbox');
  const options = screen.getAllByRole('option');
  const comboboxes = screen.getAllByRole('combobox');
  const checkboxes = screen.getAllByRole('checkbox');
  const buttons = screen.getAllByRole('button');

  expect(textboxes).toHaveLength(3);
  expect(options).toHaveLength(3);
  expect(comboboxes).toHaveLength(1);
  expect(checkboxes).toHaveLength(4);
  expect(buttons).toHaveLength(5);
});

test('it cannot submit form with required fields', () => {
  const submitForm = jest.fn();
  render(React.cloneElement(gridform, {submitForm}));

  expect(screen.getByText('Submit')).toHaveAttribute('disabled');

  fireEvent.change(screen.getByLabelText('Mobile'), {
    target: {
      value: '0400000000'
    }
  });

  expect(screen.getByText('Submit')).not.toHaveAttribute('disabled');

  fireEvent.click(screen.getByText('Submit'));

  expect(submitForm).not.toBeCalled();
});

test('it can submit form after completing required fields', () => {
  const submitForm = jest.fn();
  render(React.cloneElement(gridform, {submitForm}));

  expect(screen.getByText('Submit')).toHaveAttribute('disabled');

  fireEvent.change(screen.getByLabelText('Name*'), {
    target: {
      value: 'First name'
    }
  });

  expect(screen.getByText('Submit')).not.toHaveAttribute('disabled');

  fireEvent.click(screen.getByText('Submit'));

  expect(submitForm).toBeCalledWith(
    {
      name: 'First name',
      'opt-1': 'second'
    },
    expect.any(Object),
    expect.any(Function)
  );
});

test('it can add additional fields to the fieldarray', () => {
  const submitForm = jest.fn();
  render(React.cloneElement(gridform, {submitForm}));

  fireEvent.click(screen.getByText('Add'));
  fireEvent.click(screen.getByText('Add'));

  const firstMember = screen.getByRole('group', {
    name: 'Family member 1'
  });

  const secondMember = screen.getByRole('group', {
    name: 'Family member 2'
  });

  fireEvent.change(screen.getByLabelText('Name*'), {
    target: {
      value: 'First name'
    }
  });

  fireEvent.change(within(firstMember).getByLabelText('Name'), {
    target: {
      value: 'Second name'
    }
  });

  fireEvent.change(within(secondMember).getByLabelText('Name'), {
    target: {
      value: 'Third name'
    }
  });

  fireEvent.click(screen.getByText('Submit'));

  expect(submitForm).toBeCalledWith(
    {
      name: 'First name',
      'opt-1': 'second',
      testing: [
        {
          name: 'Second name'
        },
        {
          name: 'Third name'
        }
      ]
    },
    expect.any(Object),
    expect.any(Function)
  );
});
