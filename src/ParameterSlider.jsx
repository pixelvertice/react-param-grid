// ParameterSlider.jsx
import React from "react";

export const ParameterSlider = ({ value, onChange, label, keyPoints }) => {
  return (
    <div className="parameter-slider">
      <label>{label}</label>
      <div className="slider-container">
        <input
          type="range"
          min="-30"
          max="30"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="key-points">
          {keyPoints.map((point) => (
            <button
              key={point}
              className={`key-point ${value === point ? "active" : ""}`}
              style={{ left: `${((point + 30) / 60) * 100}%` }}
              onClick={() => onChange(point)}
            >
              {point}
            </button>
          ))}
        </div>
      </div>
      <div className="current-value">Current: {value}</div>
    </div>
  );
};
