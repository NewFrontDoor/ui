/** @jsx jsx */
import {jsx, Flex, Box, Link} from 'theme-ui';
import {FC} from 'react';
import LogoSVG from './logo';
import Socials from './socials';

const Footer: FC = () => {
  return (
    <Box
      p={2}
      sx={{
        color: 'white',
        bg: 'black'
      }}
    >
      <Flex
        sx={{
          flexDirection: ['column', 'row']
        }}
      >
        <Flex
          p={2}
          sx={{
            justifyContent: ['center', 'flex-start']
          }}
        >
          <Box sx={{width: '200px'}}>
            <Link
              color="white"
              title="New Front Door"
              href="https://newfrontdoor.org"
            >
              <LogoSVG />
            </Link>
          </Box>
        </Flex>
        <Flex
          sx={{
            flex: 1,
            justifyContent: ['center', 'flex-end']
          }}
        >
          <Socials />
        </Flex>
      </Flex>
      <Box>
        <Flex sx={{justifyContent: 'center', fontSize: '12px'}}>
          <Box>
            Website built and maintained by{' '}
            <Link
              sx={{textDecoration: 'none'}}
              color="white"
              title="New Front Door"
              href="https://newfrontdoor.org"
            >
              New Front Door
            </Link>{' '}
            © {new Date().getFullYear()}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export {Footer};
