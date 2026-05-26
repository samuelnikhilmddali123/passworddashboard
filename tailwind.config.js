/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        surface: 'rgba(30, 41, 59, 0.7)',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        text: '#f8fafc',
        textMuted: '#94a3b8'
      }
    },
  },
  plugins: [],
}
