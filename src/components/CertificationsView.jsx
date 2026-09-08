import React, { useState } from 'react';
import { FaArrowLeft, FaCertificate, FaExpandArrowsAlt, FaTimes } from 'react-icons/fa';
import { playFuturisticClick, playWoosh } from '../utils/audio';
import './CertificationsView.css';

const CERTIFICATES = [
  { id: 1, title: 'Desarrollo Web', file: '/Desarrollo web.png', tech: 'HTML, CSS, Diseño Responsive' },
  { id: 2, title: 'Frontend', file: '/Frontend.png', tech: 'JavaScript, UI/UX, DOM' },
  { id: 3, title: 'JavaScript', file: '/JavaScript.png', tech: 'ES6+, Asincronía, Lógica' },
  { id: 4, title: 'React', file: '/React.png', tech: 'Componentes, Hooks, State' },
  { id: 5, title: 'Micro1 - Project Lead', file: '/micro1-Project lead.jpg', tech: 'Liderazgo, Arquitectura, Gestión' }
];

const CertificationsView = ({ onBack }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOpenCert = (cert) => {
    playWoosh();
    setSelectedCert(cert);
  };

  const handleCloseCert = () => {
    playFuturisticClick();
    setSelectedCert(null);
  };

  return (
    <div className="certifications-console animate-fade-in">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Volver a la Galería
        </button>
      </div>

      <div className="terminal-header" style={{ marginBottom: '20px' }}>
        <h2 className="terminal-title"><FaCertificate className="term-icon"/> Bóveda de Certificaciones</h2>
        <span className="terminal-status blink-fast">SECURE_FILES_DECRYPTED</span>
      </div>

      <div className="certs-grid">
        {CERTIFICATES.map((cert, index) => (
          <div 
            key={cert.id} 
            className="cert-card"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleOpenCert(cert)}
          >
            <div className="cert-thumbnail-wrapper">
              <img src={cert.file} alt={`Certificado de ${cert.title}`} className="cert-thumbnail" loading="lazy" />
              <div className="cert-overlay">
                <FaExpandArrowsAlt className="expand-icon" />
                <span>Ampliar Documento</span>
              </div>
            </div>
            <div className="cert-info">
              <h3>{cert.title}</h3>
              <p className="cert-tech">{cert.tech}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCert && (
        <div className="cert-modal-backdrop animate-fade-in" onClick={handleCloseCert}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={handleCloseCert}>
              <FaTimes />
            </button>
            <div className="cert-modal-header">
              <h3>{selectedCert.title}</h3>
              <span className="cert-badge">VERIFIED</span>
            </div>
            <div className="cert-modal-image-wrapper">
              <img src={selectedCert.file} alt={selectedCert.title} className="cert-full-image" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsView;
