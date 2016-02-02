
export default class Grid {
  width: number;
  height: number;

  svg: d3.Selection<any>;
  grid: d3.scale.Linear<number, number>;
  constructor(ratio: number) {
    this.width = document.getElementById('right').clientWidth; // SVG領域の横幅
    this.height = document.getElementById('right').clientHeight;

    this.svg = d3.select("#grid").append("svg").attr("width", this.width * ratio).attr("height", this.height);
    this.grid = d3.scale.linear()
      .domain([0, this.width]).range([0, this.width * ratio]);
  }

  render(ratio: number) {
    document.getElementById("grid").clientWidth = this.width * ratio;
    document.getElementById("grid").style.height = 0 + "px";

    this.svg.selectAll("g").remove();
    this.svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0, 0)")
      .call(d3.svg.axis()
        .scale(this.grid.range([0, this.width * ratio])).ticks(this.width).innerTickSize(this.height)  // 目盛線の長さ（内側）
        .outerTickSize(0) // 目盛線の長さ（外側）
        .tickPadding(100) // 目盛線とテキストの間の長さ  //スケールを適用する
      );
  }
}
