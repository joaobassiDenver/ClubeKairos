/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f5f0ff',
          100: '#ede0ff',
          200: '#d8b4fe',
          300: '#c077fd',
          400: '#a843fa',
          500: '#8A03F8',
          600: '#7002d4',
          700: '#5E17EB',
          800: '#4a12b8',
          900: '#3a0e90',
        },
        dark: {
          50:  '#e8e8f0',
          100: '#c5c5d8',
          200: '#9a9ab8',
          300: '#6f6f98',
          400: '#4f4f80',
          500: '#2a2a55',
          600: '#1e1e42',
          700: '#141428',
          800: '#0d0d1a',
          900: '#07070f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
