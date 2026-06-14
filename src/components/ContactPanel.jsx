import React from 'react';
import GlassPanel from './GlassPanel';
import { FaWhatsapp, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { playFuturisticClick } from '../utils/audio';
import './ContactPanel.css';

const ContactPanel = () => {
  const handleHover = () => playFuturisticClick();

  return (
    <GlassPanel title="Contáctame" accent="purple" className="panel-contact">
      <div className="contact-links">
        <a 
          href="https://wa.me/543541315119" 
          target="_blank" 
          rel="noreferrer" 
          className="contact-btn whatsapp"
          onMouseEnter={handleHover}
          title="WhatsApp"
        >
          <FaWhatsapp />
        </a>
        <a 
          href="mailto:francozvilling-programador@hotmail.com" 
          className="contact-btn email"
          onMouseEnter={handleHover}
          title="Email"
        >
          <FaEnvelope />
        </a>
        <a 
          href="http://linkedin.com/in/francozvilling/" 
          target="_blank" 
          rel="noreferrer" 
          className="contact-btn linkedin"
          onMouseEnter={handleHover}
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </GlassPanel>
  );
};

export default ContactPanel;
