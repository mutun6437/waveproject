import AudioContextWrapper from './AudioContextWrapper';
import Component from '../UI/Component';

export default class AudioComponent extends Component {
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
