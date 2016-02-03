import Utils from '../../../System/Utils/NumberUtils';
import AudioComponent from '../../CoreAudio/AudioComponent';

export default class Delay extends AudioComponent {
  name: string = "Effects/Delay";

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
      console.log("[Delay]setDelayTime:", value);
      this.delay.delayTime.value = value;
    }
  }

  //Dry + Wet =  1.0; TODO Test
  setWetRatio(value: number) {
    if (!Utils.isValid(value)) {
      value = value >= 1.0 ? 1.0 : value;
      value = value <= 0.0 ? 0.0 : value;
      console.log("[Delay]setWetRatio", "wet:" + value, "dry:" + (1 - value));
      this.wet.gain.value = value;
      this.dry.gain.value = 1 - value;
    }
  }

  setFeedback(value: number) {
    if (!Utils.isValid(value)) {
      console.log("[Delay]setFeedback",value);
      this.feedback.gain.value = value;
    }
  }

  getDelayValue(): DelayParam {
    return {
      delayTime: this.delay.delayTime.value,
      wet: this.wet.gain.value,
      dry: this.dry.gain.value,
      feedback: this.feedback.gain.value
    };
  }

  setDomEvent(element: HTMLElement) {
    let delayTime = element.getElementsByClassName("delayTime")[0] as HTMLInputElement;
    delayTime.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      delayTime.value = target.value;
      this.setDelayTime((parseInt(delayTime.value) / 100));
    };

    let wet = element.getElementsByClassName("wet/dry")[0] as HTMLInputElement;
    wet.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      wet.value = target.value;
      this.setWetRatio((parseInt(wet.value) / 100));
    };

    let feedback = element.getElementsByClassName("feedback")[0] as HTMLInputElement;
    feedback.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      feedback.value = target.value;
      this.setFeedback((parseInt(feedback.value) / 100));
    };
  }

}

export interface DelayParam {
  delayTime: number;
  wet: number;
  dry: number;
  feedback: number;
}
