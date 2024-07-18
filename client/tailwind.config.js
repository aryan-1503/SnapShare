/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'md': '767px',
      'lg': '1023px',
      'xl': '1279px',
      'mxs': {'max': '480px'},
      'msm': {'min': '480px','max': '767px'},
      'mmd': {'min': '768px','max': '1023px'},
      'mlg': {'min': '1024px','max': '1440px'},
    },
    extend: {},
  },
  plugins: [],
}