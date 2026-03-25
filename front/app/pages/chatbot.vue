<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <!-- Triptych Header -->
    <header class="max-w-4xl mx-auto mb-12">
      <NuxtLink to="/" class="inline-flex items-center text-slate-400 hover:text-red-600 transition-colors mb-6 font-bold text-[10px] uppercase tracking-[0.2em]">
        <i class="pi pi-arrow-left mr-2"></i> Volver al Inicio
      </NuxtLink>
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-4xl md:text-5xl font-black italic text-slate-900 uppercase tracking-tighter leading-none mb-3">
            Tu WhatsApp, <span class="text-red-600">En Autopiloto</span>
          </h1>
          <p class="text-slate-500 font-medium italic max-w-sm">Vende gas 24/7 sin mover un dedo. Mira cómo Gasera Pro atiende a tus clientes por ti.</p>
        </div>
        <div class="flex gap-2">
           <div class="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
             <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Demo Interactiva
           </div>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Panel 1: Inteligencia (Aparece primero en mobile) -->
      <div class="lg:col-span-4 space-y-6">
        <div class="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div class="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-100">
            <i class="pi pi-whatsapp text-white text-xl font-bold"></i>
          </div>
          <h2 class="text-2xl font-black italic text-slate-900 uppercase mb-4 leading-tight">Libera a tu <br><span class="text-red-600">Equipo</span></h2>
          
          <!-- Texto con énfasis -->
          <div class="bg-red-50 p-6 rounded-3xl border-l-4 border-red-600 mb-6">
            <p class="text-slate-800 font-bold text-sm leading-relaxed italic">
              "Olvídate de contestar las mismas dudas mil veces. Nuestra IA cierra pedidos, confirma direcciones y da precios al instante, con la amabilidad de tu mejor vendedor."
            </p>
          </div>

          <p class="text-slate-500 font-medium text-xs leading-relaxed mb-6">
            Transforma tu WhatsApp de un canal de soporte lento a una máquina de ventas automatizada que nunca descansa.
          </p>
          
          <ul class="space-y-3">
             <li class="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500">
                <i class="pi pi-check-circle text-emerald-500 text-sm"></i> Ventas mientras duermes
             </li>
             <li class="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500">
                <i class="pi pi-check-circle text-emerald-500 text-sm"></i> Experiencia 100% Fluida
             </li>
             <li class="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500">
                <i class="pi pi-check-circle text-emerald-500 text-sm"></i> Cero errores de captura
             </li>
          </ul>
        </div>

        <div class="p-8 bg-slate-900 rounded-[2.5rem] text-white">
          <h2 class="text-xl font-black italic uppercase mb-4 leading-tight text-blue-400">Escalabilidad <br>Ilimitada</h2>
          <p class="text-slate-400 font-medium text-xs leading-relaxed">
            Atiende a cientos de clientes al mismo tiempo con la misma calidad. Sin necesidad de contratar más personal para turnos nocturnos o fines de semana.
          </p>
        </div>
      </div>

      <!-- Panel 2: Simulador Chat Real -->
      <div class="lg:col-span-8">
        <div class="bg-slate-200 p-2 rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-white">
          <div class="bg-white h-[600px] flex flex-col">
            <!-- Chat Internal Header -->
            <div class="bg-emerald-600 p-4 flex items-center gap-3 text-white">
               <Avatar icon="pi pi-bolt" shape="circle" class="!bg-white/20" />
               <div>
                 <p class="text-sm font-black italic uppercase tracking-tight">Tu Negocio - IA Demo</p>
                 <p class="text-[9px] font-bold opacity-80 uppercase tracking-widest leading-none">Simulación de WhatsApp Real</p>
               </div>
            </div>

            <!-- Messages Area -->
            <div id="chat-container" class="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
              <div v-for="(msg, index) in messages" :key="index" :class="['flex w-full', msg.sender === 'bot' ? 'justify-start' : 'justify-end']">
                <div :class="['max-w-[85%] p-4 rounded-3xl text-xs font-bold shadow-sm', msg.sender === 'bot' ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' : 'bg-red-600 text-white rounded-tr-none']">
                  <p class="whitespace-pre-wrap">{{ msg.text }}</p>
                  <span class="text-[8px] block mt-1 opacity-50 uppercase tracking-tighter">{{ msg.time }}</span>
                </div>
              </div>
              <!-- Loading Indicator -->
              <div v-if="isLoading" class="flex justify-start">
                <div class="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                  <span class="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span class="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span class="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 bg-white border-t border-slate-100 flex gap-2">
              <InputText v-model="userInput" :disabled="isLoading" placeholder="Escribe un mensaje..." class="flex-grow !rounded-2xl !bg-slate-50 !border-none !text-xs !py-4" @keyup.enter="sendMessage" />
              <Button icon="pi pi-send" :loading="isLoading" @click="sendMessage" class="!rounded-2xl !w-12 !h-12 !bg-emerald-600 !border-none" />
            </div>
          </div>
          
          <div class="absolute top-4 right-4 bg-emerald-600/10 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-emerald-600 uppercase tracking-widest italic border border-emerald-600/20">
            Pruébalo ahora
          </div>
        </div>
        <p class="text-center mt-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] italic">¿Listo para modernizarte? Este es el futuro de tu negocio.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';

const { $track } = useNuxtApp();
const userInput = ref('');
const isLoading = ref(false);
const messages = ref([
  { sender: 'bot', text: '¡Hola! Bienvenido a Gasera Pro. 🔥\n\nSoy tu asistente virtual listo para atenderte. Te comento que el precio de hoy es de $11.20 MXN por litro. 🚛💨\n\n¿En qué puedo apoyarte hoy? ¿Deseas pedir gas a domicilio?', time: 'AHORA' },
]);

const scrollToBottom = async () => {
  await nextTick();
  const container = document.getElementById('chat-container');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  const text = userInput.value;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messages.value.push({ sender: 'user', text, time });
  userInput.value = '';
  isLoading.value = true;
  await scrollToBottom();

  $track('Chatbot Message Sent', { textLength: text.length });

  try {
    const chatMessages = messages.value.map(m => ({
      role: m.sender === 'bot' ? 'assistant' : 'user',
      content: m.text
    }));

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: chatMessages
      })
    });

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    const botText = data.choices[0].message.content;
    
    messages.value.push({ sender: 'bot', text: botText, time: 'AHORA' });
  } catch (error) {
    console.error("Error connecting to Chat API:", error);
    messages.value.push({ 
      sender: 'bot', 
      text: "¡Ups! Tuve un pequeño contratiempo en la línea. 🏗️ ¿Podrías intentar enviarme tu mensaje de nuevo, por favor?", 
      time: 'AHORA' 
    });
  } finally {
    isLoading.value = false;
    await scrollToBottom();
  }
};

onMounted(() => {
  $track('Chatbot Page Viewed');
});
</script>

<style scoped>
#chat-container::-webkit-scrollbar {
  width: 4px;
}
#chat-container::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
