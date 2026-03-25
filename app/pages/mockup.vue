<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header Hero Brochure -->
    <section class="relative h-[40vh] flex items-center justify-center overflow-hidden primary-gradient">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>
      
      <div class="z-10 text-center p-6">
        <NuxtLink to="/" class="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4 font-bold text-xs uppercase tracking-[0.2em]">
          <i class="pi pi-arrow-left mr-2"></i> Regresar al Inicio
        </NuxtLink>
        <h1 class="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
          Gasera <span class="text-red-200">Pro</span>
        </h1>
        <p class="text-white/90 font-medium italic max-w-xs mx-auto text-sm">
          La revolución digital en el suministro de gas LP para el sector residencial y comercial.
        </p>
      </div>
    </section>

    <!-- Brochure Sections -->
    <div class="max-w-5xl mx-auto -mt-12 p-6 space-y-8 relative z-20">
      
      <!-- Section 1: El Problema vs La Solución -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="glass-card p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl">
          <div class="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
            <i class="pi pi-whatsapp text-red-600 text-xl font-bold"></i>
          </div>
          <h2 class="text-2xl font-black italic text-slate-900 uppercase mb-4 leading-tight">Surtido vía <br><span class="text-red-600">WhatsApp AI</span></h2>
          <p class="text-slate-500 font-medium text-sm leading-relaxed">
            Olvídate de las llamadas perdidas. Nuestro chatbot inteligente procesa pedidos automáticos, geolocaliza al cliente y confirma la entrega en segundos.
          </p>
        </div>

        <div class="glass-card p-8 rounded-[2.5rem] bg-slate-900 border-none shadow-xl">
          <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <i class="pi pi-map-marker text-white text-xl"></i>
          </div>
          <h2 class="text-2xl font-black italic text-white uppercase mb-4 leading-tight">Logística <br><span class="text-blue-400">En Tiempo Real</span></h2>
          <p class="text-slate-300 font-medium text-sm leading-relaxed italic opacity-90">
            Visualiza la ruta exacta de tus pipas y camiones repartidores. Optimiza tiempos de entrega y reduce costos operativos con rutas inteligentes.
          </p>
        </div>
      </section>

      <!-- Section 2: Beneficios Clave -->
      <section class="p-10 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100">
        <h3 class="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-8 text-center">Beneficios Exclusivos</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="text-center">
            <div class="text-3xl font-black text-slate-900 mb-2">+45%</div>
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Eficiencia Operativa</div>
            <p class="text-slate-500 text-xs font-medium">Digitalización total del flujo de pedidos y despacho.</p>
          </div>
          
          <div class="text-center">
            <div class="text-3xl font-black text-slate-900 mb-2">ZERO</div>
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Errores de Captura</div>
            <p class="text-slate-500 text-xs font-medium">Integración directa entre el chat del cliente y tu panel.</p>
          </div>

          <div class="text-center">
            <div class="text-3xl font-black text-slate-900 mb-2">24/7</div>
            <div class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Disponibilidad</div>
            <p class="text-slate-500 text-xs font-medium">Tus clientes pueden pedir gas en cualquier momento.</p>
          </div>
        </div>
      </section>

      <!-- Section 3: Seguridad -->
      <section class="relative overflow-hidden rounded-[2.5rem] secondary-gradient p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-blue-100">
        <div class="absolute top-0 right-0 p-10 opacity-10">
          <i class="pi pi-shield text-[12rem] text-white"></i>
        </div>
        <div class="flex-grow z-10">
          <h2 class="text-3xl font-black italic text-white uppercase mb-4">Seguridad y <span class="text-blue-200">Confianza</span></h2>
          <ul class="space-y-3">
            <li class="flex items-center gap-3 text-sm font-bold text-white/90">
              <i class="pi pi-check-circle text-blue-300"></i> Verificación de litros exactos.
            </li>
            <li class="flex items-center gap-3 text-sm font-bold text-white/90">
              <i class="pi pi-check-circle text-blue-300"></i> Historial de servicios por domicilio.
            </li>
            <li class="flex items-center gap-3 text-sm font-bold text-white/90">
              <i class="pi pi-check-circle text-blue-300"></i> Alertas de fugas y mantenimiento.
            </li>
          </ul>
        </div>
        <div class="z-10">
          <Button label="Solicitar Demo" class="!rounded-2xl !px-10 !py-4 !bg-white !text-blue-600 !font-black !border-none !shadow-xl hover:!scale-105 transition-transform" />
        </div>
      </section>

      <!-- Footer Brochure -->
      <footer class="text-center pb-12">
        <div class="w-12 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
        <p class="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Gasera Pro v2.0 | Digital Solutions</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style scoped>
.primary-gradient {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
}
.secondary-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
}
</style>
