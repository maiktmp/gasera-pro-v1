# Changelog - Gasera Pro

## [1.1.0] - 2026-03-25

### Mejoras en el Chatbot (IA)
- **Integración Segura**: Implementación de un endpoint de servidor (`/api/chat`) para conectar con OpenRouter sin exponer la API Key en el cliente.
- **Personalidad de Ventas**: Refinamiento del System Prompt para que la IA sea amable, use modismos mexicanos y se enfoque en cerrar pedidos.
- **Recolección de Datos**: La IA ahora solicita activamente dirección, cantidad de gas, número de contacto y horario de entrega.
- **Precios en Tiempo Real**: El bot informa automáticamente el precio actual del gas ($11.20 MXN).

### Marketing y UX
- **Copia de Conversión**: Rediseño completo de los textos en la página del chatbot con un enfoque de marketing ("WhatsApp en Autopiloto", "Libera a tu equipo").
- **Responsive Design**: Ajuste del orden visual en móviles; ahora los beneficios de negocio aparecen antes que el simulador de chat.
- **Énfasis Visual**: Resaltado de propuestas de valor clave con estilos visuales potentes.

### Analítica y Auditoría
- **Logs de Servidor**: Registro automático de cada petición HTTP incluyendo la IP del usuario para auditoría y seguridad.
- **Tracking de Eventos**: Implementación de un plugin de analítica personalizada para registrar PageViews y clics en botones estratégicos.
- **Monitoreo de Chat**: Registro de eventos cada vez que un usuario interactúa con la IA.

## [1.0.0] - 2026-03-25
- Lanzamiento inicial del prototipo Gasera Pro con Nuxt 4, PrimeVue y Tailwind CSS.
