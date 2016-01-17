import * as React from 'react';
import BaseWindow from '../UI/BaseWindow';

export default class TrackWindow extends BaseWindow<Props,State> {
  constructor(props: Props) {
    super(props);
  }

  addNode(index: number, node: React.Component<any, any>) {
    this.props.nodes[index] = node;
  }
  removeNode(index: number) {
    this.props.nodes[index] = null;
  }

  contents() {
    return (
      <div className="AudioComponent">
        {this.props.nodes.map((node: React.Component<any, any>) => {
          return node ? node : null;
        }) }
        </div>
    );
  }
}

interface Props {
  nodes: React.Component<any, any>[];
}

interface State {
  isShow:boolean;
}
