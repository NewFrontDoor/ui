/** @jsx jsx */
import {jsx, Flex, Box, Image, Link} from 'theme-ui';
import {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faPodcast} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faVimeo,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

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
          justifyContent: 'center'
        }}
      >
        <Link
          p={2}
          color="white"
          title="Facebook"
          href="https://www.facebook.com/NewFrontDoorIT/"
        >
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Vimeo"
          href="https://vimeo.com/user114967320"
        >
          <FontAwesomeIcon icon={faVimeo} size="lg" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Contact us"
          href="contactus@newfrontdoor.org"
        >
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Twitter"
          href="https://twitter.com/NewFrontDoorIT"
        >
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Github"
          href="https://github.com/NewFrontDoor"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Podcast"
          href="https://podcasts.apple.com/au/podcast/new-front-door-the-church-it-guild/id1477414931"
        >
          <FontAwesomeIcon icon={faPodcast} size="lg" />
        </Link>
      </Flex>
      <Flex sx={{justifyContent: 'center'}}>
        <Box>© New Front Door {new Date().getFullYear()}</Box>
      </Flex>
    </Box>
  );
};

export default Footer;
