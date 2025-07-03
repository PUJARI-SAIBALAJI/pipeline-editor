import React, { useState } from 'react';
import './Node.css';

const nodeTypeColors = {
  default: '#4a6baf',
  input: '#4CAF50',
  output: '#FF5722',
  process: '#2196F3',
  decision: '#9C27B0'
};

const Node = ({ node, onClick, onPositionChange, isConnecting, isSelected, onContextMenu, nodeType = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left mouse button
    
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
    setIsDragging(true);
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    onPositionChange(node.id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleInputClick = (e) => {
    onClick(node.id, false);
    e.stopPropagation();
  };

  const handleOutputClick = (e) => {
    onClick(node.id, true);
    e.stopPropagation();
  };

  return (
    <div 
      className={`node ${isSelected ? 'selected' : ''} ${isConnecting ? 'connecting' : ''}`}
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        borderLeft: `4px solid ${nodeTypeColors[nodeType]}`
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={onContextMenu}
    >
      <div className="node-header">
        {node.name}
        <span className="node-type-badge" style={{ backgroundColor: nodeTypeColors[nodeType] }}>
          {nodeType}
        </span>
      </div>
      <div className="node-ports">
        <div 
          className="port input-port"
          onClick={handleInputClick}
          title="Input port"
        ></div>
        <div 
          className="port output-port"
          onClick={handleOutputClick}
          title="Output port"
        ></div>
      </div>
    </div>
  );
};

export default Node;