/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '3.75rem',
      '9xl': '8.563rem',
      '10xl': '9.563rem',
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        gries: ['Gries', 'regular'],
        n27: ['n27regular','Arial', 'sans-serif']
      },
      colors: {
        'primary':'#9cf21a',
        'portada':'#111111',
        'fondo': '#181818',
        'card-secondary': '#262626',
        'footer': '#222222',
      },
      borderRadius: {
        'full': '9999px',
      },
      strokeWidth: {
        '3': '3',
      },
      strokeDasharray: {
        'full': '1000',
      },
    },
  },
  plugins: [
  ],
}

