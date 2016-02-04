import Utils from '../../../System/Utils/NumberUtils';
import AudioComponent from '../../CoreAudio/AudioComponent';
import XHRFileReader from '../../File/XHRFileReader';
import NumberUtils from '../../../System/Utils/NumberUtils';

export default class Ampsimulator extends AudioComponent {
  name: string = "Effects/Ampsimulator";

  gain: WaveShaperNode = null;
  reverb: ConvolverNode = null;
  wet:GainNode = null;
  dry:GainNode = null;
  master: GainNode = null;
  bass: BiquadFilterNode = null;
  middle: BiquadFilterNode = null;
  treble: BiquadFilterNode = null;


  constructor() {
    super();

    //Node 作成
    this.gain = this.context.createWaveShaper();
    this.bass = this.context.createBiquadFilter();
    this.middle = this.context.createBiquadFilter();
    this.treble = this.context.createBiquadFilter();
    this.reverb = this.context.createConvolver();
    this.wet = this.context.createGain();
    this.dry = this.context.createGain();
    this.master = this.context.createGain();

    this.initializeNode();
    this.connectNode();
  }

  setValue(target: number, value: number) {
    if (!Utils.isValid(value)) {
      console.log("[Amp]set" + target + "Value:", value);
      target = value;
    }
  }

  setDomEvent(element: HTMLElement) {
    let gain = element.getElementsByClassName("Amp/Gain")[0] as HTMLInputElement;
    gain.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      let value = parseInt(target.value);
      console.log(value);
      this.gain.curve = this.createDistortionCurve(value);
    };

    let bass = element.getElementsByClassName("Amp/Bass")[0] as HTMLInputElement;
    bass.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      let value = parseInt(target.value) - 40;
      console.log(value);
      this.bass.gain.value = value;
    };

    let middle = element.getElementsByClassName("Amp/Middle")[0] as HTMLInputElement;
    middle.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      let value = parseInt(target.value) - 40;
      console.log(value);
      this.middle.gain.value = value;
    };

    let treble = element.getElementsByClassName("Amp/Treble")[0] as HTMLInputElement;
    treble.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      let value = parseInt(target.value) - 40;
      console.log(value);
      this.treble.gain.value = value;
    };

    let reverb = element.getElementsByClassName("Amp/Reverb")[0] as HTMLInputElement;
    treble.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      let value = parseInt(target.value)/100;
      console.log(value);
      this.setWetRatio(value);
    };

    let master = element.getElementsByClassName("Amp/Master")[0] as HTMLInputElement;
    master.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      let value = parseInt(target.value)/100;
      console.log(value);
      this.master.gain.value = value;
    };


  }

  resetConvolver() {
    new XHRFileReader("Effects/Reverb/impulse/hall.wav")
      .readAsAudioData().then((audioBuffer: AudioBuffer) => {
        console.log("[Reverb]Reset Convolver");
        this.reverb.buffer = audioBuffer;
      }).catch(() => {
        console.log("[Reverb]Bad Request");
      });
  }


  initializeNode() {

    //Gain
    this.gain.curve = this.createDistortionCurve(600);

    //Filter
    this.bass.type = 'lowshelf';
    this.middle.type = 'peaking';
    this.treble.type = 'highshelf';

    this.bass.frequency.value = 500;  //  500 Hz
    this.middle.frequency.value = 1000;  // 1000 Hz
    this.treble.frequency.value = 2000;  // 2000 Hz

    // bass.Q.value   = Math.SQRT1_2;  // Not used
    this.middle.Q.value = Math.SQRT1_2;
    // treble.Q.value = Math.SQRT1_2;  // Not used

    this.resetConvolver();

    this.bass.gain.value = 18;  // + 18dB (boost)
    this.middle.gain.value = -18;  // - 18dB (cut)
    this.treble.gain.value = 18;  // + 18dB (boost)

    this.setWetRatio(0.5);

    this.master.gain.defaultValue = 1.0;
  }

  setWetRatio(value: number) {
    if (!NumberUtils.isValid(value)) {
      value = value >= 1.0 ? 1.0 : value;
      value = value <= 0.0 ? 0.0 : value;
      console.log("[Reverb]setWetRatio", "wet:" + value, "dry:" + (1 - value));
      this.wet.gain.value = value;
      this.dry.gain.value = 1 - value;
    }
  }



  connectNode() {
    this.input.connect(this.gain);
    this.gain.connect(this.bass);
    this.bass.connect(this.middle);
    this.middle.connect(this.treble);
    this.treble.connect(this.dry);
    this.treble.connect(this.wet);
    this.dry.connect(this.master);
    this.wet.connect(this.reverb);
    this.reverb.connect(this.master);
    this.master.connect(this.output);
  }

  createDistortionCurve(amount: number) {
    var amount = typeof amount === 'number' ? amount : 50,
      n_samples = this.context.sampleRate,
      curve = new Float32Array(n_samples),
      deg: number = Math.PI / 180,
      i: number = 0,
      x: number;
    for (let i = 0; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  }

}

export interface DelayParam {
  delayTime: number;
  wet: number;
  dry: number;
  feedback: number;
}
