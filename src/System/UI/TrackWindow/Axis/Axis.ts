import NumberUtils from '../../../Utils/NumberUtils';
import Scaler from './Scaler';
import Grid from './Grid';

export default class Axis {
  ratio: number = 100;
  scaler: Scaler;
  grid: Grid;
  minRatio: number = 10;
  maxRatio: number = 500;

  constructor() {
    this.scaler = new Scaler(this.ratio);
    this.grid = new Grid(this.ratio);

    //描画しておく
    this.render();
    //Keyイベントを設定
    this.setDomEvent();
  }

  setDomEvent() {
    $(document).keydown((e: JQueryKeyEventObject) => {
      let value = this.ratio < 30 ? 1 : 5;
      Promise.resolve().then(() => {
        switch (e.which) {
          case 71:
            this.ratio -= (this.ratio <= this.minRatio ? 0 : value);
            return Promise.resolve();
          case 72:
            this.ratio += (this.ratio >= this.maxRatio ? 0 : value);
            return Promise.resolve();
        }
      }).then(() => {
        this.render();
      });
    });
  }

  render() {
    this.scaler.render(this.ratio);
    this.grid.render(this.ratio);
  }
}
