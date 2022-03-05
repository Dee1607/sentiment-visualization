import React, { Component } from "react";
import "./Province.css";

class Province extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fill: "#FFCCCC"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.selected !== this.props.id) {
      if (this.state.fill === "navy") this.setState({ fill: "red" });
    }
  }

  handleClick(id) {
    this.setState({ fill: "green" });
    this.props.onSelect(id);
  }

  render() {
    const { fill } = this.state;
    const { id, d } = this.props;

    return (
      <g key={`g-${id}`}>
        <path
          key={`path-${id}`}
          d={d}
          className={`province province__${id}`}
          fill={fill}
          stroke="#838383"
          strokeWidth={1.5}
          onClick={() => this.handleClick(id)}
        />
      </g>
    );
  }
}

export default Province;
