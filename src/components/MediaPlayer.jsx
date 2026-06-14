import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaMusic } from 'react-icons/fa';
import './MediaPlayer.css';

// Importando los archivos subidos por el usuario
import track1 from '../assets/sonidos/musica/1-Running Up That Hill.mp3';
import track2 from '../assets/sonidos/musica/2-Night Trouble.mp3';
import track3 from '../assets/sonidos/musica/3-Redbone.mp3';
import track4 from '../assets/sonidos/musica/4-I See Fire.mp3';
import track5 from '../assets/sonidos/musica/5-Stay.mp3';
import track6 from '../assets/sonidos/musica/6-Fireflies.mp3';

const PLAYLIST = [
  { id: 1, title: 'Running Up That Hill', src: track1 },
  { id: 2, title: 'Night Trouble', src: track2 },
  { id: 3, title: 'Redbone', src: track3 },
  { id: 4, title: 'I See Fire', src: track4 },
  { id: 5, title: 'Stay', src: track5 },
  { id: 6, title: 'Fireflies', src: track6 }
];

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);
  const lastPrevClick = useRef(0);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Manejar el volumen bajito y la reproducción
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15; // 15% de volumen para que no moleste
      
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play falló", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    const now = Date.now();
    
    // Si pasaron menos de 600ms desde el último click, vuelve a la canción anterior
    if (now - lastPrevClick.current < 600) {
      setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    } else {
      // Si fue un click normal, solo reinicia la canción actual
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
    lastPrevClick.current = now;
  };

  // Cuando la canción termina, pasar a la siguiente automáticamente
  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="media-player-panel">
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onEnded={handleEnded} 
        preload="metadata"
      />

      <div className="player-header">
        <FaMusic className="player-icon" />
        <span className="player-title">Holo-Radio</span>
        <div className={`equalizer ${isPlaying ? 'playing' : ''}`}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      <div className="player-track-info">
        <div className="track-name">{currentTrack.title}</div>
        <div className="track-status">{isPlaying ? 'Reproduciendo...' : 'Pausado'}</div>
      </div>

      <div className="player-controls">
        <button className="control-btn" onClick={handlePrev} title="Doble click para anterior">
          <FaStepBackward />
        </button>
        <button className="control-btn play-btn" onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="control-btn" onClick={handleNext}>
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};

export default MediaPlayer;
