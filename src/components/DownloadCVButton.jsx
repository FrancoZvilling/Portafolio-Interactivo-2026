import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import './DownloadCVButton.css';

// Import the PDF file directly so Vite processes it and gives us the URL
import cvFileES from '../assets/sonidos/cv/Franco Zvilling - 2026 (ES).pdf';

const playDownloadSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    
    // Futuristic magnetic/electronic chirp
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(ctx.destination);
    
    // Mix a square wave and a sine wave for an electronic "magnetic" feel
    osc1.type = 'square';
    osc2.type = 'sine';
    
    // Glissando (slide up)
    osc1.frequency.setValueAtTime(300, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.15);
    
    osc2.frequency.setValueAtTime(150, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.15);
    
    // Lowpass filter that sweeps up to add a "laser/magnetic" sweep effect
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
    
    // Quick volume envelope: sharp attack, quick decay
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02); // attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2); // decay
    
    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.25);
    osc2.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.error("Audio API not supported", e);
  }
};

const DownloadCVButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    playDownloadSound();
    
    // Trigger download programmatically
    const link = document.createElement('a');
    link.href = cvFileES;
    link.download = 'Franco_Zvilling_CV_2026_ES.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Visual reset after a short delay
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <button className={`download-cv-btn ${isDownloading ? 'downloading' : ''}`} onClick={handleDownload}>
      <span className="btn-icon">
        <FaDownload className={isDownloading ? 'bounce' : ''} />
      </span>
      <span className="btn-text-cv">
        {isDownloading ? 'Descargando...' : 'Descargar CV'}
      </span>
      <div className="radar-pulse"></div>
      <div className="radar-pulse delay"></div>
    </button>
  );
};

export default DownloadCVButton;
