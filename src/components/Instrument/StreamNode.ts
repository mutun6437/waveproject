import AudioComponent from '../CoreAudio/AudioComponent';

export default class StreamNode extends AudioComponent {
  stream:MediaStreamAudioSourceNode;

  constructor() {
    super();
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getUserMedia({audio:true}, (stream:MediaStream) => {
      this.stream = this.context.createMediaStreamSource(stream);
      this.stream.connect(this.output);
    },this.connectionErrorHandler);
  }

  connectionErrorHandler(e:Error){
    console.log("[StreamNode]接続エラー",e);
  }

}
