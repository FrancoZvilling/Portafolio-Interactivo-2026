import React, { useState } from 'react';
import GlassPanel from './GlassPanel';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import ParticleExplosion from './ParticleExplosion';
import { playWoosh, playFuturisticClick } from '../utils/audio';
import { FaLaptopCode, FaSpaceShuttle, FaMobileAlt, FaArrowLeft, FaExternalLinkAlt, FaTools } from 'react-icons/fa';
import aeriLogo from '../assets/sonidos/iconos/aeri.png';
import pilatesLogo from '../assets/sonidos/iconos/pilates.webp';
import estudiaLogo from '../assets/sonidos/iconos/estudia.png';
import './ProjectsModule.css';

const DUMMY_PROJECTS = [
  {
    id: 1,
    title: "Sindicato AERI",
    shortDesc: "Plataforma integral de gestión administrativa y autogestión de contenidos.",
    icon: <img src={aeriLogo} alt="AERI Logo" className="project-logo" />,
    problem: "El sindicato administraba la información de más de 3.200 afiliados y sus grupos familiares con procesos mayormente tradicionales. Esto generaba demoras administrativas, reportes manuales propensos a errores y dificultaba la interacción digital directa con el socio, limitando la escalabilidad y la toma de decisiones rápidas de la Comisión Directiva.",
    solution: "Desarrollé e implementé la plataforma \"Mi AERI\", centralizando la infraestructura en un backend robusto. Creé un sistema de autogestión de contenidos (noticias, turismo, etc.) para los distintos sectores y diseñé un motor de automatización con Node.js que extrae métricas en tiempo real y genera reportes ejecutivos en PDF de forma automática.",
    impact: "Se logró la integración exitosa y auditoría de 900 familiares externos a la base de datos. Además, el tiempo de extracción de datos y generación de reportes mensuales se redujo de horas a menos de 2 minutos, optimizando los recursos administrativos y logrando que más de 130 socios ya migren a la adopción 100% digital en la primera fase.",
    tech: ["Node.js", "Strapi (Headless CMS)", "PostgreSQL", "JavaScript", "Chart.js", "Railway"],
    link: "https://aeri.org.ar"
  },
  {
    id: 2,
    title: "Gestión Pilates",
    shortDesc: "Plataforma integral para reservas, asistencias y control de pagos.",
    icon: <img src={pilatesLogo} alt="Pilates Logo" className="project-logo" />,
    problem: "La gestión de turnos por WhatsApp y el control en papel generaban sobrecupos en las clases, pérdida de tiempo y dificultaban el seguimiento de las cuotas mensuales.",
    solution: "Desarrollé una PWA con roles de usuario (Alumno, Profesor, Admin), agenda interactiva en tiempo real y un sistema automatizado de inasistencias y créditos compensatorios.",
    impact: "Reducción del 90% en el tiempo de gestión administrativa, eliminación total de reservas duplicadas y autogestión fluida para más de 100 alumnos.",
    tech: ["React.js", "Firebase", "Firestore", "Tailwind CSS"],
    isPrivate: true
  },
  {
    id: 3,
    title: "Estud-IA",
    shortDesc: "PWA académica con IA, desarrollada para la agrupación Franja Morada de la Facultad de Psicología (UNC).",
    icon: <img src={estudiaLogo} alt="Estud-IA Logo" className="project-logo" />,
    problem: "Los estudiantes universitarios y secundarios enfrentan una desorganización masiva al fragmentar horarios, tareas y material de estudio en múltiples plataformas (Drive, WhatsApp, papel), generando estrés y bajo rendimiento académico. La falta de métodos de estudio activos (como active recall) limita la retención de conocimientos críticos antes de los parciales.",
    solution: "Desarrollé Estud-IA, una PWA (Progressive Web App) que centraliza la gestión académica completa: horarios, materias, calificaciones y archivos en la nube con acceso sin conexión. Integra un asistente de Inteligencia Artificial avanzado que genera automáticamente resúmenes precisos y modelos de parcial interactivos basándose en el propio material cargado por el usuario.",
    impact: "Se validó el MVP con una prueba piloto de 300 estudiantes. Los usuarios activos reportaron una reducción del 35% en el tiempo dedicado a la organización y un ahorro de 8 horas mensuales de estudio pasivo gracias a los resúmenes de la IA. Más del 60% de los usuarios mejoraron sus calificaciones y se sintieron mas confiados al usar los simulacros de parcial antes de los exámenes finales.",
    tech: ["React.js", "Gemini API", "Firebase (Auth/Firestore)", "Progressive Web App (PWA)", "Vite", "Tailwind CSS"],
    link: "https://estud-ia.com.ar"
  }
];

const MINOR_PROJECTS = [
  { id: 1, name: "Stechi Tours: Agencia de Viajes", url: "https://stechitours.com.ar" },
  { id: 2, name: "Lorena Calcopietro: Biodecodificación", url: "https://lorenacalcopietro.com.ar/" },
  { id: 3, name: "Del Olimpo: Agencia de Marketing", url: "https://www.delolimpo.com.ar/" },
  { id: 4, name: "Aime Translations: Traducciones Jurídicas", url: "https://aimetranslations.com.ar/" },
];

const ProjectsModule = () => {
  const [viewState, setViewState] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExploding, setIsExploding] = useState(false);

  const handleProjectClick = (project) => {
    playWoosh();
    setIsExploding(true);
    
    setTimeout(() => {
      setSelectedProject(project);
      setViewState('detail');
    }, 400); 

    setTimeout(() => {
      setIsExploding(false);
    }, 800);
  };

  const handleBackToGrid = () => {
    playFuturisticClick();
    setSelectedProject(null);
    setViewState('grid');
  };

  const handleShowMinorProjects = () => {
    playWoosh();
    setIsExploding(true);
    setTimeout(() => {
      setViewState('list');
    }, 400);
    setTimeout(() => {
      setIsExploding(false);
    }, 800);
  };

  return (
    <GlassPanel title="Experiencias y Proyectos" accent="cyan" className="panel-projects-module">
      <div className="projects-module-content">
        
        {isExploding && <ParticleExplosion />}

        {viewState === 'grid' && (
          <div className="dashboard-console animate-fade-in">
            {/* --- TELEMETRÍA SUPERIOR --- */}
            <div className="telemetry-top">
              <div className="tel-group">
                <span className="tel-label">SYS_CORE</span>
                <span className="tel-value blink-slow">ONLINE</span>
              </div>
              <div className="tel-group">
                <div className="tel-bars">
                  <div className="tel-bar"></div>
                  <div className="tel-bar"></div>
                  <div className="tel-bar"></div>
                  <div className="tel-bar"></div>
                  <div className="tel-bar"></div>
                  <div className="tel-bar"></div>
                  <div className="tel-bar"></div>
                </div>
              </div>
              <div className="tel-group text-right">
                <span className="tel-label">DATALINK</span>
                <span className="tel-value">104.2 TB/s</span>
              </div>
            </div>

            {/* --- ESCENARIO CENTRAL --- */}
            <div className="center-stage">
              <div className="projects-grid">
                {DUMMY_PROJECTS.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => handleProjectClick(project)} 
                  />
                ))}
              </div>
              <div className="more-projects-wrapper">
                <button className="view-more-btn" onClick={handleShowMinorProjects}>
                  <FaTools className="btn-icon" /> Ver más trabajos
                </button>
              </div>
            </div>

            {/* --- CONTROLES INFERIORES --- */}
            <div className="telemetry-bottom">
              <div className="scanner-container">
                <div className="scanner-line"></div>
              </div>
              <div className="bottom-interface">
                <div className="data-stream">MEM: 0x00A7F 0x1B82 0xFF99</div>
                <div className="bottom-buttons">
                  <div className="tel-btn"></div>
                  <div className="tel-btn active"></div>
                  <div className="tel-btn"></div>
                  <div className="tel-btn blink-fast"></div>
                  <div className="tel-btn"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewState === 'detail' && selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onBack={handleBackToGrid} 
          />
        )}

        {viewState === 'list' && (
          <div className="minor-projects-console animate-fade-in">
            <div className="detail-header">
              <button className="back-btn" onClick={handleBackToGrid}>
                <FaArrowLeft /> Volver a la Galería
              </button>
            </div>
            
            <div className="terminal-list-container">
              <div className="terminal-header">
                <h2 className="terminal-title"><FaLaptopCode className="term-icon"/> Más de mi experiencia</h2>
                <span className="terminal-status blink-fast">DATABANK_ACCESS_GRANTED</span>
              </div>
              
              <ul className="terminal-list">
                {MINOR_PROJECTS.map((mp, index) => (
                  <li key={mp.id} className="terminal-list-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="mp-name">
                      <span className="mp-prefix">&gt;</span> {mp.name}
                    </div>
                    <a href={mp.url} target="_blank" rel="noopener noreferrer" className="mp-link-btn">
                      Ver <FaExternalLinkAlt />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </GlassPanel>
  );
};

export default ProjectsModule;
