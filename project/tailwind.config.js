/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bis-navy': '#12355B',
        'bis-blue': '#1E5AA8',
        'deep-navy': '#0B1F33',
        'bis-saffron': '#F59E0B',
        'bis-teal': '#0F766E',
        'bis-bg': '#F8FAFC',
        'bis-border': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'Noto Sans Devanagari', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
};
