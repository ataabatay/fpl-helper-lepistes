/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        'nav-height': '64px',
        'screen-minus-nav': 'calc(100vh - 64px)',
      },
    },
  },
  plugins: [],
};
