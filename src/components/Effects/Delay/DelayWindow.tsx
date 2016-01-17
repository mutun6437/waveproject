import * as React from 'react';
import BaseWindow from '../../UI/BaseWindow';

interface Props {
  setDelayTime: (value: number) => void;
  setWetRatio: (value: number) => void;
  setFeedback: (value: number) => void;
}

interface State {
  isShow:boolean;
}

export default class DelayWindow extends BaseWindow<Props, State>  {
  constructor(props: Props) {
    super(props);
  }
  contents() {
    return (
      <h3>Delay</h3>
    );
  }

}
