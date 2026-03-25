export default defineEventHandler((event) => {
  const method = event.method;
  const url = getRequestURL(event);
  const userAgent = getHeader(event, 'user-agent');
  const timestamp = new Date().toISOString();
  
  // Capturamos la IP del usuario
  // Nitro maneja automáticamente headers como x-forwarded-for si estás tras un proxy (Vercel/Cloudflare)
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'IP Desconocida';

  console.log(`[LOG] ${timestamp} | IP: ${clientIp} | ${method} ${url.pathname} | UA: ${userAgent}`);
});
