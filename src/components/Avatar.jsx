import React from 'react';
import './Avatar.css';

const Avatar = ({ src, alt = "Avatar" }) => {
  return (
    <div className="avatar-container">
      <div className="avatar-glow"></div>
      <img src={src} alt={alt} className="avatar-img" />
    </div>
  );
};

export default Avatar;
