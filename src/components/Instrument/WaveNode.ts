import AudioComponent from '../CoreAudio/AudioComponent';
import AudioInstrument from '../CoreAudio/AudioInstrument';
import Wave from '../CoreAudio/Wave';
import XHRFileReader from '../File/XHRFileReader';

export default class WaveNode extends AudioInstrument {
  waves: Wave[] = [];

  constructor() {
    super();
    this.input.connect(this.output);
  }

  createWave(): Promise<{}> {
    return new XHRFileReader("../../public/audio/master.mp3").readAsAudioData().then((e: AudioBuffer) => {
      console.log("読み込み完了");
      this.waves.push(new Wave(e));
      this.fetchWaves();
    }, () => {
      console.log("読み込みエラー");
      return Promise.reject({});
    });
  }

  removeWave() {

  }

  fetchWaves() {
    this.waves.forEach((wave) => {
      //TODO すでに接続されている音源をdisconnectする処理が必要そう
      console.log("[WaveNode]fetchWaves");
      wave.connect(this);
    });
  }

  start() { }
  stop() { }

}
