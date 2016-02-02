import Wave from '../CoreAudio/Wave';

export default class WaveSchedular {
  waveQueue:Wave[] = [];

  constructor(){

  }

  //
  pushWave(wave:Wave){
    console.log("******2");
    this.waveQueue.push(wave);
  }

  //TODO 削除用のなにかidを割り当てる
  removeWave(){}

  start(){
    //暫定的にすべて再生する処理にする
    this.waveQueue.forEach((wave)=>{
      wave.start();
    });
  }

  stop(){
    //暫定的にすべて再生する処理にする
    this.waveQueue.forEach((wave)=>{
      wave.stop();
    });
  }


  static instance:WaveSchedular;
  static getInstance(){
    if(!this.instance){
      this.instance = new WaveSchedular();
    }
    return this.instance;
  }
}
