

declare module "web-audio-scheduler" {
  export interface WebAudioScheduler {
    context: AudioContext;
    interval: number;
    aheadTime: number;
    timerAPI: any;
    playbackTime: number;
    currentTime: number;
    state: string;
    events: any[];

    constructor(arg?: WebAudioSchedulerHandler):any;
    insert(time: number, callback: (e: any) => void, options?: WebAudioSchedulerOptions): number;
    start(callback: (e: any) => void):any;
    stop(isReset: boolean):any;
    nextTick(time: number, callback: () => void, args?: any): number;
    remove(schedId: number): number;
    removeAll(): void;
  }
}



interface WebAudioSchedulerHandler {
  context: AudioContext;
  interval?: number;
  aheadTime?: number;
  timerAPI?: any;
}
interface WebAudioSchedulerOptions {
  frequency: number;
  duration: number;
}
