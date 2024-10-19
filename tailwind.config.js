/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'bounce-vertical': {
          '0%, 100%': { transform: 'translateY(-55%)' }, // Move upwards
          '50%': { transform: 'translateY(55%)' }, // Move downwards
        },
      },
      animation: {
        'bounce-vertical': 'bounce-vertical 1s infinite', // Custom bounce animation
      },
    },
  },
  plugins: [],
}

