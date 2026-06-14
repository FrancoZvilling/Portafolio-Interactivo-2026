import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="card-image-wrapper">
        <div className="card-image-placeholder">
          <span className="card-icon">{project.icon}</span>
        </div>
        <div className="card-overlay">
          <span className="view-text">Ver Detalles</span>
        </div>
      </div>
      <div className="card-info">
        <h3>{project.title}</h3>
        <p>{project.shortDesc}</p>
      </div>
      <div className="card-glow"></div>
    </div>
  );
};

export default ProjectCard;
