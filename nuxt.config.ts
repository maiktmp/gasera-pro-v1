import { GaseraTheme } from './theme.config';

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  runtimeConfig: {
    // Estas variables solo están disponibles en el servidor
    openrouterApiKey: process.env.OPENROUTER_API_KEY || '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',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module'
  ],
  primevue: {
    options: {
      theme: {
        preset: GaseraTheme,
        options: {
          darkModeSelector: '.dark-mode',
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
          }
        }
      }
    }
  },
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'Gasera - Gestión Premium de Gas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
        { name: 'description', content: 'Solución inteligente para la distribución de gas' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap' }
      ]
    }
  }
})
