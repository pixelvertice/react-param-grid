// App.jsx
import React, { useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { ParameterGrid } from "./ParameterGrid";
import "./App.css";

function App() {
  const [param1, setParam1] = useState(0);
  const [param2, setParam2] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  const keyPoints = [-30, 0, 30];

  const handleParameterChange = (x, y) => {
    setParam1(x);
    setParam2(y);
  };

  return (
    <div className="app">
      <h1>Parameter Control</h1>

      <div className="controls">
        <ParameterSlider
          value={param1}
          onChange={setParam1}
          label="Parameter 1"
          keyPoints={keyPoints}
        />

        <ParameterSlider
          value={param2}
          onChange={setParam2}
          label="Parameter 2"
          keyPoints={keyPoints}
        />

        <button className="toggle-grid" onClick={() => setShowGrid(!showGrid)}>
          {showGrid ? "Hide Grid" : "Show Grid"}
        </button>
      </div>

      {showGrid && (
        <ParameterGrid
          param1={param1}
          param2={param2}
          onParameterChange={handleParameterChange}
        />
      )}
    </div>
  );
}

export default App;
