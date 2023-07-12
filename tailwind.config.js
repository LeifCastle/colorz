/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        headerH: "7vh",
        sceneW: "60vw",
        sceneH: "60vh",
        layout_themeW: "15vw",
        layout_themeH: "93vh",
        VW5: "5vw",
      },
      colors: {
        layoutBg: "#2A2A2A",
        headerNoSelect: "#2A2A2A",
        headerSelect: "#6E7E65",
      },
    },
  },
  plugins: [],
};
