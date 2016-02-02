export default class AudioContextWrapper {
  static context: AudioContext;
  static getContext(): AudioContext {
    if (!this.context) {
      this.context = new AudioContext();
    }
    return this.context;
  };

  static getBufferSize() {
    if (/(Win(dows )?NT 6\.2)/.test(navigator.userAgent)) {
      return 1024;  // Windows 8
    } else if (/(Win(dows )?NT 6\.1)/.test(navigator.userAgent)) {
      return 1024;  // Windows 7
    } else if (/(Win(dows )?NT 6\.0)/.test(navigator.userAgent)) {
      return 2048;  // Windows Vista
    } else if (/Win(dows )?(NT 5\.1|XP)/.test(navigator.userAgent)) {
      return 4096;  // Windows XP
    } else if (/Mac|PPC/.test(navigator.userAgent)) {
      return 1024;  // Mac OS X
    } else if (/Linux/.test(navigator.userAgent)) {
      return 8192;  // Linux
    } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      return 2048;  // iOS
    } else {
      return 16384;  // Otherwise
    }
  }
}
