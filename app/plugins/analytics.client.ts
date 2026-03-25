export default defineNuxtPlugin((nuxtApp) => {
  // Solo se ejecuta en el navegador (client-side)
  if (process.client) {
    const route = useRoute();

    // 1. Registro automático de visitas a páginas
    watch(() => route.path, (newPath) => {
      console.info(`[Analytics] PageView: ${newPath} - ${new Date().toLocaleTimeString()}`);
      // Aquí podrías llamar a una API externa de analítica como PostHog o Google Analytics
    }, { immediate: true });

    // 2. Función global para registrar eventos personalizados (clics, conversiones)
    return {
      provide: {
        track: (eventName: string, properties: any = {}) => {
          const timestamp = new Date().toISOString();
          console.log(`[Analytics Event] "${eventName}" at ${timestamp}`, properties);
          
          // En un sistema real, aquí enviarías un POST a tu servidor de analítica
        }
      }
    };
  }
});
