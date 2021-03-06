import React, { Component } from "react";
import "./CanadaMap.css";
import Province from "./Province";
import "../../src/styles.css"
import * as d3 from "d3";
const ListofData = ["covid" , "ukrain", "WFH"]

class CanadaMap extends Component {

  /**
   * Constructor getting view box, key of the data, 
   * and initiating the value as null for data 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      viewBox: this.props.viewBox,
      key:"covid",
      value:null
    };

    // Data binding on select and on change
    this.onSelect = this.onSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   *  On ID selection setting a state of selected
   */ 
  onSelect(id) {
    this.setState({ selected: id });
  }

  /**
   * Handle change on data selection using drop down manu
   * @param {Object} e 
   */
  handleChange(e){
    // this.setState({ value: event });
    var data= e.target.value;
    this.setState({key :data});
  }

  /**
   * Randering the Canadian map with provinces
   * @returns {ReactElement}Visual element on Web based UI
   */
  render() {

    // initializing data from props for visualization and state
    const { mapJson, width, height } = this.props;
    const { viewBox, selected,value } = this.state;

    /**
     * Displaying the SVG elements and some web components on UI
     */
    return (
      <>
      <div className="row">
        <div className="col-md-3" style={{textAlign: "left"}}>
          <h2></h2>
          <h2 className="h2" 
            onMouseOver=
            { 
              d3.select('this')
              .attr("fill","")
              .classed("active", true)
            } 
            style={{fontSize:0, fontStyle:"bold"}}
          >{this.state.selected ? this.state.selected : "Canada"}</h2>
          <br /><br />
          <h2 style={{fontSize:60, paddingLeft:10}}>
            <div style={{fontFamily:"-moz-initial"}}> <b>D</b>ata <b>V</b>isualization</div> 
            <div style={{fontFamily:"-moz-initial", fontSize:30}}>on the</div>  

            <div style={{fontFamily:"-moz-initial"}}><b>S</b>entimental <b>A</b>nalysis</div>

            <div style={{fontFamily:"-moz-initial", fontSize:30}}> of</div>

            <div style={{fontFamily:"-moz-initial"}}><b>T</b>weeter <b>D</b>ata</div>
          </h2>
        </div>
        <div className="col-md-4">
          <div>
                <select className="form-control" style={{"background":"aliceblue", fontVariant:"petite-caps"}} value={value} onChange={this.handleChange}>
                    {ListofData.map(option => (
                         <option className="form-control" style={{"background":"aliceblue", fontVariant:"petite-caps"}} value={option}>{option} Data</option>
                    ))}
                </select>
              </div>
        </div>
        <div className="col-md-5" style={{textAlign:"left"}}> 
        {/* Creating SVG for Canadian map by generating each province from json data */}
          <svg width={width} height={height} viewBox={viewBox}>

            {/* itereating json map to get coordinates of each province*/}
            {mapJson.map((province) => (

              // Calling Province Component with the data and coordinates with id
              <Province
                id={province.id}
                d={province.d}
                onSelect={this.onSelect}
                selected={selected}
                key={`province-${province.id}`}
                data = {province.data}
                option = {this.state.key}
              />
            ))}
          </svg>
        </div>
     
      </div>
      </>
    );
  }
}

export default CanadaMap;
