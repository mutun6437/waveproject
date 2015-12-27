import AudioComponent from '../CoreAudio/AudioComponent';

export default class Track extends AudioComponent {
  number: number;
  nodes: AudioComponent[] = [];

  constructor(number: number) {
    super();
    this.number = number;
    this.fetchAudioNode();
  }

  insertNode(index: number, node: AudioComponent, isSort?: boolean) {
    console.log("Nodes", this.nodes.length, "index", index, "node", node);
    this.nodes[index] = node;
    this.fetchAudioNode();
    //TODO 挿入するか上書きするか
  }

  fetchAudioNode() {
    console.log("[Track]fetchAudioNode");
    this.resetNode();
    let nodes = this.resolveNode();
    if (nodes.length === 0) {
      this.input.connect(this.output);
    } else {
      this.input.connect(nodes[0].input);
      for (let i = 0; i < nodes.length; i++) {
        if (i === nodes.length - 1) {
          nodes[i].output.connect(this.output);
        } else {
          nodes[i].output.connect(nodes[i + 1].input);
        }
      }
    }
  }

  resolveNode(): AudioComponent[] {
    let nodes = [];
    console.log("resolve",nodes);
    this.nodes.map((value:AudioComponent, index:number) => {
      if (value) {
        nodes.push(value);
      }
    });
    console.log("resolved",nodes);
    return nodes;
  }

  resetNode() {
    this.input.disconnect();
    console.log(this.nodes.length);
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i]) {
        this.nodes[i].output.disconnect();
      }
    }
  }


}