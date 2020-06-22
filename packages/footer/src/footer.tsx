/** @jsx jsx */
import {jsx, Flex, Box, Heading} from 'theme-ui';
import {FC} from 'react';

export type FooterProps = {
  width?: string;
};

const Footer: FC<FooterProps> = () => {
  return (
    <Box p={4} bg="highlight">
      <Flex
        sx={{
          alignItems: 'center'
        }}
      >
        <Heading>Hello world</Heading>
      </Flex>
    </Box>
  );
};

export default Footer;
