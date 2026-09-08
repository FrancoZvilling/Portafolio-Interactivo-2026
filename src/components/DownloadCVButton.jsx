import React, { useState } from 'react';
import { FaDownload, FaTimes, FaGlobeAmericas, FaLanguage } from 'react-icons/fa';
import './DownloadCVButton.css';
import { playWoosh } from '../utils/audio';

import cvES from '../assets/sonidos/cv/Franco Zvilling - CV 2026.pdf';
import cvEN from '../assets/sonidos/cv/Franco Zvilling - Resume 2026.pdf';

const playDownloadSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(ctx.destination);
    
    osc1.type = 'square';
    osc2.type = 'sine';
    
    osc1.frequency.setValueAtTime(300, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.15);
    
    osc2.frequency.setValueAtTime(150, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.15);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.25);
    osc2.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.error("Audio API not supported", e);
  }
};

const DownloadCVButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingLang, setDownloadingLang] = useState(null);

  const handleOpenModal = () => {
    playWoosh();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isDownloading) return;
    setIsModalOpen(false);
  };

  const handleDownload = (lang, fileUrl, fileName) => {
    if (isDownloading) return;
    
    setDownloadingLang(lang);
    setIsDownloading(true);
    playDownloadSound();
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadingLang(null);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <>
      <button className="download-cv-btn" onClick={handleOpenModal}>
        <span className="btn-icon">
          <FaDownload />
        </span>
        <span className="btn-text-cv">
          Descargar CV
        </span>
        <div className="radar-pulse"></div>
        <div className="radar-pulse delay"></div>
      </button>

      {isModalOpen && (
        <div className="cv-modal-backdrop animate-fade-in" onClick={handleCloseModal}>
          <div className="cv-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cv-modal-close" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <div className="cv-modal-header">
              <h2>Seleccionar Idioma</h2>
              <p>¿Qué versión del currículum deseas descargar?</p>
            </div>
            
            <div className="cv-options-container">
              <button 
                className={`cv-option-btn ${isDownloading && downloadingLang === 'es' ? 'downloading' : ''}`}
                onClick={() => handleDownload('es', cvES, 'Franco_Zvilling_CV_2026_ES.pdf')}
              >
                <div className="cv-option-icon">
                  <FaLanguage />
                </div>
                <div className="cv-option-text">
                  <h3>Versión en Español</h3>
                  <span>Documento PDF interactivo</span>
                </div>
                <FaDownload className={`cv-download-icon ${isDownloading && downloadingLang === 'es' ? 'bounce' : ''}`} />
              </button>

              <button 
                className={`cv-option-btn ${isDownloading && downloadingLang === 'en' ? 'downloading' : ''}`}
                onClick={() => handleDownload('en', cvEN, 'Franco_Zvilling_Resume_2026_EN.pdf')}
              >
                <div className="cv-option-icon">
                  <FaGlobeAmericas />
                </div>
                <div className="cv-option-text">
                  <h3>English Version</h3>
                  <span>Interactive PDF document</span>
                </div>
                <FaDownload className={`cv-download-icon ${isDownloading && downloadingLang === 'en' ? 'bounce' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadCVButton;
