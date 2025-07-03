import React from 'react';
import './Edge.css';

const Edge = ({ edge, nodes, isSelected, onClick, isValid }) => {
  const fromNode = nodes.find(n => n.id === edge.from);
  const toNode = nodes.find(n => n.id === edge.to);

  if (!fromNode || !toNode) return null;

  const startX = fromNode.x + 75; // Middle right of fromNode
  const startY = fromNode.y;
  const endX = toNode.x - 75; // Middle left of toNode
  const endY = toNode.y;

  // Calculate control points for a curved edge
  const controlX1 = startX + Math.abs(endX - startX) * 0.5;
  const controlY1 = startY;
  const controlX2 = endX - Math.abs(endX - startX) * 0.5;
  const controlY2 = endY;

  const pathData = `M ${startX} ${startY} 
                   C ${controlX1} ${controlY1}, 
                     ${controlX2} ${controlY2}, 
                     ${endX} ${endY}`;

  // Calculate arrowhead position
  const arrowLength = 10;
  const angle = Math.atan2(endY - controlY2, endX - controlX2);
  const arrowX = endX - arrowLength * Math.cos(angle);
  const arrowY = endY - arrowLength * Math.sin(angle);

 return (
    <g onClick={() => onClick(edge.id)} className="edge-group">
      <path
        d={pathData}
        className={`edge ${isSelected ? 'selected' : ''} ${!isValid ? 'invalid' : ''}`}
        markerEnd={isValid ? "url(#arrowhead)" : "url(#invalid-arrowhead)"}
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#4a6baf" />
        </marker>
        <marker
          id="invalid-arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff5252" />
        </marker>
      </defs>
    </g>
  );
};

export default Edge;