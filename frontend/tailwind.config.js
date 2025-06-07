/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          DEFAULT: '#0B1322',
          'node': '#1A2942',
          'hover': '#243656',
          'border': '#2F4875',
          'border-hover': '#3A5894'
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(71, 119, 217, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(71, 119, 217, 0.1) 1px, transparent 1px)',
        'grid-pattern-dark': 'linear-gradient(to right, rgba(71, 119, 217, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(71, 119, 217, 0.15) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '25px 25px',
        'grid-lg': '150px 150px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideIn': 'slideIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'gradient': 'gradient 6s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 