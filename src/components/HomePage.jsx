import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaProjectDiagram, FaArrowRight, FaPlay } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <FaProjectDiagram className="logo-icon" />
            <h1 className="logo-text">DAG Editor</h1>
          </div>
          <h2 className="hero-headline">Design Your Data Pipeline</h2>
          <p className="hero-subhead">
            Create, validate, and optimize complex workflows with our intuitive visual editor.
          </p>
          <div className="cta-container">
            <button 
              className="cta-button"
              onClick={() => navigate('/editor')}
            >
              <FaPlay className="button-icon" />
              Start Building
            </button>
            <a href="#features" className="cta-link">
              Learn more <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="features-section">
        <div className="section-header">
          <h3>Powerful Features</h3>
          <p>Everything you need to build perfect data pipelines</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container">
              <FaArrowRight className="feature-icon" />
            </div>
            <h4>Visual Pipeline Builder</h4>
            <p>Drag-and-drop interface for effortless workflow creation</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-container">
              <FaArrowRight className="feature-icon" />
            </div>
            <h4>Real-time Validation</h4>
            <p>Instant feedback on your pipeline structure</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-container">
              <FaArrowRight className="feature-icon" />
            </div>
            <h4>Cycle Detection</h4>
            <p>Automatically identify and prevent circular dependencies</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-container">
              <FaArrowRight className="feature-icon" />
            </div>
            <h4>Auto-layout</h4>
            <p>Beautiful automatic organization of complex graphs</p>
          </div>
        </div>
      </div>

      {/* Demo Section */}
     
    </div>
  );
};

export default HomePage;