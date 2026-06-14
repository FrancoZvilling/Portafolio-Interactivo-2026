import React, { useEffect, useState } from 'react';
import './SpeechBubble.css';

const SpeechBubble = ({ text, delay = 500 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="speech-bubble">
      <p className="speech-text">{text}</p>
      <div className="speech-tail"></div>
    </div>
  );
};

export default SpeechBubble;
