/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '35px 35px 35px rgba(0, 0, 0, 0.45)',
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