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

const LogoSVG: FC = () => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 422.2 99.2"
    >
      <g fill="#d02834">
        <path
          className="st0"
          d="M0 32V0l21.8 22.8V2.1h4.5v31.7L4.5 11.1V32H0zM54 6.3H42v7.2h11.6v4.2H42v10h12V32H37.5V2.1H54v4.2zm11.3-4.2l7.8 20L81.2.7 89 22.1l8.3-20h4.9L88.9 33.9l-7.7-21.2-8 21.2L60.4 2.1h4.9zm74.6 4.2h-10.4v7.2h10.1v4.2h-10.1V32H125V2h14.9v4.3zm13.7 9.5h1.4c4.3 0 6.4-1.6 6.4-4.9 0-3.1-2.1-4.6-6.2-4.6h-1.6v9.5zm5.6 3.4l9.3 12.7H163l-8.5-12.2h-.8V32h-4.5V2h5.3c4 0 6.8.7 8.6 2.2C165 5.9 166 8 166 10.7c0 2.1-.6 3.9-1.8 5.5s-3 2.6-5 3zm20.1-2.3c0 3.3 1.1 6 3.3 8.2 2.2 2.1 4.8 3.2 7.7 3.2 3.1 0 5.8-1.1 7.9-3.3 2.2-2.2 3.2-4.9 3.2-8 0-3.2-1.1-5.9-3.2-8-2.1-2.2-4.7-3.3-7.9-3.3-3.1 0-5.7 1.1-7.9 3.3-2 2.1-3.1 4.8-3.1 7.9zm-4.5 0c0-4.2 1.5-7.8 4.6-10.9 3.1-3 6.8-4.5 11.1-4.5s7.9 1.5 11 4.6c3.1 3 4.6 6.7 4.6 11s-1.5 8-4.6 10.9c-3.1 3-6.8 4.5-11.2 4.5-3.9 0-7.3-1.3-10.4-4-3.4-3-5.1-6.9-5.1-11.6zM215.7 32V0l21.8 22.8V2h4.5v31.7L220.2 11v21h-4.5zm45.7-25.7V32h-4.5V6.3H250V2h18.3v4.2h-6.9zm34.3 21.3h2c2 0 3.7-.2 5.1-.6 1.3-.5 2.6-1.2 3.6-2.2 2.2-2 3.3-4.7 3.3-7.9 0-3.3-1.1-5.9-3.3-8-2-1.8-4.9-2.7-8.7-2.7h-2v21.4zm-4.6 4.3v-30h6.3c3 0 5.4.3 7.1.9 1.9.6 3.6 1.6 5.1 3 3.1 2.8 4.6 6.5 4.6 11.1s-1.6 8.3-4.8 11.2c-1.6 1.4-3.3 2.4-5.1 3-1.7.6-4 .8-7 .8h-6.2zM327 16.8c0 3.3 1.1 6 3.3 8.2 2.2 2.1 4.8 3.2 7.7 3.2 3.1 0 5.8-1.1 7.9-3.3 2.2-2.2 3.2-4.9 3.2-8 0-3.2-1.1-5.9-3.2-8-2.1-2.2-4.7-3.3-7.9-3.3-3.1 0-5.7 1.1-7.9 3.3-2 2.1-3.1 4.8-3.1 7.9zm-4.6 0c0-4.2 1.5-7.8 4.6-10.9 3.1-3 6.8-4.5 11.1-4.5s7.9 1.5 11 4.6c3.1 3 4.6 6.7 4.6 11s-1.5 8-4.6 10.9c-3.1 3-6.8 4.5-11.2 4.5-3.9 0-7.3-1.3-10.4-4-3.4-3-5.1-6.8-5.1-11.6zm44 0c0 3.3 1.1 6 3.3 8.2 2.2 2.1 4.8 3.2 7.7 3.2 3.1 0 5.8-1.1 7.9-3.3 2.2-2.2 3.2-4.9 3.2-8 0-3.2-1.1-5.9-3.2-8-2.1-2.2-4.7-3.3-7.9-3.3-3.1 0-5.7 1.1-7.9 3.3-2 2.1-3.1 4.8-3.1 7.9zm-4.5 0c0-4.2 1.5-7.8 4.6-10.9 3.1-3 6.8-4.5 11.1-4.5s7.9 1.5 11 4.6c3.1 3 4.6 6.7 4.6 11s-1.5 8-4.6 10.9c-3.1 3-6.8 4.5-11.2 4.5-3.9 0-7.3-1.3-10.4-4-3.4-3-5.1-6.8-5.1-11.6zm45.4-1.1h1.4c4.3 0 6.4-1.6 6.4-4.9 0-3.1-2.1-4.6-6.2-4.6h-1.6v9.5zm5.6 3.4l9.3 12.7h-5.5l-8.5-12.2h-.8v12.2h-4.5V1.9h5.3c4 0 6.8.7 8.6 2.2 1.9 1.7 2.9 3.8 2.9 6.5 0 2.1-.6 3.9-1.8 5.5-1.4 1.6-3 2.6-5 3zM95.7 64.4h-1.2v-9.8h-2.6v-1.1h6.5v1.1h-2.7v9.8zm15.6-6.5v-4.4h1.2v10.9h-1.2V59h-5.6v5.4h-1.2v-11h1.2v4.4h5.6zm8.3-4.5h5.7v1.1h-4.5v3.3h4.3v1.1h-4.3v4.3h4.5v1.1h-5.7V53.4zm30.1 2.4c-.9-.9-2.1-1.5-3.3-1.5-2.4 0-4.4 2.1-4.4 4.5s2 4.5 4.4 4.5c1.2 0 2.4-.6 3.3-1.5v1.5a5.68 5.68 0 01-9-4.5c0-3.1 2.6-5.7 5.7-5.7 1.2 0 2.3.3 3.3 1.1v1.6zm13.7 2.1v-4.4h1.2v10.9h-1.2V59h-5.6v5.4h-1.2v-11h1.2v4.4h5.6zm9.5 2c0 .8 0 1.7.5 2.4s1.4 1 2.2 1c.8 0 1.6-.4 2.1-1 .6-.7.5-1.7.5-2.5v-6.5h1.2v6.9c0 1.2-.1 2.1-1 3a4.1 4.1 0 01-5.7.1c-1-.9-1.1-1.9-1.1-3.2v-6.9h1.2v6.7zm14.8-1.4h.4c1.4 0 2.8-.3 2.8-2 0-1.8-1.3-2-2.8-2h-.4v4zm0 5.9h-1.2v-11h1.6c2.1 0 4 .6 4 3 0 1.7-1.1 2.9-2.7 3l3.5 4.9h-1.5l-3.3-4.8h-.3l-.1 4.9zm19.7-8.6c-.9-.9-2.1-1.5-3.3-1.5-2.4 0-4.4 2.1-4.4 4.5s2 4.5 4.4 4.5c1.2 0 2.4-.6 3.3-1.5v1.5a5.68 5.68 0 01-9-4.5c0-3.1 2.6-5.7 5.7-5.7 1.2 0 2.3.3 3.3 1.1v1.6zm13.8 2.1v-4.4h1.2v10.9h-1.2V59h-5.6v5.4h-1.2v-11h1.2v4.4h5.6zm17.5-4.5h1.2v10.9h-1.2zm11.2 11h-1.2v-9.8H246v-1.1h6.5v1.1h-2.7v9.8zm28.1-5.5c0 1.5-.1 2.7-1.1 3.9-1 1.2-2.5 1.8-4.1 1.8-3.1 0-5.6-2.6-5.6-5.6 0-3.1 2.6-5.7 5.7-5.7 1.9 0 3.5.9 4.6 2.4l-.9.8a4.4 4.4 0 00-3.8-2.1c-2.5 0-4.5 2.1-4.5 4.6 0 1.2.5 2.3 1.3 3.1.8.8 2 1.4 3.1 1.4 1.9 0 3.9-1.4 3.9-3.4h-3.3V59l4.7-.1zm7.7 1c0 .8 0 1.7.5 2.4s1.4 1 2.2 1c.8 0 1.6-.4 2.1-1 .6-.7.5-1.7.5-2.5v-6.5h1.2v6.9c0 1.2-.1 2.1-1 3a4.1 4.1 0 01-5.7.1c-1-.9-1.1-1.9-1.1-3.2v-6.9h1.2l.1 6.7zm13.6-6.5h1.2v10.9h-1.2zm9.5 9.8h3v1.1h-4.2V53.4h1.2v9.8zm11.1 0c1.3 0 2.5-.2 3.5-1.1.9-.8 1.4-2 1.4-3.2 0-1.2-.5-2.5-1.4-3.3-1-.9-2.1-1.1-3.4-1.1h-1v8.7h.9zm-2.1-9.8h2.1c1.6 0 3 .2 4.3 1.3 1.2 1.1 1.8 2.5 1.8 4.2 0 1.6-.6 3-1.8 4.1-1.3 1.2-2.6 1.4-4.3 1.4h-2l-.1-11zm-92.5 45.8v-3.7h-2.1v3.7h-6.7v-8.8c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4v5.9h1v-3.7h7.8v3.7h1.1V90c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4v9.2h-6.7zM189.7 84a5.14 5.14 0 00-5.2 5.2 5.14 5.14 0 005.2 5.2 5.14 5.14 0 005.2-5.2 5.14 5.14 0 00-5.2-5.2zm0 13.3c-2.2 0-4.2-.8-5.7-2.4a8.2 8.2 0 01-2.4-5.7c0-2.2.8-4.2 2.4-5.7 3.2-3.2 8.3-3.2 11.5 0a8.2 8.2 0 012.4 5.7c0 2.2-.8 4.2-2.4 5.7a8.01 8.01 0 01-5.8 2.4z"
        />
        <path className="st0" d="M195.5 87.8h40.2v2.9h-40.2z" />
      </g>
    </svg>
  );
};

const SlimlineFooter: FC = () => {
  return (
    <Flex
      p={2}
      sx={{
        flexDirection: ['column', 'row'],
        justifyContent: ['center', 'space-between'],
        color: 'white',
        bg: 'black'
      }}
    >
      <Box sx={{width: '130px', flex: '0 1 auto'}}>
        <Link
          color="white"
          title="New Front Door"
          href="https://newfrontdoor.org"
        >
          <LogoSVG />
        </Link>
      </Box>
      <Box sx={{fontSize: '12px', flex: '0 1 auto'}}>
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

      <Box
        sx={{
          flex: '0 1 auto'
        }}
      >
        <Link
          p={2}
          color="white"
          title="Facebook"
          href="https://www.facebook.com/NewFrontDoorIT/"
        >
          <FontAwesomeIcon icon={faFacebook} size="sm" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Vimeo"
          href="https://vimeo.com/user114967320"
        >
          <FontAwesomeIcon icon={faVimeo} size="sm" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Contact us"
          href="contactus@newfrontdoor.org"
        >
          <FontAwesomeIcon icon={faEnvelope} size="sm" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Twitter"
          href="https://twitter.com/NewFrontDoorIT"
        >
          <FontAwesomeIcon icon={faTwitter} size="sm" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Github"
          href="https://github.com/NewFrontDoor"
        >
          <FontAwesomeIcon icon={faGithub} size="sm" />
        </Link>
        <Link
          p={2}
          color="white"
          title="Podcast"
          href="https://podcasts.apple.com/au/podcast/new-front-door-the-church-it-guild/id1477414931"
        >
          <FontAwesomeIcon icon={faPodcast} size="sm" />
        </Link>
      </Box>
    </Flex>
  );
};

export default SlimlineFooter;
