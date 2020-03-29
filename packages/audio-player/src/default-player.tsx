import React, {FC, HTMLProps, useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

type DefaultPlayerProps = HTMLProps<HTMLAudioElement> & {
  volume?: number;
  setAudioPlayer?: (element: HTMLAudioElement) => void;
};

const noop = (): void => undefined;

const DefaultPlayer: FC<DefaultPlayerProps> = ({
  autoPlay,
  children,
  className,
  controls,
  crossOrigin,
  id,
  loop,
  preload,
  src,
  style,
  title,
  muted,
  volume,
  onError,
  onCanPlay,
  onCanPlayThrough,
  onPlay,
  onPlaying,
  onTimeUpdate,
  onDurationChange,
  onAbort,
  onEnded,
  onPause,
  onSeeked,
  onVolumeChange,
  onLoadedMetadata,
  setAudioPlayer
}) => {
  const audioEl = useRef<HTMLAudioElement>(null);
  const [audio, setElement] = useState<HTMLAudioElement>(null);

  // These may be needed? ¯\_(ツ)_/¯
  // useEventListener('error', onError, audio);
  // useEventListener('canplay', onCanPlay, audio);
  // useEventListener('canplaythrough', onCanPlayThrough, audio);
  // useEventListener('play', onPlay, audio);
  // useEventListener('playing', onPlaying, audio);
  // useEventListener('abort', onAbort, audio);
  // useEventListener('ended', onEnded, audio);
  // useEventListener('pause', onPause, audio);
  // useEventListener('seeked', onSeeked, audio);
  // useEventListener('loadedmetadata', onLoadedMetadata, audio);
  // useEventListener('volumechange', onVolumeChange, audio);
  // useEventListener('timeupdate', onTimeUpdate, audio);
  // useEventListener('durationchange', onDurationChange, audio);

  useEffect(() => {
    setElement(audioEl.current);
    if (setAudioPlayer) {
      setAudioPlayer(audioEl.current);
    }
  }, [audioEl, setAudioPlayer]);

  useEffect(() => {
    if (audio) {
      if (typeof volume === 'number' && volume !== audio.volume) {
        audio.volume = volume;
      }
    }
  }, [volume, audio]);

  return (
    <audio
      ref={audioEl}
      autoPlay={autoPlay}
      controls={Boolean(controls)}
      crossOrigin={crossOrigin}
      id={id}
      loop={loop}
      muted={muted}
      className={`react-audio-player ${className}`}
      title={title || src}
      preload={preload}
      src={src}
      style={style}
      onError={onError}
      onCanPlay={onCanPlay}
      onCanPlayThrough={onCanPlayThrough}
      onPlay={onPlay}
      onPlaying={onPlaying}
      onTimeUpdate={onTimeUpdate}
      onDurationChange={onDurationChange}
      onAbort={onAbort}
      onEnded={onEnded}
      onPause={onPause}
      onSeeked={onSeeked}
      onVolumeChange={onVolumeChange}
      onLoadedMetadata={onLoadedMetadata}
    >
      {children || (
        <p>
          Your browser does not support the<code>audio</code>element.
        </p>
      )}
    </audio>
  );
};

DefaultPlayer.defaultProps = {
  autoPlay: false,
  children: null,
  className: '',
  controls: false,
  crossOrigin: null,
  id: '',
  loop: false,
  muted: false,
  onAbort: noop,
  onCanPlay: noop,
  onCanPlayThrough: noop,
  onEnded: noop,
  onError: noop,
  onPause: noop,
  onPlay: noop,
  onSeeked: noop,
  onVolumeChange: noop,
  onLoadedMetadata: noop,
  onDurationChange: noop,
  setAudioPlayer: noop,
  preload: 'metadata',
  src: null,
  style: {},
  title: '',
  volume: 0.4
};

DefaultPlayer.propTypes = {
  autoPlay: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string,
  controls: PropTypes.bool,
  crossOrigin: PropTypes.string,
  id: PropTypes.string,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onAbort: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEnded: PropTypes.func,
  onError: PropTypes.func,
  onPlaying: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onDurationChange: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onSeeked: PropTypes.func,
  onVolumeChange: PropTypes.func,
  setAudioPlayer: PropTypes.func,
  preload: PropTypes.oneOf(['', 'none', 'metadata', 'auto']),
  src: PropTypes.string, // Not required b/c can use <source>
  style: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
  volume: PropTypes.number
};
export default DefaultPlayer;
