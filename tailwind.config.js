/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.0,0.0,0.2,1)' },
          '50%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.4,0,1,1)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
