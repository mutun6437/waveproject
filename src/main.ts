/// <reference path="../typings/tsd.d.ts" />
import StreamNode from './components/Instrument/StreamNode';
import AudioContextWrapper from './components/CoreAudio/AudioContextWrapper';
import Mixer from './components/Mixer/Mixer';
import Debug from './components/Debug/Debug';
import Effects from './components/Effects/Effects';
import Distortion from './components/Effects/Distortion/Distortion';
import Delay from './components/Effects/Delay/Delay';
import Reverb from './components/Effects/Reverb/Reverb';

window.onload = () => {
  let stream = new StreamNode();
  let mixer = new Mixer();
  mixer.createTrack(stream);


  Debug.createDebugButton("addDistortion", () => {
    let distortion = new Distortion();
    mixer.getTrack(1).insertNode(1, distortion);
  });


  Debug.createDebugButton("addDelay", () => {
    let delay = new Delay();
    delay.openWindow();
    mixer.getTrack(1).insertNode(2, delay);
  });

  Debug.createDebugButton("addReverb", () => {
    let reverb = new Reverb();
    mixer.getTrack(1).insertNode(3,reverb);
  });









  Debug.lineBreak();
  Debug.createEffectOpen(() => {
    console.log("open");
  });
  Debug.createEffectList();

}
