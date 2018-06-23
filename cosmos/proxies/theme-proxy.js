import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider} from 'mineral-ui/themes';

const ThemeProxy = ({nextProxy, ...props}) => (
  <ThemeProvider>
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
