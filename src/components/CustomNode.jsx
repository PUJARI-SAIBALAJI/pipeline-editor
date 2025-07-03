import React from 'react';
import { Handle } from 'reactflow';
import './CustomNode.css';

const nodeTypeColors = {
  default: '#4a6baf',
  input: '#4CAF50',
  output: '#FF5722',
  process: '#2196F3',
  decision: '#9C27B0'
};

const CustomNode = ({ data, selected }) => {
  return (
    <div
      className={`custom-node ${selected ? 'selected' : ''}`}
      style={{ borderLeftColor: nodeTypeColors[data.type || 'default'] }}
    >
      <div className="node-header">
        {data.label}
        <span
          className="node-type-badge"
          style={{ backgroundColor: nodeTypeColors[data.type || 'default'] }}
        >
          {data.type || 'default'}
        </span>
      </div>
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

export default CustomNode;