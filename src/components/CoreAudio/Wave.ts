import AudioInstrument from './AudioInstrument';
import WaveSchedular from '../Sequencer/WaveSchedular';
import CommonUtils from '../../System/Utils/CommonUtils';

export default class Wave extends AudioInstrument {
  id:string;
  time: number = 0;
  duration: number = 0;
  wave: AudioBufferSourceNode;
  buffer: AudioBuffer;

  constructor(audioBuffer: AudioBuffer, time?: number) {
    super();
    this.buffer = audioBuffer;
    this.id = CommonUtils.uuid();
    this.createWave(time ? time : 0);
    this.createElement();
    WaveSchedular.getInstance().pushWave(this);
  }

  createWave(time?: number) {
    this.wave = this.context.createBufferSource();
    this.time = time ? time : this.time;
    this.wave.buffer = this.buffer;
    this.duration = this.buffer.duration;
    this.wave.connect(this.output);
  }

  removeTrack() {
    WaveSchedular.getInstance().removeWave(this);
  }


  createElement() {
    this.element = document.createElement("div");
    this.element.className = "wave";
    this.element.id = this.id;
    this.element.clientWidth = 200;
  }

  start() {
    console.log("Buffer", this.wave.buffer);
    this.wave.start();
  }
  stop() {
    this.wave.stop();
    //停止したらもう一度再生したいので
    this.createWave();
  }
}
