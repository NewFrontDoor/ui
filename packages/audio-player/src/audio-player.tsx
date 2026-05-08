
import type {FC} from 'react';

import {AudioManager} from './audio-manager';
import type {StyledPlayerProps} from './styled-player';
import StyledPlayer from './styled-player';

type AudioPlayerProps = {
  src?: string;
  isPlayOnLoad?: boolean;
} & StyledPlayerProps;

const AudioPlayer: FC<AudioPlayerProps> = ({
  src,
  isPlayOnLoad = false,
  ...props
}) => {
  return (
    <AudioManager isPlayOnLoad={isPlayOnLoad} initialSrc={src}>
      <StyledPlayer {...props} />
    </AudioManager>
  );
};

/* AudioPlayer.defaultProps = {
  isPlayOnLoad: false
};

AudioPlayer.propTypes = {
  src: PropTypes.string,
  isPlayOnLoad: PropTypes.bool
}; */

export default AudioPlayer;
