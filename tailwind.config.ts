import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E8',
        sand: '#F3E4BE',
        ink: '#1E2A2E',
        teal: { DEFAULT: '#16295A', dark: '#0C1A3D', soft: '#F6E9C8' },
        gold: { DEFAULT: '#E0A93B', dark: '#8A5A0E', light: '#F4D488' },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
