import AudioContextWrapper from './AudioContextWrapper';

abstract class AudioInstrument{
  context: AudioContext = null;
  input: GainNode;
  output: GainNode;

  constructor() {
    this.context = AudioContextWrapper.getContext();
    this.input = this.context.createGain();
    this.output = this.context.createGain();
  }

  connect(node: AudioInstrument) {
    console.log("[AudioNodeWrapper]Connect", node);
    this.output.connect(node.input);
  }

  disconnect() {
    console.log("[AudioNodeWrapper]Disconnect");
    this.output.disconnect();
  }
}
export default  AudioInstrument;
