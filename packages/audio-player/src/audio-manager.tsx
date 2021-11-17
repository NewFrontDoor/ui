/** @jsx jsx */
import {jsx, Button, ButtonProps} from 'theme-ui';
import PropTypes from 'prop-types';
import {FC, HTMLProps, ReactNode} from 'react';
import {MdPlayArrow as Play, MdPause as Pause} from 'react-icons/md';
import useAudioManager, {
  useAudioPlayer,
  useAudioStateContext,
  useAudioDispatchContext,
  AudioStateContext,
  AudioDispatchContext
} from './use-audio-manager';
import StyledPlayer, {StyledPlayerProps} from './styled-player';

type AudioManagerProps = {
  initialSrc?: string;
  isPlayOnLoad?: boolean;
  children: ReactNode;
};

export const AudioManager: FC<AudioManagerProps> = ({
  initialSrc,
  isPlayOnLoad,
  children
}) => {
  const {dispatch, playerState} = useAudioManager(isPlayOnLoad, initialSrc);

  return (
    <AudioDispatchContext.Provider value={dispatch}>
      <AudioStateContext.Provider value={playerState}>
        {children}
      </AudioStateContext.Provider>
    </AudioDispatchContext.Provider>
  );
};

AudioManager.propTypes = {
  initialSrc: PropTypes.string,
  isPlayOnLoad: PropTypes.bool,
  children: PropTypes.node.isRequired
};

type PlayButtonProps = ButtonProps & {
  src: string;
};

export const PlayButton: FC<PlayButtonProps> = ({src, children, ...props}) => {
  const dispatch = useAudioDispatchContext();
  const playerState = useAudioStateContext();
  const isPlaying = playerState.status === 'playing' && src === playerState.src;

  const Icon = isPlaying ? Pause : Play;

  function handleButtonClick(): void {
    if (isPlaying) {
      dispatch({type: 'pause'});
    } else {
      dispatch({type: 'play', src});
    }
  }

  return (
    <Button {...props} onClick={handleButtonClick}>
      <Icon />
      {children}
    </Button>
  );
};

export const AudioPlayer: FC<StyledPlayerProps> = (props) => {
  return <StyledPlayer {...props} />;
};

PlayButton.propTypes = {
  src: PropTypes.string.isRequired,
  variant: PropTypes.string,
  children: PropTypes.node
};

type NativePlayerProps = HTMLProps<HTMLAudioElement>;

export const NativePlayer: FC<NativePlayerProps> = (props) => {
  const {playerProps} = useAudioPlayer();

  return <audio {...props} {...playerProps} />;
};
