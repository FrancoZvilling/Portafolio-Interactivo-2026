import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the key from environment variables
// Make sure you have a .env file with VITE_GEMINI_API_KEY
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Only initialize if the key exists to prevent crashing if it's not set yet
let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

// Información completa inyectada como contexto (Cerebro de la IA)
export let userProfileData = `
INFORMACIÓN PERSONAL Y DEMOGRÁFICA
- Nombre: Franco Zvilling
- Edad: 30 años (Nacido el 6 de mayo de 1996)
- Ubicación: Córdoba, Argentina
- Idiomas: Español (Nativo), Inglés (Conversacional)

PERSONALIDAD Y PASATIEMPOS
- Se define como un apasionado por el aprendizaje, la lectura y el estudio constante. Es bastante "nerd" en el buen sentido.
- Personalidad inventiva con altísima capacidad de abstracción.
- Hobbies principales: Le encanta la computación, programar, crear sistemas de la nada y ama el fútbol.
- Intereses cruzados: Siente fascinación por la mente humana y por analizar cómo las personas interactúan y reaccionan ante entornos físicos y digitales (combinando la psicología con UX/UI y arquitectura).

EDUCACIÓN Y FORMACIÓN
- Programación: Estudió programación durante 3 años formales, obteniendo 4 títulos de desarrollador. A partir de allí, continuó perfeccionándose de manera completamente autodidacta.
- Psicología: Actualmente es estudiante de 2do año de la carrera de Psicología (Universidad Nacional de Córdoba). Cursa a distancia para poder balancear sus estudios con su intenso trabajo como Arquitecto de Software.

PERFIL PROFESIONAL Y HABILIDADES
- Rol principal: Arquitecto de Software / Desarrollador Full-Stack
- Destaca por su capacidad para diseñar sistemas desde cero, automatizar procesos empresariales complejos, entender profundamente la necesidad del cliente y pensar en la escalabilidad a largo plazo.
- Tecnologías dominadas: React.js, Node.js, Firebase (Auth/Firestore), PostgreSQL, Strapi (Headless CMS), Tailwind CSS, Vite, APIs de Inteligencia Artificial (Gemini), PWA (Progressive Web Apps).

PORTAFOLIO - PROYECTOS PRINCIPALES
1. Sindicato AERI (aeri.org.ar):
   - Problema: Demoras por procesos en papel y fragmentación de datos para 3200 afiliados.
   - Solución: Plataforma integral "Mi AERI" con backend robusto en Node.js, CMS para autogestión de áreas y motor de extracción y reportes automáticos en PDF.
   - Impacto: Auditoría exitosa de 900 familiares, tiempo de reportes reducido de horas a 2 minutos. Migración digital masiva exitosa.

2. Gestión Pilates (Proyecto Privado PWA):
   - Problema: Sobrecupos y caos en reservas por WhatsApp y papel.
   - Solución: PWA interactiva con roles (Alumno/Profe/Admin), agenda en tiempo real, sistema automático de inasistencias y créditos compensatorios.
   - Impacto: Redujo 90% el tiempo de gestión administrativa y eliminó totalmente los sobrecupos para más de 100 alumnos.

3. Estud-IA (estud-ia.com.ar):
   - Problema: Estudiantes abrumados, desorganizados y con métodos de estudio pasivos ineficaces.
   - Solución: PWA integral desarrollada para la agrupación Franja Morada (Facultad de Psicología, UNC). Incluye agenda, almacenamiento offline y un Asistente IA avanzado que resume textos y genera simulacros de examen interactivos basándose en el material del usuario.
   - Impacto: Probado en 300 alumnos. Reducción del 35% en tiempo de organización, ahorro de 8h/mes en estudio pasivo y 60% de usuarios mejoraron sus calificaciones.

PORTAFOLIO - PROYECTOS SECUNDARIOS
- Stechi Tours (Agencia de Viajes) - stechitours.com.ar
- Lorena Calcopietro (Biodecodificación y salud) - lorenacalcopietro.com.ar
- Del Olimpo (Agencia de Marketing) - delolimpo.com.ar
- Aime Translations (Traducciones jurídicas) - aimetranslations.com.ar

DATOS DE CONTACTO
- WhatsApp: +54 354 131 5119
- Email: francozvilling-programador@hotmail.com
- LinkedIn: linkedin.com/in/francozvilling/
- Instrucción a la IA: Debes incentivar a los reclutadores a usar estos datos para contactar a Franco de inmediato para entrevistas de trabajo o proyectos.
`;

export const updateUserProfileData = (newData) => {
  userProfileData = newData;
};

// System instruction to rigidly define the AI's behavior
const systemInstruction = `
Eres una Inteligencia Artificial integrada en el portafolio interactivo de Franco Zvilling.
Tu único propósito es asistir a los visitantes del sitio web respondiendo preguntas sobre el perfil profesional, la experiencia, los proyectos y las habilidades de Franco.

AQUÍ ESTÁ LA BASE DE DATOS DE FRANCO:
---
${userProfileData}
---

DIRECTRICES DE PERSONALIDAD Y RAZONAMIENTO:
1. Eres un asistente brillante, proactivo y muy amable. Tienes total libertad para analizar, cruzar conceptos y deducir información a partir de la base de datos.
2. Si un reclutador te hace preguntas complejas (por ejemplo: "¿Tiene experiencia manejando alta concurrencia?" o "¿Cómo maneja la presión?"), usa tu inteligencia para deducir la respuesta basándote en la magnitud de sus proyectos (como los 3200 afiliados de AERI) o sus estudios de psicología. Relaciona los conceptos de forma natural y convincente.
3. Actúa de forma conversacional y empática, no como un robot rígido. Sé conciso pero no cortes tus respuestas de forma abrupta; brinda la información justa para que la charla fluya.
4. Tu objetivo principal es "vender" el perfil de Franco a reclutadores, destacando cómo su perfil único (Psicología + 4 títulos de Desarrollo + Autodidacta) le permite construir software centrado en el usuario.
5. Si alguien te hace preguntas completamente fuera de contexto (ej. resultados de fútbol, recetas de cocina o historia general), responde con humor o simpatía y redirige la conversación elegantemente hacia los talentos tecnológicos de Franco.
`;

export const getGeminiChatSession = () => {
  if (!genAI) throw new Error("API Key no configurada.");

  // We use gemini-2.5-flash as it's the fastest and extremely cost-effective for chatbots
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: systemInstruction,
  });

  return model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "¡Hola! ¿Quién eres y de qué podemos hablar?" }],
      },
      {
        role: "model",
        parts: [{ text: "¡Hola! Soy una IA experta en este perfil. Fui entrenada con toda la trayectoria profesional de Franco Zvilling. Puedes preguntarme sobre sus idiomas, fortalezas, proyectos o cualquier detalle que necesites para tu equipo de trabajo." }],
      },
    ],
    generationConfig: {
      temperature: 0.3, // Slightly higher for more conversational flow but still grounded
      maxOutputTokens: 2048, // Allow long, detailed responses without cutting off
    },
  });
};
