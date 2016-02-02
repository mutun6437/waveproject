export default class Effects {
  name:string;
  constructor(name:string){
    this.name = name;
  }

  private static distortion = new Effects("distortion");
  private static delay = new Effects("delay");
  private static reverb = new Effects("reverb");
  private static vocoder = new Effects("vocoder");

  private static values:Effects[] = [Effects.distortion,Effects.delay,Effects.reverb,Effects.vocoder];
  static getList():Effects[] {
    return Effects.values;
  }
}
