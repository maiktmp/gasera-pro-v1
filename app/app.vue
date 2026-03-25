<template>
  <div class="font-inter antialiased min-h-screen bg-slate-50">
    <NuxtPage />
  </div>
</template>

<style>
/* Transitions for page routing */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
