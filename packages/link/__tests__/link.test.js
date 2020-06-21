import React from 'react';
import {ThemeProvider} from 'theme-ui';
import {render} from '@testing-library/react';
import {Link} from '../src';

function renderWithContext(children) {
  const components = {a: props => <fake-link role="link" {...props} />};
  return render(
    <ThemeProvider components={components}>{children}</ThemeProvider>
  );
}

test('href is applied to the link', () => {
  const href = 'https://www.example.com';
  const {getByRole} = render(<Link href={href} />);
  const link = getByRole('link');

  expect(link).toHaveAttribute('href', href);
});

test('children is applied to the link', () => {
  const {getByRole} = render(
    <Link href="https://www.example.com">Welcome</Link>
  );
  const link = getByRole('link');

  expect(link).toHaveTextContent('Welcome');
});

test('isTargetBlank adds target and rel attributes to the link', () => {
  const {getByRole} = render(
    <Link isTargetBlank href="https://www.example.com" />
  );
  const link = getByRole('link');

  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noreferrer noopener');
});

test('it uses the Link component from ThemeProvider to render internal links', () => {
  const {getByRole} = renderWithContext(
    <Link isInternal href="/example/page" />
  );
  const link = getByRole('link');

  expect(link).toHaveAttribute('href', '/example/page');
});

test('href and as props are applied to internal links', () => {
  const {getByRole} = renderWithContext(
    <Link isInternal href="/example/[slug]" as="/example/id" />
  );
  const link = getByRole('link');

  expect(link).toHaveAttribute('as', '/example/id');
  expect(link).toHaveAttribute('href', '/example/[slug]');
});

test('does not render api urls as internal links', () => {
  const {getByRole} = renderWithContext(<Link isInternal href="/api/user/1" />);
  const link = getByRole('link');

  expect(link).toHaveAttribute('href', '/api/user/1');
  expect(link).not.toHaveAttribute('isInternal');
});
