import XHRFileReader from '../File/XHRFileReader';
import View from './View';

export default class Component {
  name: string = null;
  manifest: Manifest = null;
  view: View;
  constructor() { }

  protected load(): Promise<{}> {
    return new Promise((resolve, reject) => {
      new XHRFileReader<Manifest>( this.name + "/manifest.json").readAsJSON()
        .then((manifest: Manifest) => {
          console.log("1");
          this.manifest = manifest;
          resolve();
        }, () => {
          console.log("マニフェストが存在しないときはどうするか検討しましょう");
          reject();
        });
    });
  }

  openWindow() {
    let promise = Promise.resolve();
    if (!this.manifest) {
      promise = promise.then(() => {
        return this.load();
      }).catch(() => {
        //TODO　Manifestがロードできなかったとき
        return Promise.resolve();
      });
    }
    promise = promise.then(() => {
      if (!this.view) {
        console.log("this name",this.name);
        this.view = new View(this.name, this.manifest.width, this.manifest.height);
      }
      return this.view.getDOMElement().then((element: HTMLElement) => {
        console.log("appendChild");
        document.body.appendChild(element);
        return Promise.resolve();
      });
    });
  }

  closeWindow() {

  }

}
