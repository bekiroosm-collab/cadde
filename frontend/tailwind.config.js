/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6', // Purple
        secondary: '#10B981', // Neon Green ish
        dark: '#111827', // Dark Gray/Black
        darker: '#000000',
        light: '#F3F4F6',
        neon: '#39FF14'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
