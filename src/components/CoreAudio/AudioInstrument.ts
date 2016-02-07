import AudioContextWrapper from './AudioContextWrapper';
import AudioSystem from './AudioSystem';

abstract class AudioInstrument {
  index:number;
  element:HTMLElement;
  context: AudioContext = null;
  input: GainNode;
  output: GainNode;

  constructor() {
    this.context = AudioContextWrapper.getContext();
    this.input = this.context.createGain();
    this.output = this.context.createGain();
  }

  connect(node: AudioSystem) {
    console.log("[AudioNodeWrapper]Connect", node);
    this.output.connect(node.input);
  }

  disconnect() {
    console.log("[AudioNodeWrapper]Disconnect");
    this.output.disconnect();
  }

  setTrackNumber(index: number) {
    this.index = index;
  }

  abstract setEvent():void;

}
export default AudioInstrument;
