import Metronome from './Metronome';
import AudioSchedular from '../../Worker/AudioSchedular';

export default class Sequencer {
  tempo: number = 120;
  isPlaying: boolean = false;

  //Metronome
  isMetronome: boolean = true;
  metronome: Metronome = new Metronome(this.tempo);

  //Schedular
  schedular: AudioSchedular = new AudioSchedular();;

  constructor() {

  }

  start() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.schedular.startTimer();

      this.metronome.start();
    }
  }

  stop() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.schedular.stopTimer();

      this.metronome.stop();
    }
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
    this.metronome.setTempo(this.tempo);
  }
}
