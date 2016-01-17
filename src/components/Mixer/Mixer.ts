import Track from './Track';
import AudioComponent from '../CoreAudio/AudioComponent';
import AudioContextWrapper from '../CoreAudio/AudioContextWrapper';
import MixerWindow from './MixerWindow';

export default class Mixer extends AudioComponent {
  tracks: Track[] = [];
  window: MixerWindow;

  constructor() {
    super();
    this.output.connect(this.context.destination);
    this.window = new MixerWindow({tracks:[]});
    //this.window.openWindow();
  }

  getTrack(index: number): Track {
    return this.tracks[index - 1];
  }

  createTrack(audioNode: AudioComponent) {
    let track = new Track(this.tracks.length);
    track.output.connect(this.output);
    audioNode.connect(track);
    this.tracks[this.tracks.length] = track;
    this.window.addNode(this.tracks.length,track.window);
    console.log("[Mixer]createTrack [" + this.tracks.length + "]");
  }

  removeTrack(index: number) {
    console.log("[Mixer]removeTrack [" + index + "]");
    this.tracks[index] = null;
  }
}
