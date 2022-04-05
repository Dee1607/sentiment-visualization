import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/**
 * Province Class to generate the SVG for the province
 */
class Province extends Component {

  /**
   * Construnctor to getting the props and binding the data on click with the Refereces for SVG
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      fill: "#3A5311"
    };

    this.handleClick = this.handleClick.bind(this);
    this.chRef = React.createRef();
  }

  /**
   * on update events to change color of the data
   */
  componentDidUpdate() {
    if (this.props.selected !== this.props.id) {
      if (this.state.fill === "navy") this.setState({ fill: "red" });
    }
  }

  /**
   * Handaling on Click event with click on the province of specific id
   * @param {*} id 
   */
  handleClick(id) {
    this.setState({ fill: "green" }); 
    this.props.onSelect(id);
    this.props.history.push({pathname:'/visualization/'+id, state:id+'-'+this.props.option})  
  }

  /**
   * Rendering the Visualization of each province 
   * @returns Visual element of province
   */
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
        </g>
      </svg>
    );
  }
}

export default withRouter (Province);
