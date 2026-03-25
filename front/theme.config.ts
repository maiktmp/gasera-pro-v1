import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

export const GaseraTheme = definePreset(Aura, {
    semantic: {
        borderRadius: '16px',
        primary: {
            50: '#fef2f2', 
            100: '#fee2e2', 
            200: '#fecaca', 
            300: '#fca5a5', 
            400: '#f87171', 
            500: '#ef4444', 
            600: '#dc2626', 
            700: '#b91c1c', 
            800: '#991b1b', 
            900: '#7f1d1d', 
            950: '#450a0a'
        },
        colorScheme: {
            light: {
                surface: { 
                    0: '#ffffff', 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' 
                },
                text: {
                    color: '{surface.700}',
                    mutedColor: '{surface.500}'
                }
            },
            dark: {
                surface: { 
                    0: '#ffffff', 50: '#0f172a', 100: '#1e293b', 200: '#334155', 300: '#475569', 400: '#64748b', 500: '#94a3b8', 600: '#cbd5e1', 700: '#e2e8f0', 800: '#f1f5f9', 900: '#f8fafc', 950: '#020617' 
                }
            }
        }
    }
});
