/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      primary: '#A8D5BA',
      secondary: '#B0C4DE',
      accent: '#F4C95D',
      background: '#F5F5F5',
      txt: '#333333',
      hintTxt: '#717171',
      gray: '#A9A9A9',
      info: '#3abff8',
      success: '#36d399',
      warning: '#fbbd23',
      error: '#f87272',
    },
    extend: {
      fontSize: {
        '5xl': 48,
        '6xl': 60,
        '7xl': 72,
      },
      spacing: {
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
      },
    },
  },
  plugins: [],
};
