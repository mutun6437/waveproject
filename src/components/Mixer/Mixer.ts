import Track from '../Track/Track';
import AudioComponent from '../CoreAudio/AudioComponent';
import AudioInstrument from '../CoreAudio/AudioInstrument';
import AudioContextWrapper from '../CoreAudio/AudioContextWrapper';

export default class Mixer extends AudioComponent {
  name: string = "Mixer";
  tracks: Track[] = [];

  constructor() {
    super();
    this.output.connect(this.context.destination);
  }

  getTrack(index: number): Track {
    return this.tracks[index - 1];
  }

  createTrack(instrument: AudioInstrument) {
    let track = new Track(this.tracks.length,instrument);
    track.output.connect(this.output);
    instrument.connect(track);
    instrument.setTrackNumber(this.tracks.length);
    this.tracks[this.tracks.length] = track;
    console.log("[Mixer]createTrack [" + this.tracks.length + "]");
  }

  removeTrack(index: number) {
    console.log("[Mixer]removeTrack [" + index + "]");
    this.tracks[index] = null;
  }

  setDomEvent(element: HTMLElement) {
    let MasterGain = element.getElementsByClassName("Mixer-Master-Gain")[0] as HTMLElement;
    MasterGain.addEventListener("change",(ev)=>{
      let target = ev.target as HTMLInputElement;
      console.log(parseInt(target.value));
      this.output.gain.value = parseInt(target.value);
    });

  };


}
