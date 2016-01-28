import XHRFileReader from '../File/XHRFileReader';

abstract class View {
  name: string;
  isOpen: boolean = false;
  manifest: Manifest = null;
  window: HTMLElement = null;
  document: HTMLElement;
  closeButton: HTMLButtonElement;

  constructor() {
  }

  abstract setDomEvent(element:HTMLElement):void;

  createWindow(path: string, width: number, height: number) {
    this.window = document.createElement('div');
    this.window.className = "View-Window"
    this.window.style.width = width + 20 + "px";
    this.window.style.height = height + 30 + "px";
    $(this.window).draggable({}).css("position", "absolute");

    let closeButton = document.createElement("input");
    closeButton.type = "button";
    closeButton.className = "jquery-ui-button View-Window-CloseButton";
    closeButton.value = "×";
    closeButton.onclick = (ev: MouseEvent) => {
      this.closeWindow();
    };

    this.window.appendChild(closeButton);

    this.document = document.createElement("div");
    this.document.className = "View-Document";
    this.document.style.width = width + "px";
    this.document.style.height = height + "px";

    this.window.appendChild(this.document);
  }


  getDOMElement(): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      if (this.window) {
        return resolve(this.window);
      } else {
        this.createWindow(this.name, this.manifest.width, this.manifest.height);
        new XHRFileReader(this.name + "/index.html").readAsText()
          .then((text: string) => {
            // console.log("HTML", text);
            let html = $.parseHTML(text,document,true);
            console.log(html);
            $(this.document).append(html);
            resolve(this.window);
          }, () => {
            console.log("HTMLが取得できないときのダミーデータを用意する？");
          });
      }
    });
  };

  openWindow(): Promise<{}> {
    if (this.isOpen) { return; }

    let promise = Promise.resolve();
    if (!this.manifest) {
      promise = promise.then(() => {
        return this.loadManifest();
      }).catch(() => {
        //TODO　Manifestがロードできなかったとき
        return Promise.resolve();
      });
    }
    return promise = promise.then(() => {
      return this.getDOMElement().then((element: HTMLElement) => {
        this.isOpen = true;
        this.setDomEvent(element);
        document.body.appendChild(element);
        return Promise.resolve();
      });
    });
  }

  closeWindow(): Promise<{}> {
    if (!this.isOpen) { return; }
    return this.getDOMElement().then((element: HTMLElement) => {
      this.isOpen = false;
      document.body.removeChild(element);
      return Promise.resolve();
    });
  }

  private loadManifest(): Promise<{}> {
    return new Promise((resolve, reject) => {
      new XHRFileReader<Manifest>(this.name + "/manifest.json").readAsJSON()
        .then((manifest: Manifest) => {
          this.manifest = manifest;
          resolve();
        }, () => {
          console.log("マニフェストが存在しないときはどうするか検討しましょう");
          reject();
        });
    });
  }

}

export default View;
