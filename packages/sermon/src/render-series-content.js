import React from 'react';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';
import Link from 'mineral-ui/Link';

export default function renderSeriesComponent({id, title, image, link}) {
  return (
    <Box key={id}>
      <Box className="series">
        <img src={image} alt="Sermon Art" />
      </Box>
      <Text>
        <Link href={link} dangerouslySetInnerHTML={{__html: title}} />
      </Text>
    </Box>
  );
}
