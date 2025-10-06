import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// We import the explicit PostCSS plugins, including the one requested by the error
import tailwindcss from '@tailwindcss/postcss'; // <-- Now importing the explicit package
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define PostCSS configuration directly, without relying on external files
  css: {
    postcss: {
      plugins: [
        // CRITICAL FIX: Use the explicit function from the explicit package
        tailwindcss(), // This now calls the function from @tailwindcss/postcss
        autoprefixer(),
      ],
    },
  },
});
