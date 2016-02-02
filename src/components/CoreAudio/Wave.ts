import AudioInstrument from './AudioInstrument';
import WaveSchedular from '../Sequencer/WaveSchedular';

export default class Wave extends AudioInstrument {
  time:number = 0;
  duration:number = 0;
  wave:AudioBufferSourceNode;
  buffer:AudioBuffer;

  constructor(audioBuffer:AudioBuffer){
    super();
    this.buffer = audioBuffer;
    this.createWave();
    WaveSchedular.getInstance().pushWave(this);
  }

  createWave(){
    this.wave = this.context.createBufferSource();
    this.wave.buffer = this.buffer;
    this.duration = this.buffer.duration;
    this.wave.connect(this.output);
  }

  start(){
    console.log("Buffer",this.wave.buffer);
    this.wave.start();
  }
  stop(){
    this.wave.stop();
    //停止したらもう一度再生したいので
    this.createWave();
  }
}
