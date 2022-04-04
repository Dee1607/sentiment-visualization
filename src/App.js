import React from "react";
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
import CanadaMap from "./components/CanadaMap";
import PieChart from "./components/PieChart";
import Header from "./container/Header"
import Footer from "./container/Footer"
import "./styles.css";
import { Button } from "react-bootstrap";
import DonutChart from './components/donutChart';
import VisualizationChart from './components/VisualizationCharts'
import CanadaJSON from "./components/CanadaMap.json";
import DonutJSON from "./components/donutData.json";
import { useEffect, useState } from "react/cjs/react.production.min";

export default function App() { 
  const [visible, setVisible] = React.useState(false)
  const [show, setShow] = React.useState("Show")
  const [data, setData] = React.useState([]);
  const [donutData, setDonutData] = React.useState([]);

  React.useEffect(() => {
    const url = "https://api.opencovid.ca/timeseries";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json['active']),
      )
      .catch((error) => console.log(error));
  }, []);
  console.log(donutData)

  function handleClick(e) {
    if(show == "Show"){
      setVisible(true)
      setShow("Hide")
    }else{
      setVisible(false)
      setShow("Show")
    }
    console.log(visible)
  }

  const Chart = () =>{
    return(
      <div>
        <p>COMPLEMENTORY COVID-19 CASES BY PROVINCE</p>
        <DonutChart data={DonutJSON} />
      </div>
    )
  }
  return (
    <div className="App">
      <div>
        <Router>
        <Header />
          <div>
            <Switch>
              <Route exact path="/">
                <CanadaMap mapJson={CanadaJSON}  width="760"
                  height="620"
                  viewBox="0 0 760 620"/>
              </Route>
              <Route exact path="/province">
                <div>
                  <p>Chart</p>
                  <DonutChart data={DonutJSON} />
                </div>
              </Route>
              {/* <Route exact path="/pieChart">
                <div>
                  <PieChart />
                </div>
              </Route> */}
              <Route exact path="/visualization">
                <div>
                  <VisualizationChart />
                </div>
              </Route>
              <Route path="/visualization/:id">
                <div>
                  <VisualizationChart />
                </div>
              </Route>
            </Switch>
          </div>
          <div className="row">
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleClick}>
              {show} complimentory Visualization
            </Button>
            { visible ? <Chart /> : null }
          </div>
              
          </div>
          <div className="row">
            <div className="col-md-12">
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <br />
            </div>
          </div>
          <Footer />              
        </Router>
      </div>

    </div>
  );
}
