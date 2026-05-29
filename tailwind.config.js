/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cpme: {
          blue: '#0F3057',
          lightblue: '#1A4D8C',
          red: '#E63946',
        },
      },
    },
  },
  plugins: [],
}
