import AudioComponent from '../../CoreAudio/AudioComponent';

export default class Distortion extends AudioComponent {
  name: string = "Effects/Distortion";
  distortion: WaveShaperNode;
  constructor() {
    super();
    this.distortion = this.context.createWaveShaper();
    this.distortion.curve = this.createDistortionCurve(600);

    this.input.connect(this.distortion);
    this.distortion.connect(this.output);
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

  setDomEvent(element: HTMLLinkElement) {
    
  }
}
