export default class WorkerUtil {
  static isDebug:boolean = true;
  static log(str:string){
    if(WorkerUtil.isDebug){
      console.log(str);
    }
  }
}


export interface WorkerMessage {
  msg:string;
  value?:any;
}
