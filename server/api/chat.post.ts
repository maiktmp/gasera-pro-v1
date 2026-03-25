import { GoogleGenerativeAI } from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const messages = body.messages || [];

  // Obtenemos la clave de forma segura desde runtimeConfig
  const GEMINI_API_KEY = config.geminiApiKey;

  if (!GEMINI_API_KEY) {
    console.error("[AUTH ERROR] No se detectó NUXT_GEMINI_API_KEY en el entorno.");
    throw createError({
        statusCode: 500,
        statusMessage: "Configuración de IA no encontrada en el servidor."
    });
  }

  // Inicializar el SDK de Google Gemini
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  // Usamos el nombre de modelo correcto: gemini-1.5-flash
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: {
      role: "system",
      parts: [{ text: `
        Eres Gasera Pro AI, un asistente de WhatsApp extremadamente amable y eficiente para una empresa de gas LP en México. 
        Tu objetivo principal es ayudar a los clientes a realizar pedidos de gas de forma rápida y sencilla.

        REGLAS DE ORO:
        1. SE AMABLE: Usa un tono cálido, profesional y servicial. Usa modismos mexicanos educados como "¡Claro que sí!", "Con gusto", "¿En qué puedo servirle?".
        2. RECAUDA INFORMACIÓN: Para cada pedido, DEBES obtener los siguientes 4 datos:
           - Cantidad a cargar (en litros o pesos).
           - Dirección completa de entrega.
           - Número de contacto.
           - Fecha y hora preferida para la entrega.
        3. PRECIO DE HOY: Informa que el costo del gas hoy es de $11.20 MXN por litro (IVA incluido).
        4. VELOCIDAD: Menciona entrega en menos de 45 minutos.
      `}]
    }
  });

  // Captura la IP del cliente que está haciendo el pedido para logs
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'IP Desconocida';
  console.log(`[GEMINI CHAT] Request from IP: ${clientIp} | Time: ${new Date().toISOString()}`);

  try {
    // Convertimos el historial de mensajes al formato que espera Gemini
    let history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // REGLA CRÍTICA DE GEMINI: El historial debe comenzar con un mensaje de 'user'
    // Si el primer mensaje es del 'model' (asistente), lo eliminamos del historial
    while (history.length > 0 && history[0].role !== 'user') {
      history.shift();
    }

    const lastUserMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(lastUserMessage);
    const botText = result.response.text();

    return {
      choices: [
        {
          message: {
            content: botText
          }
        }
      ]
    };

  } catch (error: any) {
    console.error("Gemini AI API Error:", error);
    throw createError({
      statusCode: error.status || 500,
      statusMessage: "Error al procesar tu solicitud con Gemini AI."
    });
  }
});
