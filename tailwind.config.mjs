/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Dark Theme Primary Colors
        "primary-100": "#382bf0",
        "primary-200": "#5e43f3",
        "primary-300": "#7a5af5",
        "primary-400": "#9171f8",
        "primary-500": "#a688fa",
        "primary-600": "#ba9ffb",

        // Dark Theme Dark Colors
        "dark-100": "#121212",
        "dark-200": "#282828",
        "dark-300": "#3f3f3f",
        "dark-400": "#575757",
        "dark-500": "#717171",
        "dark-600": "#8b8b8b",

        // Dark Theme Mixed Dark Colors
        "dark-mixed-100": "#1a1625",
        "dark-mixed-200": "#2f2b3a",
        "dark-mixed-300": "#46424f",
        "dark-mixed-400": "#5e5a66",
        "dark-mixed-500": "#76737e",
        "dark-mixed-600": "#908d96",
      },
    },
  },
  plugins: [],
};
