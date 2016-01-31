import AudioComponent from '../CoreAudio/AudioComponent';
import AudioInstrument from '../CoreAudio/AudioInstrument';

export default class WaveNode extends AudioInstrument {
  waves:Wave[] = []

  constructor() {
    super();
  }

}
