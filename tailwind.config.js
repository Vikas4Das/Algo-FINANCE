/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#020617', // deep slate-950 style background
        'card-dark': '#020617',
        'border-dark': '#1f2937',
        'text-gray': '#9ca3af',
        'algo-green': '#00E599',
      },
    },
  },
  plugins: [],
}