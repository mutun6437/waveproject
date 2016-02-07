import AudioComponent from '../CoreAudio/AudioComponent';
import AudioInstrument from '../CoreAudio/AudioInstrument';
import Wave from '../CoreAudio/Wave';
import XHRFileReader from '../File/XHRFileReader';

export default class WaveNode extends AudioInstrument {
  waves: Wave[] = [];

  constructor() {
    super();
    this.input.connect(this.output);
    this.element = document.createElement("div");
  }

  createWave(): Promise<{}> {
    return new XHRFileReader("../../public/audio/master.mp3").readAsAudioData().then((audioBuffer: AudioBuffer) => {
      console.log("読み込み完了");
      this.waves.push(new Wave(audioBuffer));
      this.fetchWaves();
    }, () => {
      console.log("読み込みエラー");
      return Promise.reject({});
    });
  }

  removeWave() {

  }

  fetchWaves() {
    for (var i = this.element.childNodes.length - 1; i >= 0; i--) {
      this.element.removeChild(this.element.childNodes[i]);
    }
    this.waves.forEach((wave) => {
      //TODO すでに接続されている音源をdisconnectする処理が必要そう
      console.log("[WaveNode]fetchWaves");
      this.element.appendChild(wave.element);
      wave.connect(this);
    });
  }

  setEvent(){
    //Draggableを設定
  }


  start() { }
  stop() { }

}
