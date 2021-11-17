/** @jsx jsx */
import {jsx, Flex, Box, Link} from 'theme-ui';
import {FC} from 'react';
import Socials from './socials';
import LogoSVG from './logo';

const SlimlineFooter: FC = () => {
  return (
    <Flex
      px={4}
      py={2}
      sx={{
        flexDirection: ['column', 'row'],
        justifyContent: ['center', 'space-between'],
        color: 'white',
        bg: 'black'
      }}
    >
      <Box
        sx={{width: '130px', flex: '0 1 auto', alignSelf: ['center', 'left']}}
      >
        <Link
          color="white"
          title="New Front Door"
          href="https://newfrontdoor.org"
        >
          <LogoSVG />
        </Link>
      </Box>
      <Box
        sx={{
          fontSize: '12px',
          flex: '0 1 auto',
          alignSelf: ['center', 'left'],
          textAlign: 'center',
          order: ['3', '2']
        }}
      >
        Website built and maintained by{' '}
        <Link
          sx={{
            textDecoration: 'none',
            color: 'white',
            ':visited': {color: 'white'}
          }}
          title="New Front Door"
          href="https://newfrontdoor.org"
        >
          New Front Door
        </Link>{' '}
        © {new Date().getFullYear()}
      </Box>

      <Box
        sx={{
          flex: '0 1 auto',
          order: ['2', '3'],
          alignSelf: ['center', 'left']
        }}
      >
        <Socials />
      </Box>
    </Flex>
  );
};

export default SlimlineFooter;
