import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#181E2B',
        light: '#f5f5f0',
        steel: '#2c2c2c',
        slate: '#4a4a4a',
        mist: '#b0b0a8',
        silver: '#d4d4cc',
        ice: '#eaeae4',
      },
      fontFamily: {
        display: ['var(--font-sanchez)', 'serif'],
        text: ['var(--font-barlow)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
