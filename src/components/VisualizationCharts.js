import React, { Component } from "react";
import "./CanadaMap.css";
import { withRouter } from "react-router-dom";
import WordCloud from "./WordCloud";
import PieChart from "./PieChart";
import TimeSeriesChart from "./TimeSeriesChart";
import CovidPieData from '../data/covidData/CovidPieChart.json';
import CovidWordCloudData from '../data/covidData/CovidWordCloud.json';
import CovidTimeSeriesData from '../data/covidData/CovidTimeSeries.csv';
import UkrainePieData from '../data/ukrainData/UkrainePieChart.json';
import UkraineWordCloudData from '../data/ukrainData/UkraineWordCloud.json';
import UkraineTimeSeriesData from '../data/ukrainData/UkraineTimeSeries.csv';
import WFHPieData from '../data/WFHData/WFHPieChart.json';
import WFHWordCloudData from '../data/WFHData/WFHWordCloud.json';
import WFHTimeSeriesData from '../data/WFHData/WFHTimeSeries.csv';

/**
 * Creating a  class combining the multiple visulalizaion
 */
class VisualizationChart extends Component {

    /**
     * Initializing the props at the entry of the class
     * @param {Object} props 
     */
    constructor(props){
        super(props);
        this.state = {
            PieChart: null,
            WordCloud: null,
            TimeSeriesChart: null
        };
        this.PieChartDataFunction();
    }

    /**
     * Selecting a selective data as per the data selection from the drop down menu
     */
    PieChartDataFunction(){

        const stateData = this.props.location.state.split("-")
        const province = stateData[0];
        var dataOf = stateData[1];
        let pieData = [];
        let timeSeriesData = [];
        let wordCloudData = []; 

        // Selecting Covid data
        if (dataOf == 'covid'){
            pieData = CovidPieData;
            timeSeriesData= CovidTimeSeriesData;
            wordCloudData=CovidWordCloudData;

        // Select Work From Home data
        }else if (dataOf == 'WFH'){
            pieData = WFHPieData;
            timeSeriesData= WFHTimeSeriesData;
            wordCloudData=WFHWordCloudData;
        
        // Select Ukrain Data
        }else if (dataOf == 'ukrain'){
            pieData = UkrainePieData;
            timeSeriesData= UkraineTimeSeriesData;
            wordCloudData=UkraineWordCloudData;
        }
        console.log(timeSeriesData);
        let pieDataProvince =[]
        pieData.map((key) => {
            if(key.location == province){
                pieDataProvince.push(key);
            }
        });

        
        let wordCloudDataProvince =[]
        wordCloudData.map((key) => {
            if(key.location == province){
                wordCloudDataProvince.push(key);
            }
        });

        // Storing  data into the state
        this.state.PieChart = pieDataProvince;
        this.state.WordCloud = wordCloudDataProvince;
    }

    /**
     * Rendering the Visualization of the multiple visualization
     * @returns {ReactElement}
     */
    render() {
    return (
      <>
        <h1 style={{fontFamily:"-moz-initial", fontSize:60, paddingLeft:10}}>{this.props.location.state.split("-")[0]}</h1>
        <div className="row" style={{'borderStyle':"double", "paddingLeft":"10px", borderColor:"silver"}}>
            <div className="col-md-4">
                <PieChart 
                    data = {this.state.PieChart}
                />
            </div>
            <div className="col-md-4">
                <WordCloud
                    topics={this.state.WordCloud}
                />
            </div>
            <div className="col-md-4">
                <TimeSeriesChart />
            </div>    
        </div>
        <script src="https://d3js.org/d3.v6.js"></script>
        <script src="/Users/deeppatel/Desktop/Visualization/Project/csci6406_project/node_modules/d3/dist/d3.js"></script>
        <script src="/Users/deeppatel/Desktop/Visualization/Project/csci6406_project/node_modules/d3moji/d3moji.js"></script>
      </>
    );
  }
}
 
export default withRouter(VisualizationChart);