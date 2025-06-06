/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Moved to top level for clarity
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-border': 'pulseBorder 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseBorder: {
          '0%, 100%': { borderColor: 'rgb(59 130 246)' },
          '50%': { borderColor: 'rgb(147 197 253)' },
        }
      },
      colors: {
        linkedin: '#0077B5',
      }
    },
  },
  plugins: [],
}
