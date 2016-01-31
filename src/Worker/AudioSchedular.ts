import WorkerUtil from './WorkerUtil';
import Enviroment from '../System/Enviroment/Enviroment';

export default class AudioSchedular {
  interval: number = 25;
  timerID: NodeJS.Timer;

  constructor() { }

  startTimer() {
    WorkerUtil.log("[Worker]StartTimer");
    this.timerID = setInterval(() => {
      this.tick();
    }, this.interval);
  }

  stopTimer() {
    WorkerUtil.log("[Worker]StopTimer");
    clearInterval(this.timerID);
    this.timerID = null;
  }

  setInterval(interval: number) {
    this.interval = interval;
    if (this.timerID) {
      clearInterval(this.interval);
      this.timerID = setInterval(()=>{
        this.tick();
      },this.interval);
    }
  }

  private tick() {
    //WorkerUtil.log("[Worker]Tick");
    window.postMessage("tick", "http://"+document.domain+":3000/");
  }

}
