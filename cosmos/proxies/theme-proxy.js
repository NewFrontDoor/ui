import React from 'react';
import PropTypes from 'prop-types';
import DesignSystem from 'design-system-utils';
import {ThemeProvider} from 'emotion-theming';

const fontFamily = {
  system:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans"',
  sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  mono: 'Menlo, Monaco, "Courier New", monospace'
};

const transitions = {
  duration: '300ms',
  timing: 'cubic-bezier(0.77, 0, 0.175, 1)'
};

const palette = {
  button: {
    text: 'black'
  },
  link: {
    base: 'green'
  }
};

export const myDesignSystem = {
  colors: {
    colorPalette: palette,

    brand: {
      red: '#e82219',
      deeporange: '#ff7200',
      orange: '#ff9500',
      green: '#c4d000',
      teal: '#1aa5c8',
      navy: '#0052da'
    }
  },

  type: {
    baseFontSize: '20px',

    sizes: {
      xs: -2,
      s: -1,
      base: 0, // [default] p, h5, h6
      m: 1, // Size h4
      l: 2, // Size h3
      xl: 3, // Size h2
      xxl: 4 // Size h1
    },

    modularscale: {
      base: 20, // Should be the same as baseFontSize
      ratio: 1.5
    },

    fontFamily,
    fontFamilyBase: fontFamily.system,
    fontFamilyHeadings: fontFamily.mono,

    lineHeight: {
      headings: 1.1
    },

    fontWeight: {
      normal: 300, // Useful to set here if using anything other than `normal`
      bold: 'bold', // Useful to set here when bold webfonts come as 400 font-weight.
      headings: 'bold' // Instead of browser default, bold
    }
  },

  breakpoints: {
    s: 300,
    m: 500,
    l: 800
  },

  zIndex: {
    low: 10,
    mid: 100,
    high: 1000
  },

  spacing: {
    baseline: 20,
    padding: '0.3em',
    scale: [0, 8, 16, 24, 32, 40]
  },

  layout: {
    gutter: 20,
    maxWidth: 1200,
    grid: {
      columnCount: 12
    }
  },

  transition: {
    default: {
      duration: transitions.duration,
      timing: transitions.timing,
      transition: `all ${transitions.duration} ${transitions.timing}`
    }
  },

  borderRadius: '0.3em'
};

export const ds = new DesignSystem(myDesignSystem, {
  useModularScale: true,
  fontSizeUnit: 'rem'
});

const ThemeProxy = ({nextProxy, ...props}) => (
  <ThemeProvider theme={ds}>
    {React.createElement(nextProxy.value, {
      ...props,
      nextProxy: nextProxy.next()
    })}
  </ThemeProvider>
);

ThemeProxy.propTypes = {
  nextProxy: PropTypes.shape({
    value: PropTypes.func,
    next: PropTypes.func
  }).isRequired
};

export default ThemeProxy;
