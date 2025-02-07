// ParameterSlider.jsx
import React, { useRef } from "react";

export const ParameterSlider = ({ value, onChange, label }) => {
  const svgRef = useRef(null);

  const getMousePosition = (event) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    // Calculate the actual width of the slider (distance between leftmost and rightmost dots)
    const totalWidth = rect.width;
    const effectiveWidth = (totalWidth * 60) / 100; // 60% of total width
    const padding = (totalWidth - effectiveWidth) / 2;
    
    // Adjust x position to account for padding
    const adjustedX = Math.max(padding, Math.min(x, totalWidth - padding));
    
    // Map the position to the -30 to 30 range
    const paramX = Math.round(((adjustedX - padding) / effectiveWidth) * 60 - 30);
    
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
            viewBox="-35 -10 70 20"
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
            {[-30, 0, 30].map((x) => (
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
