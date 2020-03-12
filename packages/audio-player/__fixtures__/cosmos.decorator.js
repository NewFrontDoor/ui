import React from 'react';
import {ThemeProvider} from 'theme-ui';
import theme from '../../../cosmos/theme';

export default ({children}) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
