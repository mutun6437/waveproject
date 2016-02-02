import AudioComponent from '../CoreAudio/AudioComponent';
import AudioSystem from '../CoreAudio/AudioSystem';

export default class Track extends AudioSystem {
  number: number;
  nodes: AudioComponent[] = [];


  /**
   * 1~ の数字にコンポーネントを挿入
   * fetchAudioNodeが正しく連結し、ノードを生成
   */

  constructor(number: number) {
    super();
    this.number = number;
    this.fetchAudioNode();

    this.setDomElement();
  }

  insertNode(index: number, node: AudioComponent, isSort?: boolean) {
    console.log("Nodes", this.nodes.length, "index", index, "node", node);
    this.nodes[index] = node;
    this.fetchAudioNode();
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
    let nodes: AudioComponent[] = [];
    this.nodes.map((value: AudioComponent, index: number) => {
      if (value) {
        nodes.push(value);
      }
    });
    console.log("Track [ " + this.number + "] :Nodes:", nodes);
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

  getAudioNode(index: number): AudioComponent {
    return this.nodes[index] ? this.nodes[index] : null;
  }

  getDOMElement():HTMLElement{
    let el = document.createElement("div");
    el.id = "track"+this.number;
    el.className = "track";
    el.style.top =  "0px";
    console.log(50*this.number+"px",document.getElementById("grid").clientHeight);
    el.style.position = "relative";
    return el;
  }
  
  setDomElement(){
    document.getElementById("pool").appendChild(this.getDOMElement());
  }

}
