import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { enrichTopics } from '../utils/dataprocessor';
import d3Cloud from 'd3-cloud';
 
/** 
 * Creating a class component to render the cloud using D3. 
 */
export default class Cloud extends Component {

  /**
   * Constrinctor to set data into props and 
   * setting up the initial state at the entry
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      cloudDimensions: [],
      isProcessing: true,
    };
  }

  /**
   * Process data. Add range of volumes and fontSizes
   * @returns {SVGElement} Cloud component using D3 with react and svg elements
   */
  componentDidMount() {
    if (this.props.topics.length === 0) {
      return;
    }
    const {
      fontName,
      fontSizes,
      height,
      topics,
      width,
    } = this.props;
 
    // Cloud generated using d3 cloud functionality of react and d3
    d3Cloud()
      .size([width, height])
      .words(enrichTopics(topics, fontSizes).entities)
      .padding(10)
      .font(fontName)
      .text((d) => d.label)
      .fontSize((d) => d.fontSize)
      .random(() => 0.5)
      .rotate(() => 0)
      .on('end', (cloudDimensions) => { this.setState({ cloudDimensions, isProcessing: false }); })
      .start();
  }

  /**
   * Implmenting the visualization of CLoud combinig with D3
   * @returns {ReactElement} Visualization of Cloud 
   */
  render() {

    // initializing the needed data from the props.
    const {
      fontName,
      height,
      onSelectTopic,
      selectedTopic,
      topics,
      width,
    } = this.props;

    /**
     *  Selecting if the data is in processing state
     */
    if (this.state.isProcessing) {
      return (
        <div className="wordcloud__container_cloud">
          <span >Loading...</span>
        </div>
      );
    }

    /**
     * Generating a class to display the cloud components
     * @param {*} item as an lable or text to be displayed on the Cloud
     * @returns a foroper CSS formate that can be applied on each word of the cloud
     */
    const getClassNames = (item) => {
      let classNames = 'wordcloud__cloud_label';

      if (item.sentimentScore > 0) {
        classNames += ' wordcloud__cloud_label--color-green';
      } else if (item.sentimentScore < 0) {
        classNames += ' wordcloud__cloud_label--color-red';
      } else {
        classNames += ' wordcloud__cloud_label--color-grey';
      }

      /**
       *  Selecting a specific formate for the data inside cloud based on the sentiment
       */ 
      if (
        selectedTopic !== null
        && selectedTopic.hasOwnProperty('id')
        && selectedTopic.id === item.id
      ) {
        classNames += ' wordcloud__cloud_label--is-active';
      }
      return classNames;
    };

    return (
      <div className="wordcloud__container_cloud">
        <div className="wordcloud__cloud">

          {/* Creating an SVG element to generate the word cloud */}
          <svg width={width} height={height}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>

              {/* Iterating theough the cloud Dimentions to display proper data */}
              {this.state.cloudDimensions.map(item =>
                <text
                  className={getClassNames(item)}
                  key={item.id}
                  onClick={() => onSelectTopic(item)}
                  style={{
                    fontSize: item.size,
                    fontFamily: fontName,
                  }}
                  textAnchor="middle"
                  transform={`translate(${item.x} , ${item.y} )`}
                >{item.text}</text>
              )}
            </g>
          </svg>
        </div>
        {/* {topics.length > this.state.cloudDimensions.length ? <p className="worcloud__hint">Some topics cannot be displayed, because of the available space.</p> : ''} */}
      </div>
    );
  }
}

/**
 * Prototyping the cloud data to provide proper style
 */
Cloud.propTypes = {
  fontName: PropTypes.string.isRequired,
  fontSizes: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  onSelectTopic: PropTypes.func.isRequired,
  selectedTopic: PropTypes.object,
  topics: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
};

Cloud.defaultProps = {
  selectedTopic: null,
};

