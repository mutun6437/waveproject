export default class AudioContextWrapper {
  static context: AudioContext;
  static getContext(): AudioContext {
    if (!this.context) {
      this.context = new AudioContext();
    }
    return this.context;
  };
}
