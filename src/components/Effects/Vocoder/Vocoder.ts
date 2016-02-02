import AudioComponent from '../../CoreAudio/AudioComponent';
import AudioContextWrapper from '../../CoreAudio/AudioContextWrapper';

export default class Vocoder extends AudioComponent {
  name: string = "Effects/Vocoder";

  context: AudioContext = AudioContextWrapper.getContext();
  fft: any = null;
  pitch: number = 2.0;
  pitchShift: ScriptProcessorNode;

  constructor() {
    super();

    this.fft = new FFT(AudioContextWrapper.getBufferSize(), this.context.sampleRate);

    this.pitchShift = AudioContextWrapper.getContext().createScriptProcessor();
    this.pitchShift.onaudioprocess = (e: AudioProcessingEvent) => {
      this.transport(e);
    }

    this.input.connect(this.pitchShift);
    this.pitchShift.connect(this.output);
  }

  off() {
    this.pitch = 1.0;
  }
  togglePitch() {
    if (this.pitch === 0) { this.pitch = 0.7 };
    this.pitch = (2.0 + 0.7) - this.pitch;
  }

  pshift(val: any, indata: any): any[] {
    this.fft.forward(indata);
    let a_real: number[] = [];
    let a_imag: number[] = [];
    for (let i = 0; i < AudioContextWrapper.getBufferSize(); i++) {
      a_real[i] = 0;
      a_imag[i] = 0;
    }
    for (var i = 0; i < AudioContextWrapper.getBufferSize(); i++) {
      let index = i * val;
      let eq = 1.0;
      if (i > AudioContextWrapper.getBufferSize() / 2) {
        eq = 0;
      }
      if ((index >= 0) && (index < AudioContextWrapper.getBufferSize())) {
        a_real[index] += this.fft.real[i] * eq;
        a_imag[index] += this.fft.imag[i] * eq;
      }
    }
    return this.fft.inverse(a_real, a_imag);
  }


  transport(e: AudioProcessingEvent) {
    let lin = e.inputBuffer.getChannelData(0);
    let lout = e.outputBuffer.getChannelData(0);
    let rin = e.inputBuffer.getChannelData(1);
    let rout = e.outputBuffer.getChannelData(1);

    let data = this.pshift(this.pitch, lin);    // 1.0:normal  2.0:1oct up  0.5:1oct down
    for (let i = 0; i < lin.length; i++) {
      lout[i] = data[i];
      rout[i] = data[i];
    }
  }

  setDomEvent(element: HTMLElement) {
    let pitch = element.getElementsByClassName("Vocoder/Pitch")[0] as HTMLInputElement;
    pitch.onchange = (ev: Event) => {
      let target = ev.target as HTMLInputElement;
      pitch.value = target.value;
      this.pitch = parseFloat(target.value);
    };
  }
}
