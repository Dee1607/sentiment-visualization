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
        const {data} = this.props;
        // console.log(data)

        const svgContainer = d3.select(this.chRef.current).node();
        const width  = svgContainer.getBoundingClientRect().width;
        const height = width;
        const margin = 15;
        let radius = Math.min(width, height) / 2  - margin;
        // legend Position
        let legendPosition = d3.arc().innerRadius(radius/1.75).outerRadius(radius);

        // Create SVG
        const svg  = d3.select(this.chRef.current)
        .append('svg')
        .attr("width", '30%')
        .attr("height", '30%')
            .attr('viewBox', '0 0 ' + width + ' ' + width )
        //.attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");
 
        let pie = d3.pie()
            .value( d => d.percentage )
        let data_ready = pie(data)
        console.log(data)
        // Donut partition  
        svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(radius/ 1.75)  // This is the size of the donut hole
            .outerRadius(radius)
        )
        .attr('fill',  (d) =>  colors[d.index] )
        .attr("stroke", "#fff")
        .style("stroke-width", "2")
        .style("opacity", "0.8")
 
 
      // Legend group and legend name
       svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('g')
        .attr("transform", d => `translate(${legendPosition.centroid(d)})`)
        .attr("class", 'legend-g')
        .style("user-select", "none")
        .append('text')
        .text(d =>  d.data.province)
        .style("text-anchor", "middle")
        .style("font-weight", 700)
        .style("fill", '#222')
        .style("font-size", 14);
 
       //Label for value
        svg
        .selectAll('.legend-g')
        .append('text')
        .text((d)=>{ return  d.data.percentage})
        .style("fill", '#444')
        .style("font-size", 12)
        .style("text-anchor", "middle")
        .attr("y", 16 );

        var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', d3.arc())
        .attr('fill', function (d, i) {
            return colors;
        })
        .attr('transform', 'translate(0, 0)')
        //Our new hover effects
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85')})
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1')
        });

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
            <script src="/Users/deeppatel/Desktop/Visualization/Project/csci6406_project/node_modules/d3/dist/d3.js"></script>
            <script src="/Users/deeppatel/Desktop/Visualization/Project/csci6406_project/node_modules/d3moji/d3moji.js"></script>
            
        </>
    }
}
 
export default DonutChart;
