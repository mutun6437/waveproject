import * as React from 'react';
import AudioContextWrapper from './AudioContextWrapper';
import View from '../UI/View';
import BaseWindow from '../UI/BaseWindow';

abstract class AudioComponent extends View {
  context: AudioContext = null;
  input: GainNode;
  output: GainNode;

  constructor() {
    super();
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

}
export default  AudioComponent;
