/** @jsx jsx */
import {Fragment, FC} from 'react';
import {jsx, Link} from 'theme-ui';
import {
  FaEnvelope,
  FaPodcast,
  FaFacebook,
  FaVimeo,
  FaTwitter,
  FaGithub
} from 'react-icons/fa';

const Socials: FC = () => {
  return (
    <Fragment>
      <Link
        sx={{
          color: 'white',
          ':visited': {color: 'white'}
        }}
        p={2}
        title="Facebook"
        href="https://www.facebook.com/NewFrontDoorIT/"
      >
        <FaFacebook />
      </Link>
      <Link
        sx={{
          color: 'white',
          ':visited': {color: 'white'}
        }}
        p={2}
        title="Vimeo"
        href="https://vimeo.com/user114967320"
      >
        <FaVimeo />
      </Link>
      <Link
        sx={{
          color: 'white',
          ':visited': {color: 'white'}
        }}
        p={2}
        title="Contact us"
        href="contactus@newfrontdoor.org"
      >
        <FaEnvelope />
      </Link>
      <Link
        sx={{
          color: 'white',
          ':visited': {color: 'white'}
        }}
        p={2}
        title="Twitter"
        href="https://twitter.com/NewFrontDoorIT"
      >
        <FaTwitter />
      </Link>
      <Link
        sx={{
          color: 'white',
          ':visited': {color: 'white'}
        }}
        p={2}
        title="Github"
        href="https://github.com/NewFrontDoor"
      >
        <FaGithub />
      </Link>
      <Link
        sx={{
          color: 'white',
          ':visited': {color: 'white'}
        }}
        p={2}
        title="Podcast"
        href="https://podcasts.apple.com/au/podcast/new-front-door-the-church-it-guild/id1477414931"
      >
        <FaPodcast />
      </Link>
    </Fragment>
  );
};

export default Socials;
