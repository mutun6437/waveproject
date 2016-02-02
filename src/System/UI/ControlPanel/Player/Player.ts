import Sequencer from '../../../../components/Sequencer/Sequencer';

export default class Player {
  sequencer:Sequencer = null;

  constructor(sequencer:Sequencer){
    this.sequencer = sequencer;

    this.setDomEvent();
  }


  setDomEvent(){
    $("#play").click(()=>{
      if(!this.sequencer.isPlaying){
        $("#play").val("停止");
      }else{
        $("#play").val("再生");
      }
      this.sequencer.start();
    });

    $("#tempo").change((e:JQueryEventObject)=>{
      let target:any = e.target;
      this.sequencer.setTempo(target.value);
    });
  }
}
