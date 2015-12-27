export default class Debug {
 static createDebugButton(value: string, callback: any) {
  let element = document.createElement('input');
  element.type = 'button';
  element.value = value;
  element.onclick = callback;
  document.getElementById("debug").appendChild(element);
 }

 createDebugFile(value: string, callback: any) {
  let element = document.createElement('input');
  element.type = 'file';
  element.value = "";
  element.onchange = callback;
  document.getElementById("debug").appendChild(element);
 }

 static lineBreak() {
  let element = document.createElement('br');
  document.getElementById("debug").appendChild(element);
 }
}
