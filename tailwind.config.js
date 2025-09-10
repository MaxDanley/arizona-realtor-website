/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'wireframe-wave': 'wireframe-wave 8s ease-in-out infinite',
        'wireframe-wave-slow': 'wireframe-wave-slow 12s ease-in-out infinite',
        'wireframe-float': 'wireframe-float 6s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'wireframe-wave': {
          '0%, 100%': {
            transform: 'translateX(0px) translateY(0px) rotate(0deg)',
          },
          '25%': {
            transform: 'translateX(3px) translateY(-2px) rotate(0.5deg)',
          },
          '50%': {
            transform: 'translateX(-2px) translateY(3px) rotate(-0.5deg)',
          },
          '75%': {
            transform: 'translateX(-3px) translateY(-1px) rotate(0.3deg)',
          },
        },
        'wireframe-wave-slow': {
          '0%, 100%': {
            transform: 'translateX(0px) translateY(0px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateX(2px) translateY(-3px) rotate(-0.3deg)',
          },
          '66%': {
            transform: 'translateX(-2px) translateY(2px) rotate(0.3deg)',
          },
        },
        'wireframe-float': {
          '0%, 100%': {
            transform: 'translateY(0px) scale(1) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-4px) scale(1.03) rotate(0.2deg)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
}
