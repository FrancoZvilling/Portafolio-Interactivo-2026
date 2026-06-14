import React from 'react';
import './GlassPanel.css';

const GlassPanel = ({ children, title, className = '', accent = 'cyan' }) => {
  return (
    <div className={`glass-panel accent-${accent} ${className}`}>
      {title && <h3 className="glass-panel-title">{title}</h3>}
      <div className="glass-panel-content">
        {children}
      </div>
    </div>
  );
};

export default GlassPanel;
