/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#076ad4",
          "secondary": "#9333ea",
          "accent": "#1fb2a6",
          "neutral": "#343a40",
          "base-100": "#f8f9fa",
          "info": "#17a2b8",
          "success": "#36d399",
          "warning": "#ffc107",
          "error": "#dc3545",
        },
      },
    ],
  },
  plugins: [daisyui],
}

