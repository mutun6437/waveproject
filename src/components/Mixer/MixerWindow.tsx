import * as React from 'react';
import BaseWindow from '../UI/BaseWindow';

class Mixer extends BaseWindow<Props,State>{
  constructor(props: Props) {
    super(props);
  }

  addNode(index: number, node: React.Component<any, any>) {
    this.props.tracks[index] = node;
  }
  removeNode(index:number){
    this.props.tracks[index] = null;
  }

  contents() {
    return (
      <div className="AudioComponent">
        Mixer
      </div>
    );
  }

  render() {
    //console.log(this.state);
    //let content = this.state.isShow ? this.contents() : null;
    return (
      <div>
        {this.state}
      </div>
    );
  }
}
interface Props {
  tracks: React.Component<any, any>[];
}

interface State {
  isShow:boolean;
}

let MixerWindow = React.createClass(Mixer);


// {this.props.tracks.map((track: React.Component<any, any>) => {
//   return track ? track : null;
// }) }
