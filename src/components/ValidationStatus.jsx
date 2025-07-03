import React from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './ValidationStatus.css';

const ValidationStatus = ({ status }) => {
  return (
    <div className={`validation-status ${status.isValid ? 'valid' : 'invalid'}`}>
      {status.isValid ? (
        <FaCheckCircle className="status-icon" />
      ) : (
        <FaExclamationTriangle className="status-icon" />
      )}
      <span className="status-message">{status.message}</span>
    </div>
  );
};

export default ValidationStatus;