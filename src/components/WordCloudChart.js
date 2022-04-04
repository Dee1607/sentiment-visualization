import React, { Component } from "react";
import "./CanadaMap.css";
import { withRouter } from "react-router-dom";
import * as d3 from "d3";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { color } from "d3";
const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

class WordCloudChart extends Component {
    
  constructor(props) {
    super(props);
    this.chRef = React.createRef();
  }
    render() {
        var tooltip = d3.select("#theChart")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "0px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("box-shadow", "2px 2px 20px")
        .style("opacity", "0.9")
        .attr("id", "tooltip");

        function handleMouseOver (event, d) {
          d3.select('path').attr("fill", "orange");
          tooltip.style("visibility", "visible");
        };

        return (
          <>
            <WordCloud
                data={data}
                width={500}
                height={400}
                font="Times"
                fontStyle="italic"
                fontWeight="bold"
                fontSize={(word) => word.value * 5}
                spiral="rectangular"
                rotate={(word) => word.value % 360}
                padding={5}
                random={Math.random}
                fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
                onWordClick={(event, d) => {
                console.log(`onWordClick: ${d.text}`);
                }}
                onWordMouseOver={(event, d) => {
                  handleMouseOver()
                  // event = (d, i) => schemeCategory10ScaleOrdinal(i)
                console.log(`onWordMouseOver: ${d.text}`);
                }}
                onWordMouseOut={(event, d) => {
                console.log(`onWordMouseOut: ${d.text}`);
                }}
            />        
        </>
        );
    }
}
export default withRouter(WordCloudChart);