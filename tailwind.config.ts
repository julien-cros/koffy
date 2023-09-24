import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hero: "url('/public/collection-background.svg')",
      },
      colors: {
        primary: "#ECEEFF",
        "pale-red": "#F5F0E6",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      //   backgroundImage: {
      // 	'hero': "url('assets/images/collection-background.svg')",
      // 	'card': "url('assets/images/thumbnail-background.svg')",
      //   },
      screens: {
        wide: "1440px",
      },
    },
  },
  plugins: [],
};
export default config;

// #EFEAE4
