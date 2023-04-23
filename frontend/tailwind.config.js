/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#0F0F0F',
        red: '#DF5DFF',
        blue: '#4D8AFF',
      },
      rotate: {
        24: '24deg',
      },
      blur: {
        xs: '450px',
      },
      backgroundImage: {
        neon: "url('/images/noise.png'), url('/images/neon.png')"
      },
      fontFamily: {
        display: 'Poppins, sans-serif',
        terminal: 'Source Code Pro, monospace',
      },
      keyframes: {
        gradient: {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        gradient: 'gradient 8s ease infinite',
      },
      screens: { '3xl': '2100px' },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
