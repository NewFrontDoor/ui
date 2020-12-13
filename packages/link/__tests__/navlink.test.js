import React from 'react';
import {ThemeProvider} from 'theme-ui';
import {matchers} from 'jest-emotion';
import {render, screen} from '@testing-library/react';
import {Navlink} from '../src';

expect.extend(matchers);

function renderWithContext(children) {
  const components = {
    a: (props) => <fake-link role="link" {...props} />
  };
  return render(
    <ThemeProvider components={components}>{children}</ThemeProvider>
  );
}

test('href is applied to the link', () => {
  const href = 'https://www.example.com';
  renderWithContext(<Navlink href={href}>Nav 1</Navlink>);
  const link = screen.getByRole('link');

  expect(link).toHaveAttribute('href', href);
  expect(link).not.toHaveStyleRule('color');
  expect(link).not.toHaveAttribute('as');
});

test('active styles are applied when active', () => {
  renderWithContext(
    <Navlink active href="https://www.example.com">
      Nav 2
    </Navlink>
  );
  const link = screen.getByRole('link');

  expect(link).toHaveStyleRule('color', 'active');
  expect(link).not.toHaveAttribute('as');
});

test('href and as props are applied to Link', () => {
  renderWithContext(
    <Navlink active href="/foo/[bar]" as="/foo/123">
      Nav 2
    </Navlink>
  );
  const link = screen.getByRole('link');

  expect(link).toHaveAttribute('href', '/foo/[bar]');
  expect(link).toHaveAttribute('as', '/foo/123');
});
