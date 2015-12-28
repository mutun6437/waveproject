import AudioComponent from '../../CoreAudio/AudioComponent';

export default class Reverb extends AudioComponent {
  private convolver:ConvolverNode;


  constructor() {
    super();

  }

  //環境に合わせたオーディオファイルを持っておく。 XHRもしくはFileAPI。
}
