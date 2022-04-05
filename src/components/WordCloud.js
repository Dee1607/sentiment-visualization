import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WordCloud.css';
import Cloud from './Cloud';
import Sidebar from './Sidebar';

/**
 * Compose individual components
 */
export default class WordCloud extends Component {

  /**
   * Set initial state of component
   * @param  {Object} props Props of component
   * @return {void}
   */
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedTopic: null,
    };
    this.onSelectTopic = this.onSelectTopic.bind(this);
  }

  /**
   * Click handler
   * @param  {String} topic Whole topic object
   * @return {void}
   */
  onSelectTopic(topic) {
    this.setState({
      selectedTopic: topic,
    });
  }

  /**
   * Compose components
   * @return {ReactElement} [description]
   */
  render() {
    const {
      fontName,
      fontSizes,
      height,
      topics,
      width,
    } = this.props;

    if (topics.length === 0) {
      return (<span>No topics available.</span>);
    }

    return (
      <section className="wordcloud">
        <h1 style={{fontFamily:"-moz-initial"}}>WordCloud based on polarity and frequency</h1>
        <Cloud
          fontName={fontName}
          fontSizes={fontSizes}
          height={height}
          onSelectTopic={this.onSelectTopic}
          selectedTopic={this.state.selectedTopic}
          topics={topics}
          width={width}
        />
        <Sidebar
          topic={this.state.selectedTopic}
        />
      </section>
    );
  }
}

WordCloud.propTypes = {
  fontName: PropTypes.string,
  fontSizes: PropTypes.array,
  height: PropTypes.number,
  topics: PropTypes.array,
  width: PropTypes.number,
};

WordCloud.defaultProps = {
  fontName: 'Sans-Serif',
  fontSizes: [13, 16, 20, 26, 35, 49],
  height: 400,
  topics: [],
  width: 400,
};
