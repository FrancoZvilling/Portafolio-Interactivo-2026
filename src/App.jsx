import React, { useState, useEffect } from 'react';
import Avatar from './components/Avatar';
import SpeechBubble from './components/SpeechBubble';
import InteractiveButton from './components/InteractiveButton';
import Dashboard from './components/Dashboard';
import { playAdvanceSound } from './utils/audio';
import bienvenidoSound from './assets/sonidos/avatar/bienvenido.mp3';
import presentacionSound from './assets/sonidos/avatar/si.mp3';
import './App.css';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [stage, setStage] = useState('welcome');

  useEffect(() => {
    if (isStarted && stage === 'welcome') {
      const audio = new Audio(bienvenidoSound);
      // Sincronizado para que suene justo cuando aparece la burbuja (800ms)
      setTimeout(() => {
        audio.play().catch(e => console.error("Error reproduciendo el audio:", e));
      }, 800);
    } else if (stage === 'presentation') {
      const audio = new Audio(presentacionSound);
      setTimeout(() => {
        audio.play().catch(e => console.error("Error reproduciendo la presentación:", e));
      }, 500); // Pequeño retraso para la transición
    }
  }, [isStarted, stage]);

  const handleYes = () => {
    playAdvanceSound();
    setStage('presentation');
  };

  const handleNo = () => {
    playAdvanceSound();
    setStage('main-menu');
  };

  const handleVamos = () => {
    playAdvanceSound();
    setStage('tutorial');
  };

  if (!isStarted) {
    return (
      <div className="welcome-container" onClick={() => setIsStarted(true)} style={{ cursor: 'pointer' }}>
        <div className="scene fade-in" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '10px', animation: 'pulseGlow 2s infinite' }}>[ Haz clic para ingresar ]</h2>
          <p className="subtitle">Esta experiencia incluye sonido</p>
        </div>
      </div>
    );
  }

  if (stage === 'tutorial' || stage === 'main-menu') {
    return <Dashboard isTutorial={stage === 'tutorial'} />;
  }

  return (
    <div className="welcome-container">
      {stage === 'welcome' && (
        <div className="scene">
          <div className="avatar-wrapper">
            <SpeechBubble text="¡Bienvenido a mi portafolio! ¿Es la primera vez que pasas por acá?" delay={800} />
            <Avatar src="/avatar.png" alt="Mi Avatar" />
          </div>
          
          <div className="actions animate-up">
            <InteractiveButton text="Sí" variant="primary" onClick={handleYes} />
            <InteractiveButton text="No" variant="secondary" onClick={handleNo} />
          </div>
        </div>
      )}

      {stage === 'presentation' && (
        <div className="scene fade-in">
          <div className="avatar-wrapper">
            <SpeechBubble 
              text="Estás en mi portafolio. Mi nombre es Franco Zvilling y soy arquitecto de software. A continuación, vas a poder ver mis proyectos y habilidades. El sitio cuenta con una IA integrada que sabe todo sobre mí; no dudes en charlar con ella." 
              delay={500} 
            />
            <Avatar src="/avatar_serio.png" alt="Avatar Presentación" />
          </div>
          
          <div className="actions animate-up" style={{ animationDelay: '1.5s' }}>
            <InteractiveButton text="Vamos" variant="primary" onClick={handleVamos} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
