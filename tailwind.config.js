const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    colors: {
      primary: '#1B262C',
      secondary: '#0F4C75',
      tertiary: '#3282B8',
      default: '#BBE1FA',
    },
  },
  plugins: [require('tailwind-scrollbar')],
});
