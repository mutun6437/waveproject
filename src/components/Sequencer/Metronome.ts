import AudioContextWrapper from '../CoreAudio/AudioContextWrapper';

export default class Metronome {
  private tempo: number;
  private nextNoteTime: number = 0;
  private current16thNote: number;
  private notesInQueue: Note[] = [];
  private noteLength: number = 0.05;
  noteResolution = 2;// 0 == 16th, 1 == 8th, 2 == quarter note
  constructor(tempo: number) {
    this.tempo = tempo;
    window.onmessage = (e) => {
      if (e.data == "tick") {
        console.log("tick!");
        this.tick();
      } else {
        console.log("message: " + e.data);
      }
    };
  }

  private tick() {
    while (this.nextNoteTime < AudioContextWrapper.getContext().currentTime + 25) {//100をAudioSchedularと合わせる
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
      this.nextNote();
    }
  }

  private scheduleNote(beatNumber: number, time: number) {
    if ((this.noteResolution == 1) && (beatNumber % 2))
      return; // we're not playing non-8th 16th notes
    if ((this.noteResolution == 2) && (beatNumber % 4))
      return; // we're not playing non-quarter 8th notes

    // create an oscillator
    let osc = AudioContextWrapper.getContext().createOscillator();
    osc.connect(AudioContextWrapper.getContext().destination);
    if (beatNumber % 16 === 0)    // beat 0 == low pitch
      osc.frequency.value = 880.0;
    else if (beatNumber % 4 === 0)    // quarter notes = medium pitch
      osc.frequency.value = 440.0;
    else                        // other 16th notes = high pitch
      osc.frequency.value = 220.0;

    this.notesInQueue.push({ note: beatNumber, time: time, osc: osc });

    osc.start(time);
    osc.stop(time + this.noteLength);
  }

  nextNote() {
    let secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    this.current16thNote++;    // Advance the beat number, wrap to zero
    if (this.current16thNote == 16) {
      this.current16thNote = 0;
    }
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
    this.notesInQueue.forEach((note)=>{
      note.osc.stop();
    });
    this.nextNoteTime = 0;
  }

  start() {
    this.current16thNote = 0;
    this.nextNoteTime = AudioContextWrapper.getContext().currentTime;
  }

  stop() {
    console.log("メトロノームを停止します");
    this.notesInQueue.forEach((note:Note)=>{
      note.osc.stop();
    });
  }
}


interface Note {
  note: number;
  time: number;
  osc: OscillatorNode;
}
