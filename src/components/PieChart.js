import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as d3 from "d3";
const colors = [ 'red' , 'blue', 'green']
 
/**
 * Pie chart Class to generate pie chart visualization
 */
class PieChart extends Component {
   
  /**
   * Construnctor to initialize the class wih all the pre defined data 
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.chRef = React.createRef();
  }
 
componentDidMount(){
    this.drawChart() 
}
 
drawChart(){
   
    const usableData = this.props.data;

    // set the dimensions and margins of the graph
    var width = 550, height = 550, margin = 40
 
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;
    
    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select(this.chRef.current)
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`);

 
    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(d => d.Percentage )  
    const data_ready = pie(usableData)
 
    // Creating a tooltip that can be used in svg  component body
    var tooltip = d3.select("body")
        .data(data_ready)
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background-color", "silver")
        .text((d) => d.data.Percentage*100 + "% "+ d.data.type);
    
    // Generating an svg for Pie chart wihh datas
    svg
      .selectAll()
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
      .on("mouseover", function(d){
              d3.select(this).attr('d',function(d){ return d3.arc().innerRadius(0)
              .outerRadius(180)(d)});
              tooltip.style("visibility", "visible")
              console.log(this.chRef);
              tooltip.text((d) => d.data.Percentage*100 + "% ")
              tooltip.style("visibility", "visible")})
      .on("mousemove", function(event){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
      .on("mouseout", function(){
        d3.select(this).attr('d',function(d){return d3.arc().innerRadius(0).outerRadius(radius)(d)});
                        tooltip.style("visibility", "hidden");
      })
      .call(d3.zoom().on("zoom", function (event) {
        svg.attr("transform", event.transform)
    }))
    
    // shape helper to build arcs:
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
    
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return Math.round(d.data.Percentage*100)+ "% "+ d.data.type})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 17)
  }
 
render() {
    return (
      <>
        <div className="row">
                <h1 style={{fontFamily:"-moz-initial"}}>Sentiments based on Province</h1>
                <div ref={this.chRef}></div>
        </div>
        <script src="https://d3js.org/d3.v6.js"></script>
        <script src="/Users/deeppatel/Desktop/Visualization/Project/csci6406_project/node_modules/d3/dist/d3.js"></script>
        <script src="/Users/deeppatel/Desktop/Visualization/Project/csci6406_project/node_modules/d3moji/d3moji.js"></script>
      </>
    );
  }
}
 
export default withRouter(PieChart);