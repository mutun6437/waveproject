import Player from './Player/Player';
import Sequencer from '../../../components/Sequencer/Sequencer';

export default class ControlPanel {
  player:Player = null;
  constructor(sequencer:Sequencer){
    this.player = new Player(sequencer);
  }


}
