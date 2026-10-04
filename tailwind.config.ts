import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF6EC',
        sand: '#F1E8D6',
        ink: '#1E2A2E',
        teal: { DEFAULT: '#0F4C5C', dark: '#0A3640', soft: '#D9E7E8' },
        gold: { DEFAULT: '#D4A94F', dark: '#8A6A1F' },
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
