# audio player

A themeable audio player

## Usage

### A single audio player

```jsx
import {AudioPlayer} from '@newfrontdoor/audio-player';

<AudioPlayer isPlayOnLoad src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
```

### An audio player with multiple tracks

```
import {AudioManager} from '@newfrontdoor/audio-player';

const track1 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const track2 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"

<AudioManager isPlayOnLoad initialSrc={track1}>
  <AudioManager.AudioPlayer/>
  <AudioManager.PlayButton src={track1}>
    Track 1
  </AudioManager.PlayButton>
  <AudioManager.PlayButton src={track2}>
    Track 2
  </AudioManager.PlayButton>
</AudioManager>
```
