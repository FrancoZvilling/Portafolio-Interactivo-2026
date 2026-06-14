import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './AIChatShell.css';
import { FaRobot, FaSun, FaMoon, FaPaperPlane } from 'react-icons/fa';
import { getGeminiChatSession } from '../services/gemini';

const AIChatShell = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  
  const chatSessionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial greeting
    setMessages([
      { role: 'system', text: 'Conexión establecida. Iniciando interfaz de soporte...' },
      { role: 'assistant', text: '¡Hola! Soy una IA experta en este perfil. Fui entrenada con toda la trayectoria profesional de Franco Zvilling. Puedes preguntarme sobre sus idiomas, fortalezas, proyectos o cualquier detalle que necesites para tu equipo de trabajo.' }
    ]);

    // Initialize Gemini Chat Session
    try {
      chatSessionRef.current = getGeminiChatSession();
    } catch (err) {
      console.error(err);
      setErrorState(true);
      setMessages(prev => [
        ...prev,
        { role: 'system', text: '⚠️ Módulo AI desconectado. Falta configurar VITE_GEMINI_API_KEY en el entorno.' }
      ]);
    }
  }, []);

  // Auto-scroll to bottom safely
  useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        // Direct scroll manipulation prevents full-page layout shifts 
        // that smooth scrolling sometimes causes on nested flex layouts.
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || errorState) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage(userMessage);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (err) {
      console.error("Error communicating with Gemini:", err);
      setMessages(prev => [...prev, { role: 'system', text: '⚠️ Error de comunicación. Intenta nuevamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`ai-chat-shell ${isLightMode ? 'light-mode' : ''}`}>
      <div className="ai-header">
        <div className={`ai-status-indicator ${errorState ? 'error' : ''}`}></div>
        <div className="ai-title">
          <FaRobot className="ai-icon" />
          <span>Chat Inteligente {errorState ? '(OFFLINE)' : ''}</span>
        </div>
      </div>
      
      <div className="ai-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-message ${msg.role}`}>
            {msg.role === 'system' ? (
              msg.text
            ) : (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="ai-message assistant typing-indicator">
            Procesando datos<span>.</span><span>.</span><span>.</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-input-area">
        <input 
          type="text" 
          className="ai-input-field" 
          placeholder={errorState ? "AI Desconectada..." : "Escribe tu pregunta..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading || errorState}
        />
        <button className="ai-btn" title="Enviar" onClick={handleSend} disabled={isLoading || errorState || !input.trim()}>
          <FaPaperPlane />
        </button>
        <button className="ai-btn" onClick={() => setIsLightMode(!isLightMode)} title="Modo Claro/Oscuro">
          {isLightMode ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </div>
  );
};

export default AIChatShell;
