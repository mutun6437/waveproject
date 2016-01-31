
//TODO WebWorker以降時に変更する
export default class AudioSchedular  {
  interval: number = 100;
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
    WorkerUtil.log("[Worker]Tick");
    postMessage("tick", "http://"+document.domain+":3000");
  }

}


class WorkerUtil {
  static isDebug:boolean = true;
  static log(str:string){
    if(WorkerUtil.isDebug){
      console.log(str);
    }
  }
}


interface WorkerMessage {
  msg:string;
  value?:any;
}


let worker:AudioSchedular  = new AudioSchedular();
let isDebug = true;//デバッグモードの時はログを出力する


window.addEventListener("onMessage", (e: MessageEvent) => {
  WorkerUtil.log("[Worker]onMessage");
  let data: WorkerMessage = e.data;

  switch (data.msg) {
    case "onStart":
      worker.startTimer();
      break;
    case "onStop":
      worker.stopTimer();
      break;
    case "setInterval":
      worker.setInterval(data.value);
      break;
    default:
      break;
  }
});
