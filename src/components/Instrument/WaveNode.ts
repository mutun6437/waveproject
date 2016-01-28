import AudioComponent from '../CoreAudio/AudioComponent';
import AudioInstrument from '../CoreAudio/AudioInstrument';

export default class WaveNode extends AudioInstrument {

  constructor() {
    super();
  }

  connectionErrorHandler(e:Error){
    console.log("[StreamNode]接続エラー",e);
  }
}
