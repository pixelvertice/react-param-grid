// ParameterGrid.jsx
import React, { useRef } from "react";

export const ParameterGrid = ({ param1, param2, onParameterChange }) => {
  const svgRef = useRef(null);

  const getMousePosition = (event) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    
    // Get mouse position relative to SVG
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert screen pixels to parameter values directly
    const paramX = Math.round((x / rect.width) * 60 - 30);
    const paramY = Math.round((-y / rect.height) * 60 + 30);

    // Clamp values to valid range
    return {
      x: Math.max(-30, Math.min(30, paramX)),
      y: Math.max(-30, Math.min(30, paramY))
    };
  };

  const handleMouseDown = (event) => {
    const { x, y } = getMousePosition(event);
    onParameterChange(x, y);

    const handleMouseMove = (moveEvent) => {
      const pos = getMousePosition(moveEvent);
      onParameterChange(pos.x, pos.y);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="parameter-grid-container">
      <svg
        ref={svgRef}
        width="400"
        height="400"
        viewBox="-35 -35 70 70"
        onMouseDown={handleMouseDown}
      >
        {/* Draw grid lines */}
        <g className="grid-lines" stroke="#ccc" strokeWidth="0.5">
          {[-30, 0, 30].map((x) => (
            <line key={`vertical-${x}`} x1={x} y1={-30} x2={x} y2={30} />
          ))}
          {[-30, 0, 30].map((y) => (
            <line key={`horizontal-${y}`} x1={-30} y1={y} x2={30} y2={y} />
          ))}
        </g>

        {/* Draw grid points */}
        {[-30, 0, 30].map((y) =>
          [-30, 0, 30].map((x) => (
            <circle key={`point-${x}-${y}`} cx={x} cy={-y} r="3" fill="green" />
          ))
        )}

        {/* Current position indicator */}
        <circle
          cx={param1}
          cy={-param2}
          r="5"
          fill="red"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
