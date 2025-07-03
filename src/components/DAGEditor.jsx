import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDAG } from '../context/DAGContext';
import CustomNode from './CustomNode';
import ValidationStatus from './ValidationStatus';
import {
  FaPlus,
  FaTrash,
  FaInfoCircle,
  FaProjectDiagram,
  FaCode,
  FaUndo,
  FaRedo
} from 'react-icons/fa';
import { MdFitScreen } from 'react-icons/md';
import dagre from 'dagre';
import './DAGEditor.css';

const nodeTypes = {
  custom: CustomNode
};

const DAGEditor = () => {
  const { state, dispatch } = useDAG();
  const [showInputModal, setShowInputModal] = useState(false);
  const [nodeNameInput, setNodeNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useRef(null);
  const { fitView } = useReactFlow();

  const handleAddNode = () => {
    setShowInputModal(true);
    setErrorMessage('');
  };

  const confirmAddNode = () => {
    const name = nodeNameInput.trim();
    
    if (!name) {
      setErrorMessage('Node name cannot be empty');
      return;
    }

    // Check for duplicate node names (case insensitive)
    const isDuplicate = state.nodes.some(node => 
      node.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage(`A node with name "${name}" already exists`);
      return;
    }

    // If no duplicates, proceed with node creation
    const newNode = {
      id: `node-${Date.now()}`,
      name,
      x: Math.random() * 500 + 50,
      y: Math.random() * 300 + 50,
      type: 'default'
    };
    
    dispatch({ type: 'ADD_NODE', payload: newNode });
    setNodeNameInput('');
    setErrorMessage('');
    setShowInputModal(false);
  };

  // Rest of your component code remains the same...
  // Initialize with context state and history
  useEffect(() => {
    const formattedNodes = state.nodes.map(node => ({
      id: node.id,
      type: 'custom',
      position: { x: node.x, y: node.y },
      data: { label: node.name, type: node.type || 'default' }
    }));

    const formattedEdges = state.edges.map(edge => ({
      id: edge.id,
      source: edge.from,
      target: edge.to,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: state.validationStatus.isValid ? '#4a6baf' : '#ff5252'
      },
      style: {
        stroke: state.validationStatus.isValid ? '#4a6baf' : '#ff5252',
        strokeWidth: 2,
        strokeDasharray: state.validationStatus.isValid ? '0' : '5,5'
      }
    }));

    setNodes(formattedNodes);
    setEdges(formattedEdges);
    saveHistory(formattedNodes, formattedEdges);
  }, [state]);

  const saveHistory = (nodes, edges) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes, edges });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
      
      const updatedNodes = prevState.nodes.map(node => ({
        id: node.id,
        name: node.data.label,
        x: node.position.x,
        y: node.position.y,
        type: node.data.type
      }));
      
      const updatedEdges = prevState.edges.map(edge => ({
        id: edge.id,
        from: edge.source,
        to: edge.target
      }));
      
      dispatch({
        type: 'UNDO',
        payload: { nodes: updatedNodes, edges: updatedEdges }
      });
    }
  }, [history, historyIndex, dispatch]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(historyIndex + 1);
      
      const updatedNodes = nextState.nodes.map(node => ({
        id: node.id,
        name: node.data.label,
        x: node.position.x,
        y: node.position.y,
        type: node.data.type
      }));
      
      const updatedEdges = nextState.edges.map(edge => ({
        id: edge.id,
        from: edge.source,
        to: edge.target
      }));
      
      dispatch({
        type: 'REDO',
        payload: { nodes: updatedNodes, edges: updatedEdges }
      });
    }
  }, [history, historyIndex, dispatch]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        id: `edge-${Date.now()}`,
        from: params.source,
        to: params.target
      };
      dispatch({ type: 'ADD_EDGE', payload: newEdge });
    },
    [dispatch]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

 const onDrop = useCallback(
  (event) => {
    event.preventDefault();
    if (!reactFlowWrapper.current || !reactFlowInstance.current) return;

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    
    // Remove the default name and just use the prompt result
    const name = prompt('Enter node name:');
    
    // Only proceed if name is provided (not null or empty)
    if (name && name.trim()) {
      const position = reactFlowInstance.current.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });

      const newNode = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: { label: name, type: 'default' }
      };

      dispatch({
        type: 'ADD_NODE',
        payload: {
          id: newNode.id,
          name,
          x: position.x,
          y: position.y,
          type: 'default'
        }
      });
    }
  },
  [dispatch]
);

  const onSelectionChange = useCallback(({ nodes: selectedNodes, edges: selectedEdges }) => {
    if (selectedNodes.length > 0) {
      setSelectedElement(selectedNodes[0]);
    } else if (selectedEdges.length > 0) {
      setSelectedElement(selectedEdges[0]);
    } else {
      setSelectedElement(null);
    }
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedElement(null);
  }, []);

  const onNodesDelete = useCallback(
    (deletedNodes) => {
      deletedNodes.forEach(node => {
        dispatch({ type: 'DELETE_NODE', payload: node.id });
      });
    },
    [dispatch]
  );

  const onEdgesDelete = useCallback(
    (deletedEdges) => {
      deletedEdges.forEach(edge => {
        dispatch({ type: 'DELETE_EDGE', payload: edge.id });
      });
    },
    [dispatch]
  );

  const deleteSelected = useCallback(() => {
    if (selectedElement) {
      if (selectedElement.id.startsWith('node')) {
        dispatch({ type: 'DELETE_NODE', payload: selectedElement.id });
      } else {
        dispatch({ type: 'DELETE_EDGE', payload: selectedElement.id });
      }
      setSelectedElement(null);
    }
  }, [selectedElement, dispatch]);

  const applyAutoLayout = useCallback(() => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'TB', nodesep: 50, ranksep: 100 });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 172, height: 72 });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - 86,
          y: nodeWithPosition.y - 36
        }
      };
    });

    setNodes(layoutedNodes);
    saveHistory(layoutedNodes, edges);
  }, [nodes, edges]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && selectedElement) {
        deleteSelected();
      }
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected, undo, redo, selectedElement]);

  return (
    <div className="editor-container">
      {showInputModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Enter Node Name</h3>
            <input
              type="text"
              value={nodeNameInput}
              onChange={(e) => {
                setNodeNameInput(e.target.value);
                setErrorMessage('');
              }}
              placeholder="e.g., Validate Input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  confirmAddNode();
                }
              }}
            />
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="modal-buttons">
              <button onClick={confirmAddNode}>Add Node</button>
              <button onClick={() => {
                setShowInputModal(false);
                setErrorMessage('');
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div
        className="reactflow-wrapper"
        ref={reactFlowWrapper}
        style={{ height: '100vh', width: '100vw' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={(instance) => (reactFlowInstance.current = instance)}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onSelectionChange={onSelectionChange}
          onPaneClick={onPaneClick}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid={true}
          snapGrid={[15, 15]}
          attributionPosition="bottom-right"
          deleteKeyCode={null}
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          <Panel position="top-right">
            <ValidationStatus status={state.validationStatus} />
          </Panel>
          <Panel position="top-left">
            <div className="toolbar">
              <button
                onClick={handleAddNode}
                className="toolbar-btn"
                title="Add Node"
              >
                <FaPlus /> Add Node
              </button>
              <button
                onClick={applyAutoLayout}
                className="toolbar-btn"
                title="Auto Layout"
              >
                <FaProjectDiagram /> Layout
              </button>
              <button
                onClick={() => fitView({ padding: 0.5 })}
                className="toolbar-btn"
                title="Fit View"
              >
                <MdFitScreen /> Fit View
              </button>
              <button
                onClick={undo}
                className="toolbar-btn"
                title="Undo (Ctrl+Z)"
                disabled={historyIndex <= 0}
              >
                <FaUndo /> Undo
              </button>
              <button
                onClick={redo}
                className="toolbar-btn"
                title="Redo (Ctrl+Y)"
                disabled={historyIndex >= history.length - 1}
              >
                <FaRedo /> Redo
              </button>
              <button
                onClick={deleteSelected}
                className="toolbar-btn danger"
                title="Delete Selected (Delete)"
                disabled={!selectedElement}
              >
                <FaTrash /> Delete
              </button>
              <button
                onClick={() => setShowJSON(!showJSON)}
                className="toolbar-btn"
                title="Show JSON"
              >
                <FaCode /> JSON
              </button>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="toolbar-btn"
                title="Show Help"
              >
                <FaInfoCircle /> Help
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {showHelp && (
        <div className="help-modal">
          <div className="help-content">
            <h3>How to use the DAG Editor</h3>
            <ul>
              <li>
                <strong>Add Node:</strong> Click "Add Node" button
              </li>
              <li>
                <strong>Create Connection:</strong> Drag from a node's output
                (right side) to another node's input (left side)
              </li>
              <li>
                <strong>Delete:</strong> Select an item and click Delete button or press Delete key
              </li>
              <li>
                <strong>Undo/Redo:</strong> Use buttons or Ctrl+Z/Ctrl+Y
              </li>
              <li>
                <strong>Move Nodes:</strong> Drag nodes to reposition them
              </li>
              <li>
                <strong>Auto Layout:</strong> Click "Layout" button to
                automatically arrange nodes
              </li>
            </ul>
            <button onClick={() => setShowHelp(false)}>Close</button>
          </div>
        </div>
      )}

      {showJSON && (
        <div className="json-preview">
          <pre>{JSON.stringify({ nodes: state.nodes, edges: state.edges }, null, 2)}</pre>
          <button onClick={() => setShowJSON(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DAGEditor;