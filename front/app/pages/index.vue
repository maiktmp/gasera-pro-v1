<script setup>
import Button from 'primevue/button';
const { $track } = useNuxtApp();

// Función auxiliar para registrar clics
const trackClick = (destination) => {
  $track('Home Link Clicked', { destination });
};

onMounted(() => {
  $track('Home Page Viewed', { timestamp: new Date().toISOString() });
});
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
    <!-- Abstract Background shapes -->
    <div class="absolute -top-24 -left-24 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50"></div>
    <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

    <div class="w-full max-w-md z-10 text-center">
      <div class="flex flex-col items-center mb-10">
        <div class="w-20 h-20 bg-red-600 rounded-[2.5rem] flex items-center justify-center shadow-lg shadow-red-200 mb-6">
          <i class="pi pi-bolt text-4xl text-white"></i>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Gasera Pro</h1>
        <p class="text-slate-500 font-medium">Solución de gestión inteligente para surtido de gas vía WhatsApp.</p>
      </div>

      <div class="space-y-4">
        <NuxtLink to="/mockup" class="w-full block" @click="trackClick('Folleto Digital')">
          <Button label="Folleto Digital" icon="pi pi-book" class="w-full !rounded-3xl !py-6 !text-lg !font-bold !bg-red-600 !border-none !shadow-xl !shadow-red-200 hover:!scale-[1.02] active:!scale-95 transition-all" />
        </NuxtLink>

        <NuxtLink to="/admin" class="w-full block" @click="trackClick('Panel Administrativo')">
          <Button label="Panel Administrativo" icon="pi pi-chart-bar" severity="info" class="w-full !rounded-3xl !py-6 !text-lg !font-bold !bg-blue-600 !border-none !shadow-xl !shadow-blue-200 hover:!scale-[1.02] active:!scale-95 transition-all" />
        </NuxtLink>

        <NuxtLink to="/chatbot" class="w-full block" @click="trackClick('Simulación Chatbot')">
          <Button label="Simulación Chatbot" icon="pi pi-whatsapp" severity="success" class="w-full !rounded-3xl !py-6 !text-lg !font-bold !bg-emerald-600 !border-none !shadow-xl !shadow-emerald-200 hover:!scale-[1.02] active:!scale-95 transition-all" />
        </NuxtLink>
      </div>

      <p class="mt-12 text-xs text-slate-400 font-bold tracking-widest uppercase">
        © 2026 Gasera S.A. de C.V. | Prototipo Mobile
      </p>
    </div>
  </div>
</template>
