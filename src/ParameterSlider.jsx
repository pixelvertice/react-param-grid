// ParameterSlider.jsx
import React, { useRef } from "react";

export const ParameterSlider = ({ value, onChange, label }) => {
  const svgRef = useRef(null);

  const getMousePosition = (event) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;

    // Convert screen coordinates to parameter space (-30 to 30) and round to integers
    const paramX = Math.round((x / rect.width) * 60 - 30);

    // Clamp values to valid range
    return Math.max(-30, Math.min(30, paramX));
  };

  const handleMouseDown = (event) => {
    const newValue = getMousePosition(event);
    onChange(newValue);

    const handleMouseMove = (moveEvent) => {
      const pos = getMousePosition(moveEvent);
      onChange(pos);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="parameter-slider">
      <div className="slider-container">
        <label>{label}</label>
        <div className="slider-with-value">
          <svg
            ref={svgRef}
            width="400"
            height="50"
            viewBox="-50 -10 100 20"
            onMouseDown={handleMouseDown}
          >
            {/* Draw base line */}
            <line
              x1={-30}
              y1={0}
              x2={30}
              y2={0}
              stroke="#ccc"
              strokeWidth="0.5"
            />

            {/* Draw grid points */}
            {[-30, -15, 0, 15, 30].map((x) => (
              <circle key={`point-${x}`} cx={x} cy={0} r="3" fill="green" />
            ))}

            {/* Current position indicator */}
            <circle
              cx={value}
              cy={0}
              r="5"
              fill="red"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          <div className="value-display">{value}</div>
        </div>
      </div>
    </div>
  );
};
