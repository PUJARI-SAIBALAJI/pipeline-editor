import { useContext } from 'react';
import { DAGContext } from '../context/DAGContext';

export const useDAG = () => {
  const context = useContext(DAGContext);
  if (!context) {
    throw new Error('useDAG must be used within a DAGProvider');
  }
  return context;
};