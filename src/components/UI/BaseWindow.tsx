import * as React from 'react'
import {BaseState} from './BaseState';


abstract class BaseWindow<T, S> extends React.Component<T, BaseState> {
  state:BaseState;

  constructor(props: T) {
    super(props);
    this.state = { isShow: false };
  }

  openWindow() {
    console.log(this.state);
    // this.setState({ isShow: true });
  }

  closeWindow() {
    // this.setState({ isShow: false });
  }

  abstract contents(): JSX.Element;
}

export default BaseWindow;
