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
        pure: '#DF5DFF',
        orange: '#FFCC4D',
      },
      rotate: {
        24: '24deg',
      },
      blur: {
        xs: '450px',
      },
      backgroundImage: {
        'pure-neon': "url('/images/pure-neon.png')",
        'orange-neon': "url('/images/orange-neon.png')",
      },
      fontFamily: {
        display: 'Poppins, sans-serif',
        terminal: 'Source Code Pro, monospace',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        flicker: 'flicker 2s infinite',
      },
      screens: { '3xl': '2100px' },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
