export default class Utils {
  /**
   *  認知の数値が有効かどうか
   */
  static isValid(value: number): boolean {
    return !value || isNaN(value);
  }
  /**
   *  任意の値を任意の値幅にマッピングします
   *  value:変換したい値 sx:変換前最小値 sn:変換前最大値  dx:変換後最小値 dn;変換後最大値
   */
  static map(value: number, sx: number, sn: number, dx: number, dn: number): number {
    return (value - sn) * (dx - dn) / (sx - sn) + dn;
  }
}
