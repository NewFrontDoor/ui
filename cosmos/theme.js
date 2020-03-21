// Example theme.js
export default {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: `"Open Sans", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    monospace: 'Menlo, monospace'
  },
  breakpoints: ['40em', '56em', '64em'],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  text: {
    warning: {
      color: 'primary',
      p: '5px'
    }
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em'
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#33ccff',
    accent: '#ee00ff'
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text'
      }
    },
    secondary: {
      color: 'background',
      bg: 'secondary'
    },
    calendar: {
      color: 'primary',
      bg: 'background',
      height: '2em',
      padding: '0 0.5em',
      border: '1px solid rgb(200, 209, 224)',
      fontFamily: `"Open Sans", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      fontSize: '16px',
      lineHeight: '1.25',
      fontWeight: '600',
      minWidth: '2em',
      cursor: 'pointer',
      borderRadius: '3px'
    }
  },
  box: {
    blog: {
      fontSize: '10px',
      color: 'green'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'primary'
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      maxWidth: '100%'
    }
  }
};
