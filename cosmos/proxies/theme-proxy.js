import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider} from 'mineral-ui/themes';

const myAppColor = {
  [10]: '#faf0f4',
  [20]: '#fad4e4',
  [30]: '#fab4d1',
  [40]: '#f78bb8',
  [50]: '#ed5393',
  [60]: '#d6246e',
  [70]: '#b01355',
  [80]: '#8a1244',
  [90]: '#611535',
  [100]: '#421527'
}

const myTheme = createTheme({
  colors: {
    theme: myAppColor,
    danger: 'bronze',
    warning: 'dusk',
    success: 'teal'
  }
});

const ThemeProxy = ({nextProxy, ...props}) => (
  <ThemeProvider theme={myTheme}>
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
