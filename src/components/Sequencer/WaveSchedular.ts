import Wave from '../CoreAudio/Wave';

export default class WaveSchedular {
  waveQueue: Wave[] = [];

  constructor() {

  }

  pushWave(wave: Wave) {
    this.waveQueue.push(wave);
  }

  //インスタンス比較でフィルタリング抽出する
  removeWave(wave: Wave) {
    this.waveQueue.filter((element: Wave, index: number, array: Wave[]) => {
      return element !== wave;
    });
  }

  start() {
    //暫定的にすべて再生する処理にする
    this.waveQueue.forEach((wave) => {
      wave.start();
    });
  }

  stop() {
    //暫定的にすべて再生する処理にする
    this.waveQueue.forEach((wave) => {
      wave.stop();
    });
  }


  static instance: WaveSchedular;
  static getInstance() {
    if (!this.instance) {
      this.instance = new WaveSchedular();
    }
    return this.instance;
  }
}
