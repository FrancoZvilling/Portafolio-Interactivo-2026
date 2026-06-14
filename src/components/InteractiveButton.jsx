import React, { useRef } from 'react';
import { playFuturisticClick } from '../utils/audio';
import './InteractiveButton.css';

const InteractiveButton = ({ text, onClick, variant = 'primary' }) => {
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    playFuturisticClick();
    if (buttonRef.current) {
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      buttonRef.current.appendChild(ripple);
      
      // Remove after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  };

  const cssClass = `interactive-btn btn-${variant}`;

  return (
    <button 
      ref={buttonRef}
      className={cssClass}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      <span className="btn-text">{text}</span>
      <div className="btn-glow"></div>
    </button>
  );
};

export default InteractiveButton;
