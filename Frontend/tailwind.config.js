/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0px 10px 24px rgba(0, 0, 0, 0.20)',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['retro'],
  }
}