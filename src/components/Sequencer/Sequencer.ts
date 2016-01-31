import Metronome from './Metronome';
import Worker from '../../Worker/Worker';
import WaveSchedular from './WaveSchedular';

export default class Sequencer {
  tempo: number = 120;
  isPlaying: boolean = false;

  //Metronome
  isMetronome: boolean = true;
  metronome: Metronome = new Metronome(this.tempo);

  //Mixer
  // mixer:Mixer; //TODO mainにあるものをここに持ってくる

  //Schedular
  waveSchedular:WaveSchedular;

  worker: Worker = new Worker();

  constructor() {
    this.waveSchedular = WaveSchedular.getInstance();
  }

  start() {
    console.log("******3",this.waveSchedular.waveQueue.length);

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.isPlaying = true;
      this.worker.startTimer();

      this.metronome.start();
      this.waveSchedular.start();
    } else {
      this.isPlaying = false;
      this.worker.stopTimer();

      this.metronome.stop();
      this.waveSchedular.stop();
    }
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
    this.metronome.setTempo(this.tempo);
  }
}
