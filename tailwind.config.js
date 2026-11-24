/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nl-bg': '#090909',
        'nl-card': '#111111',
        'nl-card-hover': '#161616',
        'nl-red': '#EF233C',
        'nl-red-dark': '#C1122F',
        'nl-red-light': '#FF5364',
        'nl-border': '#292929',
        'nl-border-light': '#383838',
        'nl-text': '#FFFFFF',
        'nl-muted': '#999999',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -4px rgba(239, 35, 60, 0.35)',
        'glow-red-lg': '0 0 40px -2px rgba(239, 35, 60, 0.45)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}