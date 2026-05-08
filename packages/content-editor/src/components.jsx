import { createPortal } from 'react-dom';
import { css, cx } from '@emotion/css';

export function Button({
  className,
  active,
  reversed,
  ref,
  ...props
}) {
  return (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${
            reversed
              ? active
                ? 'white'
                : '#aaa'
              : active
                ? 'black'
                : '#ccc'
          };
        `
      )}
    />
  );
}

export function EditorValue({
  className,
  value,
  ref,
  ...props
}) {
  const textLines = value.document.nodes
    .map((node) => node.text)
    .toArray()
    .join('\n');

  return (
    <div
      ref={ref}
      {...props}
      className={cx(
        className,
        css`
          margin: 30px -20px 0;
        `
      )}
    >
      <div
        sx={{
          fontSize: '14px',
          padding: '5px 20px',
          color: '#404040',
          borderTop: '2px solid #eeeeee',
          background: '#f8f8f8'
        }}
      >
        Slate&apos;s value as text
      </div>

      <div
        sx={{
          color: '#404040',
          font: '12px monospace',
          whiteSpace: 'pre-wrap',
          padding: '10px 20px',
          div: {
            margin: '0 0 0.5em'
          }
        }}
      >
        {textLines}
      </div>
    </div>
  );
}

export function Icon({
  className,
  ref,
  ...props
}) {
  return (
    <span
      {...props}
      ref={ref}
      className={cx(
        'material-icons',
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      )}
    />
  );
}

export function Instruction({
  className,
  ref,
  ...props
}) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  );
}

export function Menu({
  className,
  ref,
  ...props
}) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  );
}

export function Portal({ children }) {
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
}

export function Toolbar({
  className,
  ref,
  ...props
}) {
  return (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  );
}