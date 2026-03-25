<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <!-- Navbar Superior -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-4 h-16 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="flex items-center gap-2 p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
          <i class="pi pi-arrow-left text-slate-600 text-sm"></i>
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-600 pr-1">Volver</span>
        </NuxtLink>
        <div class="h-8 w-px bg-slate-100"></div>
        <div class="flex flex-col">
          <h1 class="font-black italic text-slate-900 text-lg leading-none uppercase tracking-tighter">Gasera Pro</h1>
          <span class="text-[9px] font-bold text-red-600 uppercase tracking-widest mt-1">Admin Panel</span>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <Button icon="pi pi-bars" text rounded class="!text-slate-900 !w-10 !h-10 hover:!bg-slate-100" @click="visible = true" />
      </div>
    </header>

    <!-- Panel Lateral (Drawer) -->
    <Drawer v-model:visible="visible" header="Gasera Navigation" class="!w-72 !rounded-r-[2rem]">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <i class="pi pi-bolt text-white text-sm"></i>
          </div>
          <span class="font-black italic uppercase tracking-tighter">Menú Principal</span>
        </div>
      </template>
      
      <div class="flex flex-col gap-2 mt-4">
        <Button v-for="item in menuItems" :key="item.label" :label="item.label" :icon="item.icon" text :class="['!justify-start !rounded-2xl !py-4 !px-4 !font-bold', item.active ? '!bg-red-50 !text-red-600' : '!text-slate-500 hover:!bg-slate-50']" @click="visible = false" />
      </div>

      <template #footer>
        <div class="p-4 border-t border-slate-100">
          <Button label="Cerrar Sesión" icon="pi pi-power-off" severity="danger" text class="w-full !justify-start !rounded-2xl !font-bold" />
        </div>
      </template>
    </Drawer>

    <main class="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
      <!-- Buscador Mejorado -->
      <div class="mb-8 group">
        <div class="relative flex items-center">
          <i class="pi pi-search absolute left-5 text-slate-400 group-focus-within:text-red-600 transition-colors z-10"></i>
          <InputText v-model="searchQuery" placeholder="Buscar por nombre, teléfono o domicilio..." 
            class="w-full !pl-14 !pr-6 !py-5 !rounded-[2rem] !bg-white !border-none !shadow-xl !shadow-slate-200/50 !text-slate-700 !font-medium placeholder:text-slate-400 focus:!ring-2 focus:!ring-red-100 transition-all" />
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div class="p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col items-center text-center">
          <div class="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-3">
            <i class="pi pi-clock text-red-600"></i>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">En Espera</span>
          <div class="text-2xl font-black italic text-slate-900 leading-none">12</div>
        </div>
        <div class="p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col items-center text-center">
          <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
            <i class="pi pi-filter text-blue-600"></i>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Litros Hoy</span>
          <div class="text-2xl font-black italic text-slate-900 leading-none">4,250</div>
        </div>
        <div class="p-5 bg-slate-900 rounded-[2rem] shadow-sm flex flex-col items-center text-center col-span-2 md:col-span-1">
          <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3">
            <i class="pi pi-dollar text-emerald-400"></i>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1 italic">Ventas Hoy</span>
          <div class="text-2xl font-black italic text-white leading-none">$12,400</div>
        </div>
      </div>

      <!-- Customer List Section -->
      <div class="flex items-center justify-between mb-6 px-2">
        <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic">Seguimiento de Clientes</h2>
      </div>

      <div class="space-y-4">
        <div v-for="client in clients" :key="client.id" 
          @click="selectClient(client)"
          class="glass-card p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm flex items-center justify-between active:scale-95 transition-all cursor-pointer">
          <div class="flex items-center gap-4">
            <Avatar :label="client.name.charAt(0)" shape="circle" class="!font-black !italic !bg-slate-100 !text-slate-600" size="large" />
            <div>
              <h3 class="font-black italic text-slate-900 text-lg leading-none mb-1">{{ client.name }}</h3>
              <div class="flex items-center gap-2">
                 <i class="pi pi-phone text-[10px] text-slate-400"></i>
                 <p class="text-[11px] text-slate-500 font-bold tracking-tight">{{ client.phone }}</p>
              </div>
            </div>
          </div>
          <i class="pi pi-chevron-right text-slate-300"></i>
        </div>
      </div>

      <!-- Modal Detalle Cliente -->
      <Dialog v-model:visible="showModal" modal header="Detalle de Cliente" :style="{ width: '90vw', maxWidth: '450px' }" class="!rounded-[2.5rem] !p-0 !overflow-hidden">
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-100">
              <i class="pi pi-user text-white"></i>
            </div>
            <div>
              <h2 class="font-black italic text-slate-900 text-xl tracking-tighter uppercase">{{ selectedClient?.name }}</h2>
              <p class="text-[10px] font-bold text-red-600 uppercase tracking-widest italic leading-none">Historial de Servicio</p>
            </div>
          </div>
        </template>

        <div class="p-6 space-y-6">
          <!-- Dirección -->
          <div class="bg-slate-50 p-5 rounded-3xl border border-slate-100">
            <div class="flex items-center gap-2 mb-3">
              <i class="pi pi-map-marker text-red-600 font-bold"></i>
              <span class="text-xs font-black uppercase tracking-widest text-slate-400 italic">Dirección de Envío</span>
            </div>
            <p class="text-sm font-bold text-slate-700 leading-relaxed">{{ selectedClient?.address }}</p>
          </div>

          <!-- Historial de Cargas -->
          <div>
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2 italic">Últimas Cargas de Gas</h3>
            <div class="space-y-3">
              <div v-for="(refill, i) in selectedClient?.recentRefills" :key="i" class="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <i class="pi pi-calendar text-blue-600 text-xs"></i>
                  </div>
                  <span class="text-sm font-bold text-slate-600">{{ refill.date }}</span>
                </div>
                <span class="font-black italic text-slate-900">${{ refill.amount }}</span>
              </div>
            </div>
          </div>

          <!-- Botón WhatsApp -->
          <Button label="Contactar por WhatsApp" icon="pi pi-whatsapp" severity="success" 
            class="w-full !rounded-2xl !py-5 !text-lg !font-black !bg-emerald-600 !border-none !shadow-xl !shadow-emerald-100 active:!scale-95 transition-all" />
        </div>
      </Dialog>

      <!-- Floating Action Button -->
      <Button icon="pi pi-plus" class="!fixed !bottom-8 !right-8 !w-16 !h-16 !rounded-[1.5rem] !bg-red-600 !border-none !shadow-2xl !shadow-red-200 z-30" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Drawer from 'primevue/drawer';
import Dialog from 'primevue/dialog';

const visible = ref(false);
const showModal = ref(false);
const searchQuery = ref('');
const selectedClient = ref(null);

const selectClient = (client) => {
  selectedClient.value = client;
  showModal.value = true;
};

const menuItems = [
  { label: 'Dashboard', icon: 'pi pi-home', active: true },
  { label: 'Clientes', icon: 'pi pi-users', active: false },
  { label: 'Rutas y Logística', icon: 'pi pi-map', active: false },
  { label: 'Reportes Ventas', icon: 'pi pi-chart-line', active: false },
];

const clients = [
  { 
    id: 1, 
    name: 'Marcos Colin', 
    phone: '55 1234 5678', 
    lastService: 'Hace 3 días', 
    status: 'normal',
    address: 'Av. Paseo de la Reforma 222, Int 402, Ciudad de México, CP 06600',
    recentRefills: [
      { date: '12 Mar 2026', amount: '850.00' },
      { date: '01 Feb 2026', amount: '920.00' },
      { date: '15 Dic 2025', amount: '780.00' }
    ]
  },
  { 
    id: 2, 
    name: 'Elena Rodriguez', 
    phone: '55 9876 5432', 
    lastService: 'Hace 28 días', 
    status: 'urgent',
    address: 'Calle de los Pinos 45, Col. Lomas de Chapultepec, Miguel Hidalgo, 11000',
    recentRefills: [
      { date: '25 Feb 2026', amount: '1,200.00' },
      { date: '10 Ene 2026', amount: '1,150.00' }
    ]
  },
  { 
    id: 3, 
    name: 'Pueblo Viejo Rest.', 
    phone: '55 4567 8901', 
    lastService: 'Hoy 10:30 AM', 
    status: 'normal',
    address: 'Gourmet St. 101, Zona Hotelera, Quintana Roo, 77500',
    recentRefills: [
      { date: '24 Mar 2026', amount: '2,450.00' },
      { date: '17 Mar 2026', amount: '2,300.00' },
      { date: '10 Mar 2026', amount: '2,500.00' }
    ]
  },
  { 
    id: 4, 
    name: 'Residencial Aurea', 
    phone: '55 5566 7788', 
    lastService: 'Hace 30 días', 
    status: 'urgent',
    address: 'Privada del Sol, Torre B, Piso 12, Santa Fe, 05348',
    recentRefills: [
      { date: '22 Feb 2026', amount: '3,800.00' }
    ]
  },
];
</script>

<style scoped>
.glass-card {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
:deep(.p-dialog-header) {
  padding: 1.5rem !important;
  border-bottom: 1px solid #f1f5f9;
}
:deep(.p-dialog-content) {
  padding: 0 !important;
}
</style>
