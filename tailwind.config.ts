import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cake.me-inspired soft pastel palette
        'cake': {
          pink: '#FFE5EC',      // Soft pink - primary
          blush: '#FFF0F5',     // Lighter pink
          lavender: '#E8E4F3',  // Soft purple
          mint: '#E8F5E9',      // Gentle mint
          cream: '#FFF8E1',     // Warm cream
          sky: '#E3F2FD',       // Light blue
          peach: '#FFE0D6',     // Soft peach
          sage: '#E8F0E8',      // Subtle sage
          rose: '#FFD6E8',      // Rose
          gray: '#F5F5F7',      // Clean gray
        },
      },
      fontFamily: {
        'whimsy': ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ring': 'ring 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        ring: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(15deg)' },
          '20%': { transform: 'rotate(-15deg)' },
          '30%': { transform: 'rotate(15deg)' },
          '40%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;
