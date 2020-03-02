import React from 'react';
import ToggleSelector from '../src';

export default (
  <ToggleSelector
    handleChange={console.log}
    inputs={['day', 'week', 'month']}
    styles={{borderRadius: 0}}
  />
);
