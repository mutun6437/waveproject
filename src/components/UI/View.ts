import XHRFileReader from '../File/XHRFileReader';

export default class View {
  path: string;
  window: HTMLElement;
  html: any = null;
  document:HTMLElement;
  constructor(path: string, width: number, height: number) {
    this.path = path;
    this.window = document.createElement('div');
    this.window.className = "View Window"
    this.window.clientWidth = width;
    this.window.clientHeight = height;

    this.document = document.createElement("div");
    this.document.className = "View Document"

    this.window.appendChild(this.document);
  }

  getDOMElement(): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      if (this.html) {
        return resolve(this.window);
      } else {
        new XHRFileReader(this.path + "/index.html").readAsText()
        .then((text:string) => {
          console.log("HTML",text);
          this.html = $.parseHTML(text);
          $(this.document).append(this.html);
          resolve(this.window);
        }, () => {
          console.log("HTMLが取得できないときのダミーデータを用意する？");
        });
      }
    });
  };
}
