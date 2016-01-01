import AudioComponent from '../../CoreAudio/AudioComponent';
import XHRFileReader from '../../File/XHRFileReader';
import NumberUtils from '../../Utils/NumberUtils';

export default class Reverb extends AudioComponent {
  name:string = "Effects/Reverb"
  currentType: ImpulceAudio;
  private convolver: ConvolverNode;
  private dry: GainNode;
  private wet: GainNode;

  constructor() {
    super();
    this.convolver = this.context.createConvolver();
    this.dry = this.context.createGain();
    this.wet = this.context.createGain();

    //初期パラメータ
    this.currentType = this.type["hall"];
    this.dry.gain.value = 0.7;
    this.wet.gain.value = 0.3;

    this.input.connect(this.dry);
    this.input.connect(this.convolver);
    this.convolver.connect(this.wet);
    this.wet.connect(this.output);
    this.dry.connect(this.output);

    this.resetConvolver();
  }

  //Dry + Wet =  1.0; TODO Test
  setWetRatio(value: number) {
    if (!NumberUtils.isValid(value)) {
      value = value >= 1.0 ? 1.0 : value;
      value = value <= 0.0 ? 0.0 : value;
      this.wet.gain.value = value;
      this.dry.gain.value = 1 - value;
    }
  }

  changeConvolverType(type: string) {
    switch (type) {
      case "none":
        this.currentType = this.type["none"];
      case "hall":
        this.currentType = this.type["hall"];
      case "chapel":
        this.currentType = this.type["chapel"];
      default:
      //Typeが一致しなければなにもしない
    }
    this.resetConvolver();
  }

  resetConvolver() {
    if (this.currentType) {

      new XHRFileReader(this.currentType.audio)
        .readAsAudioData().then((audioBuffer: AudioBuffer) => {
          console.log("[Reverb]Reset Convolver");
          this.convolver.buffer = audioBuffer;
        }).catch(() => {
          console.log("[Reverb]Bad Request");
          this.currentType = this.type["none"];
          this.setWetRatio(0);
        });
    }
  }

  //TODO 画像のリストと名前を送る？
  getConvolverList() {

  }



  //TODO JSONとして外に出すべき？？ PathをUtil化して他のところでもアクセスできるようにする
  private type: { [key: string]: ImpulceAudio } = {
    "none": null,
    "hall": {
      audio: "Effects/Reverb/impulse/hall.wav",
      image: "Effects/Reverb/impulse/hall.jpg"
    },
    "chapel": {
      audio: "Effects/Reverb/impulce/chapel.wav",
      image: "Effects/Reverb/impulce/chapel.jpg"
    }
  }

}

export interface ImpulceAudio {
  audio: string;
  image: string;
}
