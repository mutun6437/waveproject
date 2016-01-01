import AudioContextWrapper from '../CoreAudio/AudioContextWrapper';
import FileWrapper from './FileWrapper';

export default class XHRFileReader<T> {
  context: AudioContext;
  xhr: XMLHttpRequest;
  constructor(path: string) {
    this.xhr = new XMLHttpRequest();
    let url = FileWrapper.baseUrl() + path;
    this.xhr.open("GET", url);
    this.context = AudioContextWrapper.getContext();
  }
  readAsAudioData(): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      this.xhr.responseType = 'arraybuffer';
      this.xhr.onload = () => {
        if (this.xhr.status === 200) {
          let arrayBuffer = this.xhr.response;
          if (arrayBuffer instanceof ArrayBuffer) {
            let successCallback = (audioBuffer: AudioBuffer) => {
              resolve(audioBuffer);
            };
            let errorCallback = () => {
              reject({ code: this.xhr.status, message: "Cannot decode AudioFile" });
            };
            this.context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
          }
        }
      };
      this.xhr.send();
    });
  }

  readAsText(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.xhr.onload = () => {
        if (this.xhr.status === 200) {
          resolve(this.xhr.response);
        }else{
          reject(this.xhr.response);
        }
      };
      this.xhr.send();
    });
  }

  readAsJSON(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.xhr.responseType = "json";
      this.xhr.onload = () => {
        if (this.xhr.status === 200) {
          resolve(this.xhr.response);
        }else{
          reject(this.xhr.response);
        }
      };
      this.xhr.send();
    });
  }

}
