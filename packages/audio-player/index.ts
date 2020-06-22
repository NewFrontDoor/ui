export {default as AudioPlayer} from './src/audio-player';
import * as _AudioManager from './src/audio-manager';

export const AudioManager = Object.assign(_AudioManager.AudioManager, {
  AudioPlayer: _AudioManager.AudioPlayer,
  NativePlayer: _AudioManager.NativePlayer,
  PlayButton: _AudioManager.PlayButton
});
