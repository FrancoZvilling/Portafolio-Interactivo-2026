import React from 'react';
import { FaArrowLeft, FaCheckCircle, FaLightbulb, FaRocket, FaTools, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onBack }) => {
  return (
    <div className="project-detail-container">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Volver a la Galería
        </button>
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="external-link-btn">
            Ir al Proyecto <FaExternalLinkAlt />
          </a>
        ) : project.isPrivate ? (
          <div className="private-project-badge">
            <FaLock /> Proyecto Privado
          </div>
        ) : null}
      </div>

      <div className="detail-content">
        <div className="detail-hero">
          <div className="hero-icon">{project.icon}</div>
          <h2 className="detail-title">{project.title}</h2>
          <p className="detail-subtitle">{project.shortDesc}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-section">
            <h3><FaCheckCircle className="section-icon" /> El Problema</h3>
            <p>{project.problem}</p>
          </div>

          <div className="detail-section">
            <h3><FaLightbulb className="section-icon" /> La Solución</h3>
            <p>{project.solution}</p>
          </div>

          <div className="detail-section">
            <h3><FaRocket className="section-icon" /> Impacto en el Cliente</h3>
            <p>{project.impact}</p>
          </div>

          <div className="detail-section tech-section">
            <h3><FaTools className="section-icon" /> Tecnologías</h3>
            <div className="tech-tags">
              {project.tech.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
