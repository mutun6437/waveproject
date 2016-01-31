/// <reference path="../typings/tsd.d.ts" />
import StreamNode from './components/Instrument/StreamNode';
import AudioContextWrapper from './components/CoreAudio/AudioContextWrapper';
import Mixer from './components/Mixer/Mixer';
import Debug from './components/Debug/Debug';
import Effects from './components/Effects/Effects';
import Distortion from './components/Effects/Distortion/Distortion';
import Delay from './components/Effects/Delay/Delay';
import Reverb from './components/Effects/Reverb/Reverb';
import TrackWindow from './System/UI/TrackWindow/TrackWindow';
import AudioSchedular from './Worker/AudioSchedular';
import Sequencer from './components/Sequencer/Sequencer';
import ControlPanel from './System/UI/ControlPanel/ControlPanel';

let sequencer:Sequencer = null;


window.onload = () => {
  let stream = new StreamNode();
  let mixer = new Mixer();
  mixer.createTrack(stream);

  Debug.createDebugButton("addDistortion", () => {
    let distortion = new Distortion();
    mixer.getTrack(1).insertNode(1, distortion);
  });

  let delay: Delay = new Delay();
  let delay2: Delay = new Delay();
  let reverb: Reverb = new Reverb();

  Debug.createDebugButton("addDelay", () => {
    delay.openWindow();
    mixer.getTrack(1).insertNode(2, delay);
  });

  Debug.createDebugButton("removeDelay", () => {
    delay.closeWindow();
  });

  Debug.createDebugButton("addDelay", () => {
    delay2.openWindow();
    mixer.getTrack(1).insertNode(3, delay);
  });

  Debug.createDebugButton("removeDelay", () => {
    delay2.closeWindow();
  });

  Debug.createDebugButton("addReverb", () => {
    reverb.openWindow();
    mixer.getTrack(1).insertNode(3, reverb);
  });

  Debug.createDebugButton("removeReverb", () => {
    reverb.closeWindow();
  });


  sequencer = new Sequencer();
  Debug.createDebugButton("start", () => {
    if(sequencer.isPlaying){
      sequencer.stop();
    }else{
      sequencer.start();
    }
  });


  //画面UIを構築
  new TrackWindow();
  new ControlPanel(sequencer);


  //sequencer.start();

  window.addEventListener("tick",()=>{
    console.log("abc");
  });

}
