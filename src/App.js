import React from 'react';
import { ReactFlowProvider } from 'reactflow'; // Add this at top


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DAGEditor from './components/DAGEditor';
import { DAGProvider } from './context/DAGContext';
import './App.css';

function App() {
  return (
    <Router>
      <DAGProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route
            path="/editor"
            element={
              <ReactFlowProvider>
                <DAGEditor />
              </ReactFlowProvider>
            }
          />
        </Routes>
      </DAGProvider>
    </Router>
  );
}



export default App;