import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideInOut: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-100%)' },
        },
        slideOutIn: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideInOut: 'slideInOut 25s linear infinite',
        slideOutIn: 'slideOutIn 25s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
