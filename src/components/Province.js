import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Province.css";

class Province extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fill: "#3A5311"
    };
    console.log("In Province",this.props.option);
    this.handleClick = this.handleClick.bind(this);
    this.chRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.selected !== this.props.id) {
      if (this.state.fill === "navy") this.setState({ fill: "red" });
    }
  }

  handleClick(id) {
    console.log(id)
    this.setState({ fill: "green" }); 
    this.props.onSelect(id);
    this.props.history.push({pathname:'/visualization/'+id, state:id+'-'+this.props.option})  
  }

  render() {
    const { fill } = this.state;
    const { id, d } = this.props;

    return (
      <svg>
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
          {/* <div ref={this.chRef}></div>  */}
        </g>
      </svg>
    );
  }
}

export default withRouter (Province);
