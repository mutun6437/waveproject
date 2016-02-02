// declare interface FFT {
//   forward:any;
// }
declare var FFT: {
  new (bufferSize:number,sampleRate:number):any;
  forward(buffer:any):any;
  inverse(num1:number,num2:number):any;
}
