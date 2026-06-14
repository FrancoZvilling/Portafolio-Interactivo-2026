import React, { useState } from 'react';
import { playFuturisticClick } from '../utils/audio';
import './SkillNode.css';

const SkillNode = ({ icon: Icon, name, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playFuturisticClick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="skill-node" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      style={{ '--node-color': color }}
    >
      <div className="skill-icon-container">
        <Icon className="skill-icon" />
        <div className="skill-glow"></div>
      </div>
      <div className={`skill-tooltip ${isHovered ? 'visible' : ''}`}>
        {name}
      </div>
    </div>
  );
};

export default SkillNode;
