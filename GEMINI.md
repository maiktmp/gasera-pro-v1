# Gasera Pro - Project Context

## Project Overview
**Gasera Pro** is a smart management solution for gas distribution, specifically a mobile-first prototype designed to manage gas supply via WhatsApp. The project is a Single Page Application (SPA) built with modern web technologies, focusing on a premium aesthetic with glassmorphism effects and custom design tokens.

### Main Modules
1.  **Digital Brochure (`/mockup`)**: A digital showcase of the service.
2.  **Administrative Panel (`/admin`)**: Dashboard for managing operations and distribution metrics.
3.  **Chatbot Simulation (`/chatbot`)**: A mockup interface simulating a WhatsApp-based interaction for gas supply management.

## Tech Stack
- **Framework**: [Nuxt.js 4](https://nuxt.com/) (using `compatibilityVersion: 4`)
- **UI Framework**: [PrimeVue](https://primevue.org/) (v4+) with a custom preset based on the **Aura** theme.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3+, integrated via `@nuxtjs/tailwindcss`.
- **Icons**: [PrimeIcons](https://primevue.org/icons/).
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts).

## Project Structure
The main application is located in the `front/` directory.

- `front/app/pages/`: Contains the main application views (Vue files).
- `front/app/assets/css/main.css`: Global styles, including Tailwind base/utilities and custom classes (`glass-card`, `primary-gradient`).
- `front/theme.config.ts`: Custom PrimeVue theme preset (`GaseraTheme`) defining the primary color palette (Red #ef4444) and border-radius (16px).
- `front/nuxt.config.ts`: Main configuration for the Nuxt application, including module setup and head metadata.

## Building and Running
All commands should be executed from within the `front/` directory.

- **Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Generate Static Site**: `npm run generate`
- **Preview Production Build**: `npm run preview`
- **Nuxt Prepare (Post-install)**: `npm run postinstall`

## Development Conventions
- **Mobile First**: The UI is optimized for mobile interactions and uses responsive Tailwind utility classes.
- **UI Consistency**: Leverage PrimeVue components and use the `GaseraTheme` semantic tokens.
- **CSS Layers**: Styles are organized into layers to manage specificity between Tailwind and PrimeVue: `tailwind-base, primevue, tailwind-utilities`.
- **Custom Utility Classes**: Use `.glass-card`, `.primary-gradient`, and `.secondary-gradient` for consistent aesthetic elements.
- **SPA Mode**: The application is configured with `ssr: false` in `nuxt.config.ts`.
