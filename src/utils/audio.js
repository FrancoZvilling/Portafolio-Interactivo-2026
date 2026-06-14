let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playFuturisticClick = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch (err) {
    console.error("Audio error", err);
  }
};

export const playAdvanceSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine'; // Tono limpio y mágico
      osc.frequency.value = freq;
      
      // Envolvente de volumen (ataque rápido, decaimiento suave)
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // Arpegio ascendente mágico (Do mayor: Do, Mi, Sol, Do agudo)
    playNote(523.25, now, 0.4);
    playNote(659.25, now + 0.08, 0.4);
    playNote(783.99, now + 0.16, 0.4);
    playNote(1046.50, now + 0.24, 0.8);
    
  } catch (err) {
    console.error("Audio error", err);
  }
};

export const playWoosh = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    
    // Frecuencia que cae rápidamente para el swoosh
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (err) {
    console.error("Audio error", err);
  }
};

let ambientGainNode = null;
let isAmbientMuted = false;

export const startAmbientHum = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return () => {};

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    
    // Frecuencias bajas para un zumbido profundo (motor espacial)
    osc1.frequency.value = 65; // Do bajo
    osc2.frequency.value = 66; // Ligeramente desafinado para crear un efecto de "latido"
    
    osc1.type = 'triangle';
    osc2.type = 'triangle';

    // Filtro para "apagar" el sonido y que parezca de fondo/ambiente
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 150; 

    ambientGainNode = ctx.createGain();
    // Volumen INICIAL en 0 para hacer un fade-in suave
    ambientGainNode.gain.setValueAtTime(0, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(ambientGainNode);
    ambientGainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    // Subir el volumen suavemente si no está muteado
    if (!isAmbientMuted) {
      ambientGainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 3);
    }

    // Retorna una función para detener el sonido suavemente si el componente se desmonta
    return () => {
      try {
        if (ambientGainNode) {
          ambientGainNode.gain.cancelScheduledValues(ctx.currentTime);
          ambientGainNode.gain.setValueAtTime(ambientGainNode.gain.value, ctx.currentTime);
          ambientGainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
        }
        setTimeout(() => {
          osc1.stop();
          osc2.stop();
          osc1.disconnect();
          osc2.disconnect();
          ambientGainNode = null;
        }, 1000);
      } catch (e) {}
    };
  } catch (err) {
    console.error("Ambient audio error", err);
    return () => {};
  }
};

export const toggleAmbientMute = () => {
  isAmbientMuted = !isAmbientMuted;
  if (!ambientGainNode) return isAmbientMuted;
  
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Limpiar cualquier transición pendiente
  ambientGainNode.gain.cancelScheduledValues(now);
  
  if (isAmbientMuted) {
    // Apagar volumen instantáneamente
    ambientGainNode.gain.value = 0;
  } else {
    // Prender volumen instantáneamente
    ambientGainNode.gain.value = 0.03;
  }
  return isAmbientMuted;
};
