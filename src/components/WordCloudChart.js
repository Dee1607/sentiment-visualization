import React, { Component, useState, useEffect } from "react";
import "./CanadaMap.css";
import Province from "./Province";
import { withRouter } from "react-router-dom";
import DonutJSON from "./PieChartData.json";
import PieClass from "./PieClass";
import * as d3 from "d3";
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const data = [
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000000 },
    { text: 'duck', value: 10 },
  ];
const colors = [ 'red' , 'blue', 'green']
const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

class WordCloudChart extends Component {
    
  constructor(props) {
    super(props);
    this.chRef = React.createRef();
  }

    render() {
        return (
          <>
            <WordCloud
                data={data}
                width={500}
                height={100}
                font="Times"
                fontStyle="italic"
                fontWeight="bold"
                fontSize={(word) => Math.log2(word.value) * 5}
                spiral="rectangular"
                rotate={(word) => word.value % 360}
                padding={5}
                random={Math.random}
                fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
                onWordClick={(event, d) => {
                console.log(`onWordClick: ${d.text}`);
                }}
                onWordMouseOver={(event, d) => {
                console.log(`onWordMouseOver: ${d.text}`);
                }}
                onWordMouseOut={(event, d) => {
                console.log(`onWordMouseOut: ${d.text}`);
                }}
            />        
        </>
        );
    }
}
export default withRouter(WordCloudChart);