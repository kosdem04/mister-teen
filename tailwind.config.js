/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f1f1f',
        orange: '#ff4b12',
        warm: '#fff8f1',
        line: '#f0e6df',
      },
      fontFamily: {
        sans: ['Manrope', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
