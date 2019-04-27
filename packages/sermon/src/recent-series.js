import React from 'react';
import { Box, Text, Link } from "mineral-ui";
import {PulseLoader} from "react-spinners";


function renderSeriesBox({ id, title, image, url }) {
  return (
    <Box key={id}>
      <Box className="recent-series">
        <img src={image} alt="Sermon Art" />
      </Box>
      <Text>
        <Link href={url}>{title}</Link>
      </Text>
    </Box>
  )
}

export default function({ loading, seriesData }) {
  return (
    <Box element="section">
      <Text element="h2">Recent Series</Text>
      <PulseLoader loading={loading} size={20} />
      {loading || (
        <Box element="section">
          {seriesData.map(renderSeriesBox)}
        </Box>
      )}
    </Box>
  );
};

