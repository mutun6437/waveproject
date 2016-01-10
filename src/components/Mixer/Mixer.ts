import Track from './Track';
import AudioComponent from '../CoreAudio/AudioComponent';
import AudioContextWrapper from '../CoreAudio/AudioContextWrapper';

export default class Mixer extends AudioComponent {
  tracks: Track[] = [];
  constructor() {
    super();
    this.output.connect(this.context.destination);
  }

  getTrack(index: number): Track {
    return this.tracks[index-1];
  }

  createTrack(audioNode: AudioComponent) {
    let track = new Track(this.tracks.length);
    track.output.connect(this.output);
    audioNode.connect(track);
    this.tracks[this.tracks.length] = track;
    console.log("[Mixer]createTrack [" + this.tracks.length + "]");
  }

  removeTrack(index: number) {
    console.log("[Mixer]removeTrack [" + index + "]");
    this.tracks[index] = null;
  }

  setDomEvent(){
    
  }

}