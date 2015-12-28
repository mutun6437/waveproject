import Utils from '../../Utils/NumberUtils';
import AudioComponent from '../../CoreAudio/AudioComponent';

//TODO 動作確認待ち
export default class Delay extends AudioComponent {
  private delay: DelayNode;
  private dry: GainNode;
  private wet: GainNode;
  private feedback: GainNode;

  constructor() {
    super();
    this.delay = this.context.createDelay();
    this.delay.delayTime.value = 0.25;

    this.dry = this.context.createGain();
    this.wet = this.context.createGain();
    this.feedback = this.context.createGain();

    //初期パラメータ
    this.dry.gain.value = 0.7;
    this.wet.gain.value = 0.3;
    this.feedback.gain.value = 0.5;


    this.input.connect(this.dry);
    this.input.connect(this.delay);

    this.delay.connect(this.wet);
    this.delay.connect(this.feedback);
    this.feedback.connect(this.delay);

    this.wet.connect(this.output);
    this.dry.connect(this.output);
  }

  setDelayTime(value: number) {
    if (!Utils.isValid(value)) {
      this.delay.delayTime.value = value;
    }
  }

  //Dry + Wet =  1.0; TODO Test
  setWetRatio(value: number) {
    if (!Utils.isValid(value)) {
      value = value >= 1.0 ? 1.0 : value;
      value = value <= 0.0 ? 0.0 : value;
      this.wet.gain.value = value;
      this.dry.gain.value = 1 - value;
    }
  }

  setFeedback(value: number) {
    if (!Utils.isValid(value)) {
      this.feedback.gain.value = value;
    }
  }

  getDelayValue():DelayParam {
    return {
      delayTime: this.delay.delayTime.value,
      wet: this.wet.gain.value,
      dry: this.dry.gain.value,
      feedback: this.feedback.gain.value
    };
  }
}

export interface DelayParam {
  delayTime: number;
  wet: number;
  dry: number;
  feedback: number;
}
