export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const messages = body.messages || [];

  // Obtenemos la clave de forma segura desde runtimeConfig
  // En producción (Dockploy), puedes configurar NUXT_OPENROUTER_API_KEY como variable de entorno
  const OPENROUTER_API_KEY = config.openrouterApiKey;

  const systemPrompt = `
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
  `;

  // Captura la IP del cliente que está haciendo el pedido
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'IP Desconocida';
  console.log(`[CHAT REQUEST] IP: ${clientIp} | Timestamp: ${new Date().toISOString()}`);

  try {
    const response = await $fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://gasera-pro.com", // Optional, for OpenRouter analytics
        "X-Title": "Gasera Pro App"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-001", // Using a fast, reliable model
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ]
      })
    });

    return response;
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error al conectar con el servicio de IA."
    });
  }
});
