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
            transform: 'translateX(0px) translateY(0px)',
          },
          '25%': {
            transform: 'translateX(2px) translateY(-1px)',
          },
          '50%': {
            transform: 'translateX(-1px) translateY(2px)',
          },
          '75%': {
            transform: 'translateX(-2px) translateY(-1px)',
          },
        },
        'wireframe-wave-slow': {
          '0%, 100%': {
            transform: 'translateX(0px) translateY(0px)',
          },
          '33%': {
            transform: 'translateX(1px) translateY(-2px)',
          },
          '66%': {
            transform: 'translateX(-1px) translateY(1px)',
          },
        },
        'wireframe-float': {
          '0%, 100%': {
            transform: 'translateY(0px) scale(1)',
          },
          '50%': {
            transform: 'translateY(-3px) scale(1.02)',
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
