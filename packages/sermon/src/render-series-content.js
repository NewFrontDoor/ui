import React from 'react';
import { Box, Text, Link } from "mineral-ui";

export default function renderSeriesComponent({ id, title, image, link }) {
    return (
      <Box key={id}>
        <Box className="series">
          <img src={image} alt="Sermon Art" />
        </Box>
        <Text>
          <Link href={link}>{title}</Link>
        </Text>
      </Box>
    )
};