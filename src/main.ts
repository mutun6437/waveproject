/// <reference path="../typings/tsd.d.ts" />
import StreamNode from './javascripts/Instrument/StreamNode';
import AudioContextWrapper from './javascripts/CoreAudio/AudioContextWrapper';
import Mixer from './javascripts/Mixer/Mixer';
import Debug from './javascripts/Debug/Debug';
import Distortion from './javascripts/Effects/Distortion/Distortion';


window.onload = ()=>{
  let stream = new StreamNode();

  let mixer = new Mixer();

  let context = AudioContextWrapper.getContext();

  mixer.createTrack(stream);

  Debug.createDebugButton("addDistortion",()=>{
    let distortion = new Distortion();
    mixer.getTrack(1).insertNode(1,distortion);
  });

}
