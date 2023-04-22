/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/screens/*.{js,jsx,ts,tsx}',
    './src/components/*.{js, jsx, ts,tsx}',
    './src/utils/*.{js, jsx, ts,tsx}',
    './src/hoc/*.{js,jsx,ts,tsx}',
    './src/components/ui/*.{js,jsx,ts,tsx}',
    './src/components/driver/*.{js,jsx,ts,tsx}',
    './src/components/options/*.{js,jsx,ts,tsx}',
    './src/components/business/*.{js,jsx,ts,tsx}',
    './src/components/containers/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
