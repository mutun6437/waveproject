export default class Utils {
  static isValid(value:number){
    return !value || isNaN(value);
  }
}
