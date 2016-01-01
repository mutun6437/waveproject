import Effects from '../Effects/Effects';

export default class Debug {
  static createDebugButton(value: string, callback: any) {
    let element = document.createElement('input');
    element.type = 'button';
    element.value = value;
    element.onclick = callback;
    document.getElementById("debug").appendChild(element);
  }

  static lineBreak() {
    let element = document.createElement('br');
    document.getElementById("debug").appendChild(element);
  }

  static createEffectOpen(callback:any) {
    let button = document.createElement("input");
    button.type = "button";
    button.value = "open";
    button.onclick = callback;
    document.getElementById("debug").appendChild(button);
  }

  static createEffectList(){
    let select = document.createElement("select");
    let option = document.createElement("option");
    option.value = "none";
    option.innerHTML = "none";
    select.appendChild(option);

    let effects = Effects.getList();
    for (let i = 0; i < effects.length; i++) {
      let option = document.createElement("option");
      option.value = effects[i].name;
      option.innerHTML = effects[i].name;
      select.appendChild(option);
    }
    document.getElementById("debug").appendChild(select);
  }


}
