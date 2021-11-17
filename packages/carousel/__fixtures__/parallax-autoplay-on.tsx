/** @jsx jsx */
import {jsx, css} from 'theme-ui';
import {ParallaxCarousel} from '../src';

const ImageStyle = (image) => ({
  height: '50vh',
  width: '100%',
  backgroundImage: `url(${image}), linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 100%)`,
  backgroundBlendMode: 'saturation',
  backgroundSize: 'cover'
});

export default (
  <ParallaxCarousel autoplay delayLength={2000}>
    <div
      sx={ImageStyle(
        'https://cdn.sanity.io/images/dmo29ge7/production/1e28cd71acc8aaa2ac53633ca5bba6b68907f449-3600x2400.png?sat=-100&auto=format'
      )}
    />
    <div
      sx={ImageStyle(
        'https://cdn.sanity.io/images/dmo29ge7/production/db9df81cdc316e359e5443b1b96d476e298e7a4c-3600x2400.png?sat=-100&auto=format'
      )}
    />
    <div
      sx={ImageStyle(
        'https://cdn.sanity.io/images/dmo29ge7/production/9cad23d4448fc77994b01f3d4e50cc8af107ced1-6531x3674.png?sat=-100&auto=format'
      )}
    />
  </ParallaxCarousel>
);
