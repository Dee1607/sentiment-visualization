import React from "react";
import CanadaMap from "./components/CanadaMap";
import "./styles.css";
import DonutChart from './components/donutChart';
import CanadaJSON from "./components/CanadaMap.json";
import DonutJSON from "./components/donutData.json";
import { useEffect, useState } from "react/cjs/react.production.min";

export default function App() { 
  const [visible, setVisible] = React.useState(false)
  const [show, setShow] = React.useState("Show")
  const [data, setData] = React.useState([]);
  const [donutData, setDonutData] = React.useState([]);

  // React.useEffect(() => {
  //   const url = "https://api.opencovid.ca/timeseries";
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => setData(json['active']),
  //     )
  //     .catch((error) => console.log(error));
  // }, []);
  // console.log(donutData)

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
        <p>Chart</p>
        <DonutChart data={DonutJSON} />
      </div>
    )
  }
  return (
    <div className="App">
      <button onClick={handleClick}>{show} Donut</button>
      { visible ? <Chart /> : null }

      <CanadaMap
        mapJson={CanadaJSON}
        width="760"
        height="620"
        viewBox="0 0 760 620"
      />
    </div>
  );
}
