import NumberUtils from '../../../Utils/NumberUtils';

export default class Scaler {
  svg: d3.Selection<any>;
  scale: d3.scale.Linear<number, number>;
  width: number;
  height: number;

  constructor(ratio: number) {
    this.width = document.getElementById('right').clientWidth; // SVG領域の横幅
    this.height = 18;

    this.svg = d3.select("#scaler").append("svg").attr("width", this.width * ratio).attr("height", this.height);
    //document.getElementById('right').style.width = this.width * ratio + "px";
    this.scale = d3.scale.linear()
      .domain([0, this.width]).range([0, this.width * ratio]);
  }


  render(ratio: number) {
    this.svg.selectAll("g").remove();
    this.svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0, 0)")
      .call(d3.svg.axis()
        .scale(this.scale.range([0, this.width * ratio])).ticks(this.width)  //スケールを適用する
      );
  }
}
