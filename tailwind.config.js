/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0.375rem',
      },
      colors: {
        'md-dark': '#1e1e1e',
      },
    },
  },
  plugins: [],
};
