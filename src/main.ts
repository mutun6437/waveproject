/// <reference path="../typings/tsd.d.ts" />
import StreamNode from './components/Instrument/StreamNode';
import AudioContextWrapper from './components/CoreAudio/AudioContextWrapper';
import Mixer from './components/Mixer/Mixer';
import Debug from './components/Debug/Debug';
import Effects from './components/Effects/Effects';
import Distortion from './components/Effects/Distortion/Distortion';
import Delay from './components/Effects/Delay/Delay';
import Reverb from './components/Effects/Reverb/Reverb';
import * as React from 'react'
import * as ReactDom from 'react-dom';

import {ReactSample} from './test/React';

window.onload = () => {
  let stream = new StreamNode();
  let mixer = new Mixer();
  mixer.createTrack(stream);


  Debug.createDebugButton("addDistortion", () => {
    let distortion = new Distortion();
    mixer.getTrack(1).insertNode(1, distortion);
  });

  let delay:Delay = new Delay();
  let delay2:Delay = new Delay();
  let reverb:Reverb = new Reverb();

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
    mixer.getTrack(1).insertNode(3,reverb);
  });

  Debug.createDebugButton("removeReverb", () => {
    reverb.closeWindow();
  });


  Debug.lineBreak();
  Debug.createEffectOpen(() => {
    console.log("open");
  });
  Debug.createEffectList();


  ReactDom.render(React.createElement(ReactSample),document.getElementById("react"));
}
