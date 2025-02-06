// ParameterGrid.jsx
import React from "react";

export const ParameterGrid = ({ param1, param2 }) => {
  return (
    <div className="parameter-grid-container">
      <svg width="400" height="400" viewBox="-50 -50 100 100">
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
            <circle
              key={`point-${x}-${y}`}
              cx={x}
              cy={-y} // Invert y to match coordinate system
              r="2"
              fill={x === param1 && y === param2 ? "red" : "green"}
            />
          ))
        )}
      </svg>
    </div>
  );
};
