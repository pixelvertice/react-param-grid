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
        <div className="parameters-container">
          <div className="parameter-row">
            <label>Parameter1</label>
            {showGrid ? (
              <div className="value-display">{param1.toFixed(1)}</div>
            ) : (
              <ParameterSlider
                value={param1}
                onChange={setParam1}
                keyPoints={keyPoints}
              />
            )}
          </div>

          <div className="parameter-row">
            <label>Parameter2</label>
            {showGrid ? (
              <div className="value-display">{param2.toFixed(1)}</div>
            ) : (
              <ParameterSlider
                value={param2}
                onChange={setParam2}
                keyPoints={keyPoints}
              />
            )}
          </div>

          {showGrid && (
            <div className="grid-wrapper">
              <ParameterGrid
                param1={param1}
                param2={param2}
                onParameterChange={handleParameterChange}
              />
            </div>
          )}
        </div>

        <button className="toggle-grid" onClick={() => setShowGrid(!showGrid)}>
          {showGrid ? "Show Sliders" : "Show Grid"}
        </button>
      </div>
    </div>
  );
}

export default App;
