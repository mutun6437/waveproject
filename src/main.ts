/// <reference path="../typings/tsd.d.ts" />
import StreamNode from './javascripts/Instrument/StreamNode';
import AudioContextWrapper from './javascripts/CoreAudio/AudioContextWrapper';
import Mixer from './javascripts/Mixer/Mixer';
import Debug from './javascripts/Debug/Debug';
import Effects from './javascripts/Effects/Effects';
import Distortion from './javascripts/Effects/Distortion/Distortion';
import Delay from './javascripts/Effects/Delay/Delay';

window.onload = () => {
  let stream = new StreamNode();
  let mixer = new Mixer();
  mixer.createTrack(stream);


  Debug.createDebugButton("addDistortion", () => {
    let distortion = new Distortion();
    mixer.getTrack(1).insertNode(1, distortion);
  });


  Debug.createDebugButton("addReverb", () => {
    let delay = new Delay();
    mixer.getTrack(1).insertNode(2, delay);
  });









  Debug.lineBreak();
  Debug.createEffectOpen(()=>{
    console.log("open");
  });
  Debug.createEffectList();

}
