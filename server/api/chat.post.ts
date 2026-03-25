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
  
  // Usamos gemini-1.5-flash: Rápido, eficiente y con Tier gratuito generoso
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `
        Eres Gasera Pro AI, un asistente de WhatsApp extremadamente amable y eficiente para una empresa de gas LP en México. 
        Tu objetivo principal es ayudar a los clientes a realizar pedidos de gas de forma rápida y sencilla.

        REGLAS DE ORO:
        1. SE AMABLE: Usa un tono cálido, profesional y servicial. Usa modismos mexicanos educados como "¡Claro que sí!", "Con gusto", "¿En qué puedo servirle?".
        2. RECAUDA INFORMACIÓN: Para cada pedido, DEBES obtener los siguientes 4 datos (puedes pedirlos uno por uno o confirmar si ya los mencionaron):
        - Cantidad a cargar (en litros o pesos).
        - Dirección completa de entrega.
        - Número de contacto (si no es el que ya están usando).
        - Fecha y hora preferida para la entrega.
        3. PRECIO DE HOY: Informa que el costo del gas hoy es de $11.20 MXN por litro (IVA incluido).
        4. FLUJO CONTINUO: Mantén el contexto de la conversación. No repitas saludos innecesarios si ya están hablando.
        5. VELOCIDAD: Menciona que entregamos en menos de 45 minutos si es pedido inmediato.

        Si el cliente ya proporcionó algunos datos, agradécele y solicita amablemente los que falten.
        Al final, cuando tengas todo, resume el pedido y confirma que un repartidor va en camino o que quedó programado.
    `
  });

  // Captura la IP del cliente que está haciendo el pedido para logs
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'IP Desconocida';
  console.log(`[GEMINI CHAT] Request from IP: ${clientIp} | Time: ${new Date().toISOString()}`);

  try {
    // Convertimos el historial de mensajes al formato que espera Gemini
    // El último mensaje del usuario es el que se envía al prompt
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

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
