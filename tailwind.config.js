/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          hover: '#047857',
        },
      },
      animation: {
        'bounce': 'bounce 1.4s infinite ease-in-out both',
      },
    },
  },
  plugins: [],
}
