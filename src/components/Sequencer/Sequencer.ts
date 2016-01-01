// import WaveAudioContext from '../CoreAudio/WaveAudioContext';
// import { WebAudioScheduler } from 'web-audio-scheduler';
// var WebAudioScheduler = require("web-audio-scheduler");
// import Track from './Track';
//
// export default class Sequencer {
//   scheduler:WebAudioScheduler;
//   tracks:Track[];
//
//   tempo:number = null;
//
//   constructor(tempo:number){
//     this.scheduler = new WebAudioScheduler({ context: WaveAudioContext.getContext() });
//     this.tempo = tempo;
//   }
//
//
//   play(){
//     //tracksのすべてのスケジュールをschedulerに渡し再生する
//   }
//
//
//   createTrack(){
//     this.tracks.push(new Track(this.scheduler));
//   }
//
//   setTempo(tempo:number){
//     this.tempo = tempo;
//   }
//
// }
