/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '15px 15px 25px rgba(0, 0, 0, 0.30)',
      },
      inputBox: {
        'custom-inputBox': 'relative, '
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