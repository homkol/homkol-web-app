/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498DB',
        secondary: '#2C3E50',
        background: '#ECF0F1',
        tertiary: '#7DBAEA',
      },
    },
  },
  plugins: [],
}