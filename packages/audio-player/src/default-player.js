import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useEventListener, useInterval} from './custom-hooks';

export default function DefaultPlayer({
  autoPlay,
  children,
  className,
  controls,
  crossOrigin,
  controlsList,
  id,
  listenInterval,
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
  onListen,
  onSeeked,
  onVolumeChange,
  onLoadedMetadata,
  setAudioPlayer,
  getBuffered
}) {
  const audioEl = useRef();
  const [audio, setElement] = useState(null);
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const listeners = [
    ['error', onError],
    ['canplay', onCanPlay],
    ['canplaythrough', onCanPlayThrough],
    ['play', onPlay],
    ['playing', onPlaying],
    ['abort', onAbort],
    ['ended', onEnded],
    ['pause', onPause],
    ['seeked', onSeeked],
    ['loadedmetadata', onLoadedMetadata],
    ['volumechange', onVolumeChange],
    ['timeupdate', onTimeUpdate],
    ['durationchange', onDurationChange]
  ];

  listeners.map(([name, fn]) => {
    return useEventListener(
      name,
      e => {
        fn(e);
      },
      audio
    );
  });

  useEffect(() => {
    setElement(audioEl.current);
    if (setAudioPlayer) {
      setAudioPlayer(audioEl.current);
    }
  }, [audioEl, setAudioPlayer]);

  useInterval(
    () => {
      getBuffered(audio.seekable);
    },
    fullyLoaded ? null : 100
  );

  useEffect(() => {
    if (audio) {
      if (typeof volume === 'number' && volume !== audio.volume) {
        audio.volume = volume;
      }
    }
  }, [volume, audio]);

  return (
    // eslint-disable-next-line
    <audio
      ref={audioEl}
      autoPlay={autoPlay}
      controls={!(controls === false)}
      crossOrigin={crossOrigin}
      id={id}
      loop={loop}
      muted={muted}
      className={`react-audio-player ${className}`}
      title={title || src}
      preload={preload}
      controlsList={controlsList}
      src={src}
      style={style}
      onPlaying={onPlaying}
      onPlay={onPlay}
      onCanPlayThrough={() => setFullyLoaded(true)}
    >
      {/* eslint-disable-next-line */}
      {children || (<p>Your browser does not support the<code>audio</code>element.</p>)} 
    </audio>
  );
}

DefaultPlayer.defaultProps = {
  autoPlay: false,
  children: null,
  className: '',
  controls: false,
  controlsList: '',
  crossOrigin: null,
  id: '',
  listenInterval: 10000,
  loop: false,
  muted: false,
  onAbort: () => {},
  onCanPlay: () => {},
  onCanPlayThrough: () => {},
  onEnded: () => {},
  onError: () => {},
  onListen: () => {},
  onPause: () => {},
  onPlay: () => {},
  onSeeked: () => {},
  onVolumeChange: () => {},
  onLoadedMetadata: () => {},
  onDurationChange: () => {},
  setAudioPlayer: () => {},
  getBuffered: () => {},
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
  controlsList: PropTypes.string,
  crossOrigin: PropTypes.string,
  id: PropTypes.string,
  listenInterval: PropTypes.number,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onAbort: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEnded: PropTypes.func,
  onError: PropTypes.func,
  onListen: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onSeeked: PropTypes.func,
  onVolumeChange: PropTypes.func,
  setAudioPlayer: PropTypes.func,
  getBuffered: PropTypes.func,
  preload: PropTypes.oneOf(['', 'none', 'metadata', 'auto']),
  src: PropTypes.string, // Not required b/c can use <source>
  style: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
  volume: PropTypes.number
};
