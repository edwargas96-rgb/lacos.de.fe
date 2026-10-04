import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF5DB',
        sand: '#F8E2A6',
        ink: '#1E2A2E',
        teal: { DEFAULT: '#14295F', dark: '#0A1A45', soft: '#FDEBB8' },
        gold: { DEFAULT: '#EBA823', dark: '#8A5400', light: '#FFD66B' },
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
