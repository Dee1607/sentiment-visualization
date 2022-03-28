import React, { Component, useState, useEffect } from "react";
import "./CanadaMap.css";
import Province from "./Province";
import { withRouter } from "react-router-dom";
import DonutJSON from "./PieChartData.json";
import PieClass from "./PieClass";
import * as d3 from "d3";
import {scaleLinear} from "d3-scale";
import WordCloud from "./WordCloudChart";
import TimeSeriesChart from "./TimeSeriesChart";

const colors = [ 'red' , 'blue', 'green']

class PieChart extends Component {
    
  constructor(props) {
    super(props);
    this.chRef = React.createRef();
  }

componentDidMount(){
    this.drawChart()
}

drawChart(){
    // Create dummy data

    const data = DonutJSON;
    let usableData = []
    for(let i=0; i<=15; i++){
        if(data[i]){
            if(data[i].location === this.props.location.state){

            usableData.push(data[i]);
            }
        }
    }
     console.log(usableData);
    // set the dimensions and margins of the graph
    var width = 450, height = 450, margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
const svg = d3.select(this.chRef.current)
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

// Create dummy data
// const data = {a: 9, b: 20, c:30, d:8, e:12}

// set the color scale
const color = ["#98abc5", "#8a89a6", "#7b6888"]
// Compute the position of each group on the pie:
const pie = d3.pie()
  .value(d => d.Percentage )  
const data_ready = pie(usableData)
console.log(data_ready)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .join('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', (d) =>  colors[d.index])
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

}

render() {
    return (
      <>
        <h1>{this.props.location.state}</h1>
        <div className="row">
            <div className="col-md-4">
                <div ref={this.chRef}></div>
            </div>
            <div className="col-md-4">
            <WordCloud />
            </div>
            <div className="col-md-4">
            <TimeSeriesChart />
            </div>     
        </div>
        {/* <script src="https://d3js.org/d3.v6.js"></script>
        <script src="/Users/deeppatel/Desktop/Visualization/Project/csci6406_project/node_modules/d3/dist/d3.js"></script>
        <script src="/Users/deeppatel/Desktop/Visualization/Project/csci6406_project/node_modules/d3moji/d3moji.js"></script> */}
      </>
    );
  }
}

export default withRouter(PieChart);
