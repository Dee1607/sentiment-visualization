import React, { Component } from "react";
import "./CanadaMap.css";
import Province from "./Province";

class CanadaMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBox: this.props.viewBox,
      selected: null
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(id) {
    this.setState({ selected: id });
  }

  render() {
    const { mapJson, width, height } = this.props;
    const { viewBox, selected } = this.state;

    return (
      <>
        <h1>{this.state.selected ? this.state.selected : "Canada"}</h1>
        <svg width={width} height={height} viewBox={viewBox}>
          {mapJson.map((province) => (
            <Province
              id={province.id}
              d={province.d}
              onSelect={this.onSelect}
              selected={selected}
              key={`province-${province.id}`}
            />
          ))}
        </svg>
      </>
    );
  }
}

export default CanadaMap;
