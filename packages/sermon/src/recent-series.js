import React from 'react';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import {PulseLoader} from 'react-spinners';
import renderSeriesComponent from './render-series-content';

export default function({loading, seriesData}) {
  return (
    <Box element="section">
      <Text element="h2">Recent Series</Text>
      <PulseLoader loading={loading} size={20} />
      {loading || (
        <Box element="section">{seriesData.map(renderSeriesComponent)}</Box>
      )}
    </Box>
  );
}
