import React, { useEffect, useState } from 'react';
import './ParticleExplosion.css';

const ParticleExplosion = ({ onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generar partículas aleatorias
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300, // Dispersión X
      y: (Math.random() - 0.5) * 300, // Dispersión Y
      scale: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 0.1
    }));
    
    setParticles(newParticles);

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 800); // Duración de la animación

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="particle-container">
      {particles.map((p) => (
        <div 
          key={p.id} 
          className="particle"
          style={{
            '--tx': `${p.x}px`,
            '--ty': `${p.y}px`,
            '--s': p.scale,
            animationDelay: `${p.delay}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default ParticleExplosion;
