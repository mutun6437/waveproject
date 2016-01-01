export default class Effects {
  name:string;
  constructor(name:string){
    this.name = name;
  }

  private static distortion = new Effects("distortion");
  private static delay = new Effects("delay");
  private static reverb = new Effects("reverb");

  private static values:Effects[] = [Effects.distortion,Effects.delay,Effects.reverb];
  static getList():Effects[] {
    return Effects.values;
  }
}
