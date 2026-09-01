/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trapex: {
          navy: '#0B2545',
          dark: '#07162C',
          blue: '#134074',
          accent: '#EE6C4D',
          red: '#DC2626',
          eco: '#16A34A',
          gray: '#8DA9C4',
          light: '#EEF4F8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
