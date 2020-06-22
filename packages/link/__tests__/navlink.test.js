import React from 'react';
import {matchers} from 'jest-emotion';
import {render} from '@testing-library/react';
import {Navlink} from '../src';

expect.extend(matchers);

test('href is applied to the link', () => {
  const href = 'https://www.example.com';
  const {getByRole} = render(<Navlink href={href}>Nav 1</Navlink>);
  const link = getByRole('link');

  expect(link).toHaveAttribute('href', href);
  expect(link).not.toHaveStyleRule('color');
});

test('active styles are applied when active', () => {
  const {getByRole} = render(
    <Navlink active href="https://www.example.com">
      Nav 2
    </Navlink>
  );
  const link = getByRole('link');

  expect(link).toHaveStyleRule('color', 'active');
});
