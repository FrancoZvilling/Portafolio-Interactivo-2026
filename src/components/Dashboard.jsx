import React, { useEffect } from 'react';
import GlassPanel from './GlassPanel';
import SkillNode from './SkillNode';
import AIChatShell from './AIChatShell';
import DownloadCVButton from './DownloadCVButton';
import ContactPanel from './ContactPanel';
import MediaPlayer from './MediaPlayer';
import ProjectsModule from './ProjectsModule';
import { startAmbientHum } from '../utils/audio';
import './Dashboard.css';

// Íconos para las habilidades
import { FaReact, FaCss3Alt, FaGithub, FaNodeJs, FaDatabase, FaLeaf, FaRocket } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiFirebase, SiStrapi, SiExpress } from 'react-icons/si';

const Dashboard = () => {
  useEffect(() => {
    // Iniciar el sonido ambiente y guardar la función para detenerlo
    const stopHum = startAmbientHum();
    
    // Detenerlo si el usuario sale del dashboard
    return () => {
      stopHum();
    };
  }, []);

  return (
    <div className="dashboard-container fade-in">
      {/* Fondo estelar/holográfico muy sutil */}
      <div className="ambient-background"></div>

      <div className="dashboard-grid">
        {/* COLUMNA IZQUIERDA: Personalidad y Habilidades */}
        <div className="dashboard-col col-left">
          <GlassPanel title="Personalidad y Gustos" accent="orange" className="panel-personality">
            <p className="personality-text">
              Soy inteligente, muy curioso y creativo. Me apasiona imaginar, crear cosas nuevas e innovar planteando soluciones. Respeto mucho la ciencia y el método científico, aunque considero que la mente y el factor subjetivo son claves a la hora de trabajar y crear. Me guío fuertemente por la dignidad, el honor y la lealtad. Soy súper detallista y busco siempre que mi trabajo alcance su mejor versión. Tiendo a disfrutar trabajando solo, pero me adapto sin problemas al equipo si la misión lo requiere.
            </p>
          </GlassPanel>

          <GlassPanel title="Habilidades" accent="cyan" className="panel-skills">
            <div className="skills-grid">
              <SkillNode icon={FaReact} name="React Js" color="#61DAFB" />
              <SkillNode icon={FaRocket} name="Antigravity" color="#a855f7" />
              <SkillNode icon={FaCss3Alt} name="CSS" color="#1572B6" />
              <SkillNode icon={SiJavascript} name="JavaScript" color="#F7DF1E" />
              <SkillNode icon={SiTypescript} name="TypeScript" color="#3178C6" />
              <SkillNode icon={FaGithub} name="GitHub" color="#ffffff" />
              <SkillNode icon={SiFirebase} name="Firestore" color="#FFCA28" />
              <SkillNode icon={SiStrapi} name="Strapi" color="#2E7EEA" />
              <SkillNode icon={FaNodeJs} name="Node.js" color="#339933" />
              <SkillNode icon={SiExpress} name="Express.js" color="#aaaaaa" />
              <SkillNode icon={FaDatabase} name="SQL" color="#00758F" />
              <SkillNode icon={FaLeaf} name="NoSQL" color="#47A248" />
            </div>
          </GlassPanel>

          <ContactPanel />

          <MediaPlayer />
        </div>

        {/* COLUMNA CENTRAL: Proyectos */}
        <div className="dashboard-col col-center">
          <ProjectsModule />
        </div>

        <div className="dashboard-col col-right">
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <AIChatShell />
          </div>
          <DownloadCVButton />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
