import * as React from 'react';
import AudioContextWrapper from './AudioContextWrapper';
import View from '../UI/View';
import BaseWindow from '../UI/BaseWindow';

abstract class AudioComponent {
  context: AudioContext = null;
  input: GainNode;
  output: GainNode;
  window:BaseWindow<any,any>;

  constructor() {
    //super();
    this.context = AudioContextWrapper.getContext();
    this.input = this.context.createGain();
    this.output = this.context.createGain();
  }

  connect(node: AudioComponent) {
    console.log("[AudioNodeWrapper]Connect", node);
    this.output.connect(node.input);
  }

  disconnect() {
    console.log("[AudioNodeWrapper]Disconnect");
    this.output.disconnect();
  }

  getComponent():React.Component<any,any>{
    return this.window;
  };

  // openWindow(){
  //   this.window.openWindow();
  // }
  //
  // closeWindow(){
  //   this.window.closeWindow();
  // }

}
export default  AudioComponent
