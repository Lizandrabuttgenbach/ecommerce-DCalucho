/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#065f46',        // Verde esmeralda oscuro (emerald-800)
        'brand-primary-hover': '#047857',  // Verde esmeralda hover (emerald-700)
        'brand-accent': '#059669',         // Verde intermedio (emerald-600)
        'brand-accent-hover': '#047857',   // Verde intermedio hover (emerald-700)
        'bg-secondary': '#f9fafb',         // Gris muy claro (gray-50)
        'text-primary': '#1f2937',         // Gris oscuro para títulos (gray-800)
        'text-secondary': '#6b7280',       // Gris medio para textos secundarios (gray-500)
        'border-default': '#e5e7eb',       // Gris de borde estándar (gray-200)
      },
      borderRadius: {
        'radius-md': '0.5rem',             // rounded-lg equivalente
        'radius-lg': '1rem',               // rounded-2xl equivalente
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'lora': ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}