import {
  HTMLProps,
  Dispatch,
  createContext,
  useReducer,
  useContext,
  useCallback
} from 'react';

type Status = 'play' | 'playing' | 'pause' | 'paused' | 'stop' | 'stopped';

type State = {
  src?: string;
  status: Status;
  playingTime: number;
  seekTime?: number;
  duration?: number;
  volume: number;
  speed: number;
  muted: boolean;
  changingVolume: boolean;
  seeking: boolean;
};

type Action =
  | {
      type: 'play';
      src?: string;
    }
  | {
      type: 'playing';
    }
  | {
      type: 'pause';
    }
  | {
      type: 'paused';
    }
  | {
      type: 'stop';
    }
  | {
      type: 'stopped';
    }
  | {
      type: 'mute';
    }
  | {
      type: 'unmute';
    }
  | {
      type: 'toggle-mute';
    }
  | {
      type: 'set-time';
      time: number;
    }
  | {
      type: 'set-duration';
      duration: number;
    }
  | {
      type: 'set-volume';
      volume: number;
    }
  | {
      type: 'toggle-speed';
    }
  | {
      type: 'stop-interaction';
    }
  | {
      type: 'start-volume-change';
    }
  | {
      type: 'start-seeking';
    };

function toggleSpeed(speed: number): number {
  switch (speed) {
    case 1:
      return 1.2;
    case 1.2:
      return 1.5;
    case 1.5:
      return 2;
    case 2:
      return 1;
    default:
      return 1;
  }
}

function getTime(time?: number): string {
  if (!isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const seconds = `0${Math.floor(time % 60)}`.slice(-2);
    return `${minutes}:${seconds}`;
  }

  return '0:00';
}

function getTimeAndDuration({playingTime, duration}: State): string {
  return `${getTime(playingTime)} ${getTime(duration)}`;
}

function reducer(state: State, action: Action): State {
  let playingTime = state.playingTime;

  switch (action.type) {
    case 'pause':
      return {
        ...state,
        status: 'pause'
      };
    case 'paused':
      return {
        ...state,
        status: 'paused'
      };
    case 'play':
      if (action.src && action.src !== state.src) {
        playingTime = 0;
      }

      return {
        ...state,
        src: action.src ?? state.src,
        playingTime,
        status: 'play'
      };
    case 'playing':
      return {
        ...state,
        status: 'playing'
      };
    case 'stop':
      return {
        ...state,
        status: 'stop'
      };
    case 'stopped':
      return {
        ...state,
        status: 'stopped'
      };
    case 'toggle-mute':
      return {
        ...state,
        muted: !state.muted
      };
    case 'toggle-speed':
      return {
        ...state,
        speed: toggleSpeed(state.speed)
      };
    case 'set-time':
      return {
        ...state,
        seekTime: action.time,
        playingTime: action.time
      };
    case 'set-duration':
      return {
        ...state,
        duration: action.duration
      };
    case 'set-volume':
      return {
        ...state,
        volume: action.volume
      };
    case 'start-volume-change':
      return {
        ...state,
        changingVolume: true
      };
    case 'stop-interaction':
      return {
        ...state,
        changingVolume: false,
        seeking: false,
        status: state.seeking ? 'play' : state.status
      };
    case 'start-seeking':
      return {
        ...state,
        seeking: true,
        status: 'pause'
      };
    default:
      return state;
  }
}

function init({
  initialSrc,
  isPlayOnLoad
}: {
  initialSrc: string;
  isPlayOnLoad: boolean;
}): State {
  return {
    src: initialSrc,
    status: isPlayOnLoad ? 'play' : 'stopped',
    speed: 1,
    volume: 1,
    playingTime: 0,
    muted: false,
    changingVolume: false,
    seeking: false
  };
}

type CurrentState = {
  playing: boolean;
  paused: boolean;
  stopped: boolean;
  timeAndDuration: string;
};

type PlayerState = State & CurrentState;

export type UsePlayerState = {
  playerState: PlayerState;
  dispatch: Dispatch<Action>;
};

export const AudioStateContext = createContext<PlayerState>(null);
export const AudioDispatchContext = createContext<Dispatch<Action>>(null);

export const useAudioStateContext = (): PlayerState =>
  useContext(AudioStateContext);

export const useAudioDispatchContext = (): Dispatch<Action> =>
  useContext(AudioDispatchContext);

type PlayerProps = HTMLProps<HTMLAudioElement> & {
  ref: (audioPlayer?: HTMLAudioElement) => void;
};

type UseAudioPlayer = UsePlayerState & {
  playerProps: PlayerProps;
};

export function useAudioPlayer(): UseAudioPlayer {
  const dispatch = useAudioDispatchContext();
  const playerState = useAudioStateContext();

  const {src, muted, speed, volume, playingTime, seeking, status} = playerState;

  const setAudioPlayer = useCallback(
    (audioPlayer: HTMLAudioElement | undefined) => {
      if (audioPlayer) {
        if (audioPlayer.src !== src) {
          audioPlayer.load();
        }

        audioPlayer.playbackRate = speed;
        audioPlayer.volume = volume;

        if (seeking) {
          audioPlayer.currentTime = playingTime;
        }

        if (status === 'pause') {
          audioPlayer.pause();
        }

        if (status === 'play') {
          audioPlayer.play().catch(() => dispatch({type: 'paused'}));
        }
      }
    },
    [src, speed, volume, playingTime, seeking, status, dispatch]
  );

  const playerProps: PlayerProps = {
    ref: setAudioPlayer,
    muted,
    src,
    onPause: () => dispatch({type: 'paused'}),
    onTimeUpdate: (event) =>
      dispatch({type: 'set-time', time: event.currentTarget.currentTime}),
    onDurationChange: (event) =>
      dispatch({type: 'set-duration', duration: event.currentTarget.duration}),
    onVolumeChange: (event) =>
      dispatch({type: 'set-volume', volume: event.currentTarget.volume}),
    onPlaying: () => dispatch({type: 'playing'}),
    onEnded: () => dispatch({type: 'stopped'})
  };

  return {playerState, playerProps, dispatch};
}

export default function useAudioManager(
  isPlayOnLoad: boolean,
  initialSrc?: string
): UsePlayerState {
  const [state, dispatch] = useReducer(
    reducer,
    {
      initialSrc,
      isPlayOnLoad
    },
    init
  );

  const playing = state.status === 'playing';
  const paused = state.status === 'paused';
  const stopped = state.status === 'stopped';
  const timeAndDuration = getTimeAndDuration(state);

  const playerState = {
    ...state,
    timeAndDuration,
    playing,
    paused,
    stopped
  };

  return {
    playerState,
    dispatch
  };
}
