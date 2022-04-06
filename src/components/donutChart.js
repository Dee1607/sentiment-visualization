import React , { Component} from 'react';
import * as d3 from 'd3';
import d3moji from 'd3moji'
const colors = [ '#8ce8ad', '#57e188', '#34c768', '#2db757', '#27acaa', '#42c9c2', '#60e6e1', '#93f0e6', '#87d3f2', '#4ebeeb', '#35a4e8', '#188ce5', '#542ea5', '#724bc3', '#9c82d4', '#c981b2', '#b14891', '#ff6d00', '#ff810a', '#ff9831', '#ffb46a', '#ff9a91', '#ff736a', '#f95d54', '#ff4136', '#c4c4cd' ];
 
class DonutChart extends Component {

    constructor(props) {
        super(props);
        this.chRef = React.createRef();
    }
 
    // Chart load after component Mount
    componentDidMount() {
        this.drawChart()
    }
 
    // DrawChart
    drawChart(){
        // Create dummy data

        const {dataset} = this.props.data;

        

    var width = 1000,
    height = 590,
    radius = 200;

      // Usually you have a color scale in your chart already
var color = d3.scaleOrdinal()
.domain(this.props.data)
.range(d3.schemeSet2);

    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(100);
    
    var pie = d3.pie()
      .sort(null)
      .value(function(d) {
          console.log("Percentage",d.percentage);
          return d.percentage;
      });

    var svg = d3.select(this.chRef.current).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    
    var g = svg.selectAll(".arc")
      .data(pie(this.props.data))
      .enter().append("g").attr("d", arc);  

      svg.selectAll('path')
            .data(pie(this.props.data))
            .enter()
            .append('path')
            .attr('d', arc)
            .style("fill", function(d){ return color(d)})
        

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(pie(this.props.data));

    g.append("text")
      .attr("transform", function(d) {
        var _d = arc.centroid(d);
        _d[0] *= 1.5; //multiply by a constant factor
        _d[1] *= 1.5; //multiply by a constant factor
        return "translate(" + _d + ")" + "rotate(40)"}
      )
      
      .attr("dy", ".50em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return Math.round(d.data.percentage) + '%';
      });

     
    
  // Usually you have a color scale in your chart already
var color = d3.scaleOrdinal()
.domain(this.props.data)
.range(d3.schemeSet2);

    svg.selectAll("mydots")
      .data(this.props.data)
      .enter()
      .append("circle")
        .attr("cx", 240)
        .attr("cy", function(d,i){ return i*20}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return color(d)})
      
      svg.selectAll("mylabels")
        .data(this.props.data)
        .enter()  
        .append("text")
        .attr("x", 250)
        .attr("y", function(d,i){ return i*20}) // 100 is where the first dot appears. 25 is the distance between dots
        .style('fill',  function(d) {return colors[d]} )
        .text(function(d){ console.log("Here",d.percentage); return d.province})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
       
        
 

        // var dataset = [
        //     { label: 'Abulia', count: 10 }, 
        //     { label: 'Betelgeuse', count: 20 },
        //     { label: 'Cantaloupe', count: 30 },
        //     { label: 'Dijkstra', count: 40 }
        //   ];
        // console.log("Here",this.props.data);

        // console.log("Here",dataset);
        //   var width = 360;
        //   var height = 360;
        //   var radius = Math.min(width, height) / 2;
        //   var donutWidth = 75;                            // NEW
  
        //  // var color = d3.scaleOrdinal(d3.schemeCategory20b);
  
        //   var svg = d3.select(this.chRef.current)
        //     .append('svg')
        //     .attr('width', width)
        //     .attr('height', height)
        //     .append('g')
        //     .attr('transform', 'translate(' + (width / 2) + 
        //       ',' + (height / 2) + ')');
  
        //   var arc = d3.arc()
        //     .innerRadius(radius - donutWidth)             // NEW
        //     .outerRadius(radius);
            
        //   var pie = d3.pie()
        //     .value(function(d) { return d.percentage; })
        //     .sort(null);
  
        //   var path = svg.selectAll('path')
        //     .data(pie(this.props.data))
        //     .enter()
        //     .append('path')
        //     .attr('d', arc)
        //     .attr('fill',  (d) =>  colors[d.index] )
        
        // svg.append("text")
        //     .attr("transform", function(d) {
        //     var _d = arc.centroid(d);
        //     _d[0] *= 1.5;  //multiply by a constant factor
        //     _d[1] *= 1.5;  //multiply by a constant factor
        //     return "translate(" + _d + ")";
        //   })
        //   .attr("dy", ".50em")
        //   .style("text-anchor", "middle")
        //   .text(function(d) {
        //     if(d.data.percentage < 8) {
        //       return '';
        //     }
        //     return d.data.percentage + '%';
        //   });
            
        // svg.append("text")
        //    .attr("text-anchor", "middle")
        //      .attr('font-size', '4em')
        //      .attr('y', 20)
        //    .text(totalCount);
  
    //     const {data} = this.props;

    //         // set the dimensions and margins of the graph
    //     const width = 500,
    //     height = 450,
    //     margin = 90;

    // // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    // const radius = Math.min(width, height) / 2 - margin

    // // append the svg object to the div called 'my_dataviz'
    // const svg = d3.select(this.chRef.current)
    // .append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    // .append("g")
    //     .attr("transform", `translate(${width/2},${height/2})`);

    // // set the color scale
    // const color = d3.scaleOrdinal()
    // .domain(["Alberta", "BritishColumbia", "Manitoba", "NewBrunswick", "Labrador", "NovaScotia", "Ontario", "PEI", "Quebec", "Saskatchewan"])
    // .range(d3.schemeDark2);

    // // Compute the position of each group on the pie:
    // const pie = d3.pie()
    // .sort(null) // Do not sort group by size
    // .value(d => d[1])
    // const data_ready = pie(Object.entries(data))

    // // The arc generator
    // const arc = d3.arc()
    // .innerRadius(radius * 0.5)         // This is the size of the donut hole
    // .outerRadius(radius * 0.8)

    // // Another arc that won't be drawn. Just for labels positioning
    // const outerArc = d3.arc()
    // .innerRadius(radius * 0.9)
    // .outerRadius(radius * 0.9)

    // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    // svg
    // .selectAll('allSlices')
    // .data(data_ready)
    // .join('path')
    // .attr('d', arc)
    // .attr('fill', d => color(d.data[1]))
    // .attr("stroke", "white")
    // .style("stroke-width", "2px")
    // .style("opacity", 0.7)

    // // Add the polylines between chart and labels:
    // svg
    // .selectAll('allPolylines')
    // .data(data_ready)
    // .join('polyline')
    //     .attr("stroke", "black")
    //     .style("fill", "none")
    //     .attr("stroke-width", 1)
    //     .attr('points', function(d) {
    //     const posA = arc.centroid(d) // line insertion in the slice
    //     const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
    //     const posC = outerArc.centroid(d); // Label position = almost the same as posB
    //     const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
    //     posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
    //     return [posA, posB, posC]
    //     })

    // // Add the polylines between chart and labels:
    // svg
    // .selectAll('allLabels')
    // .data(data_ready)
    // .join('text')
    //     .text(d => d.data[0])
    //     .attr('transform', function(d) {
    //         const pos = outerArc.centroid(d);
    //         const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    //         pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
    //         return `translate(${pos})`;
    //     })
    //     .style('text-anchor', function(d) {
    //         const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    //         return (midangle < Math.PI ? 'start' : 'end')
    //     })
    //     // console.log(data)

    //     const svgContainer = d3.select(this.chRef.current).node();
    //     const width  = svgContainer.getBoundingClientRect().width;
    //     const height = width;
    //     const margin = 15;
    //     let radius = Math.min(width, height) / 2  - margin;
    //     // legend Position
    //     let legendPosition = d3.arc().innerRadius(radius/1.75).outerRadius(radius);

    //     // Create SVG
    //     const svg  = d3.select(this.chRef.current)
    //     .append('svg')
    //     .attr("width", '30%')
    //     .attr("height", '30%')
    //         .attr('viewBox', '0 0 ' + width + ' ' + width )
    //     //.attr('preserveAspectRatio','xMinYMin')
    //     .append("g")
    //     .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");
 
    //     let pie = d3.pie()
    //         .value( d => d.percentage )
    //     let data_ready = pie(data)
    //     console.log(data)
    //     // Donut partition  
    //     svg
    //     .selectAll('whatever')
    //     .data(data_ready)
    //     .enter()
    //     .append('path')
    //     .attr('d', d3.arc()
    //         .innerRadius(radius/ 1.75)  // This is the size of the donut hole
    //         .outerRadius(radius)
    //     )
    //     .attr('fill',  (d) =>  colors[d.index] )
    //     .attr("stroke", "#fff")
    //     .style("stroke-width", "2")
    //     .style("opacity", "0.8")
 
 
    //   // Legend group and legend name
    //    svg
    //     .selectAll('mySlices')
    //     .data(data_ready)
    //     .enter()
    //     .append('g')
    //     .attr("transform", d => `translate(${legendPosition.centroid(d)})`)
    //     .attr("class", 'legend-g')
    //     .style("user-select", "none")
    //     .append('text')
    //     .text(d =>  d.data.province)
    //     .style("text-anchor", "middle")
    //     .style("font-weight", 700)
    //     .style("fill", '#222')
    //     .style("font-size", 14);
 
    //    //Label for value
    //     svg
    //     .selectAll('.legend-g')
    //     .append('text')
    //     .text((d)=>{ return  d.data.percentage})
    //     .style("fill", '#444')
    //     .style("font-size", 12)
    //     .style("text-anchor", "middle")
    //     .attr("y", 16 );

    //     var path = svg.selectAll('path')
    //     .data(pie(data))
    //     .enter()
    //     .append('path')
    //     .attr('d', d3.arc())
    //     .attr('fill', function (d, i) {
    //         return colors;
    //     })
    //     .attr('transform', 'translate(0, 0)')
    //     //Our new hover effects
    //     .on('mouseover', function (d, i) {
    //         d3.select(this).transition()
    //             .duration('50')
    //             .attr('opacity', '.85')})
    //     .on('mouseout', function (d, i) {
    //         d3.select(this).transition()
    //             .duration('50')
    //             .attr('opacity', '1')
    //     });

        // // set the dimensions and margins of the graph
        // var width = 450, height = 450, margin = 40

        // // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        // var radius = Math.min(width, height) / 2 - margin

        // // append the svg object to the div called 'my_dataviz'
        // var svg = d3.select(this.chRef.current)
        // .append("svg")
        // .attr("width", width)
        // .attr("height", height)
        // .append("g")
        // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        // // set the color scale
        // var color = d3.scaleOrdinal()
        // .domain(data)
        // .range(['#8ce8ad', '#57e188', '#34c768', '#2db757', '#27acaa', '#42c9c2', '#60e6e1', '#93f0e6', '#87d3f2', '#4ebeeb', '#35a4e8', '#188ce5', '#542ea5', '#724bc3', '#9c82d4', '#c981b2', '#b14891', '#ff6d00', '#ff810a', '#ff9831', '#ffb46a', '#ff9a91', '#ff736a', '#f95d54', '#ff4136', '#c4c4cd' ])

        // // Compute the position of each group on the pie:
        // var pie = d3.pie()
        // .value(function(d) { return d.percentage; })
        // var data_ready = pie(data)
        // // console.log(data_ready)
        // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        // svg
        // .selectAll('whatever')
        // .data(data_ready)
        // .enter()
        // .append('path')
        // .attr('d', d3.arc()
        // .innerRadius(100)         // This is the size of the donut hole
        // .outerRadius(radius)
        // )
        // .attr('fill', function(d){ return(color(d.data.province)) })
        // .attr("stroke", "black")
        // .style("stroke-width", "2px")
        // .style("opacity", 0.7)
    } 
 
    render() {
        return <>
            <div ref={this.chRef}></div> 
        </>
    }
}
 
export default DonutChart;