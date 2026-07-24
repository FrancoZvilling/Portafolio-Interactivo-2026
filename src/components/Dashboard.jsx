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
              Soy una persona muy curiosa y creativa, apasionada por la innovación y la búsqueda de soluciones originales. Valoro profundamente la objetividad y el rigor del método científico, aunque entiendo que la intuición y el factor humano son piezas clave en cualquier proceso creativo. Me guío por una fuerte ética profesional, el compromiso y la integridad. Soy sumamente detallista y siempre busco la excelencia en cada entrega. Disfruto de la autonomía en mis proyectos, pero me desenvuelvo con facilidad y entusiasmo al colaborar dentro de un equipo cuando el objetivo lo requiere.
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
