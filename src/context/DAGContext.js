import React, { createContext, useContext, useReducer } from 'react';

const DAGContext = createContext();

const initialState = {
  nodes: [],
  edges: [],
  validationStatus: {
    isValid: false,
    message: 'Add at least 2 nodes to begin'
  }
};

const hasCycle = (nodes, edges) => {
  const graph = {};
  const visited = {};
  const recursionStack = {};

  // Build adjacency list
  nodes.forEach(node => {
    graph[node.id] = [];
  });
  
  edges.forEach(edge => {
    graph[edge.from].push(edge.to);
  });

  const isCyclicUtil = (nodeId) => {
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      recursionStack[nodeId] = true;

      const neighbors = graph[nodeId] || [];
      for (const neighbor of neighbors) {
        if (!visited[neighbor] && isCyclicUtil(neighbor)) {
          return true;
        } else if (recursionStack[neighbor]) {
          return true;
        }
      }
    }
    recursionStack[nodeId] = false;
    return false;
  };

  for (const nodeId in graph) {
    if (isCyclicUtil(nodeId)) {
      return true;
    }
  }
  return false;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NODE':
      const newNode = {
        ...action.payload,
        connections: []
      };
      return {
        ...state,
        nodes: [...state.nodes, newNode],
        validationStatus: {
          isValid: false,
          message: state.nodes.length === 0 ? 
            'Add one more node and create a connection' : 
            'Connect the nodes to validate'
        }
      };

    case 'ADD_EDGE':
      const newEdge = action.payload;
      const updatedEdges = [...state.edges, newEdge];
      
      // Validate the DAG after adding edge
      const validation = validateDAG([...state.nodes], updatedEdges);
      
      return {
        ...state,
        edges: updatedEdges,
        validationStatus: validation
      };

    case 'DELETE_NODE':
      const nodeIdToDelete = action.payload;
      const filteredNodes = state.nodes.filter(node => node.id !== nodeIdToDelete);
      const filteredEdges = state.edges.filter(
        edge => edge.from !== nodeIdToDelete && edge.to !== nodeIdToDelete
      );
      
      const validationAfterDelete = validateDAG(filteredNodes, filteredEdges);
      
      return {
        ...state,
        nodes: filteredNodes,
        edges: filteredEdges,
        validationStatus: validationAfterDelete
      };

    case 'DELETE_EDGE':
      const edgeIdToDelete = action.payload;
      const edgesAfterDelete = state.edges.filter(edge => edge.id !== edgeIdToDelete);
      
      const validationAfterEdgeDelete = validateDAG([...state.nodes], edgesAfterDelete);
      
      return {
        ...state,
        edges: edgesAfterDelete,
        validationStatus: validationAfterEdgeDelete
      };

    case 'UPDATE_NODE_POSITION':
      const { id, x, y } = action.payload;
      const updatedNodes = state.nodes.map(node => 
        node.id === id ? { ...node, x, y } : node
      );
      return {
        ...state,
        nodes: updatedNodes
      };
      case 'UNDO':
  return {
    ...state,
    nodes: action.payload.nodes,
    edges: action.payload.edges,
    validationStatus: validateDAG(action.payload.nodes, action.payload.edges)
  };

case 'REDO':
  return {
    ...state,
    nodes: action.payload.nodes,
    edges: action.payload.edges,
    validationStatus: validateDAG(action.payload.nodes, action.payload.edges)
  };

      case 'UPDATE_NODE_POSITIONS':
  return {
    ...state,
    nodes: action.payload
  };

    default:
      return state;
  }
};

const validateDAG = (nodes, edges) => {
  // Check minimum nodes
  if (nodes.length < 2) {
    return {
      isValid: false,
      message: 'Add at least 2 nodes'
    };
  }
  
  // Check all nodes are connected
  const connectedNodes = new Set();
  edges.forEach(edge => {
    connectedNodes.add(edge.from);
    connectedNodes.add(edge.to);
  });
  
  if (connectedNodes.size < nodes.length) {
    return {
      isValid: false,
      message: 'All nodes must be connected'
    };
  }
  
  // Check for cycles
  if (hasCycle(nodes, edges)) {
    return {
      isValid: false,
      message: 'Pipeline contains cycles'
    };
  }
  
  return {
    isValid: true,
    message: 'Pipeline is valid'
  };
};

export const DAGProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DAGContext.Provider value={{ state, dispatch }}>
      {children}
    </DAGContext.Provider>
  );
};

export const useDAG = () => useContext(DAGContext);