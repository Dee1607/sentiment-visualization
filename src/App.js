import React from "react";
import CanadaMap from "./components/CanadaMap";
import "./styles.css";

import CanadaJSON from "./components/CanadaMap.json";

export default function App() {
  return (
    <div className="App">
      <CanadaMap
        mapJson={CanadaJSON}
        width="760"
        height="620"
        viewBox="0 0 760 620"
      />
    </div>
  );
}
