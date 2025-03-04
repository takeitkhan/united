/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1170px"
      }      
    },
    extend: {      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        "textNavColor": "#999",
        "headingColor": "#eee",
        "textHeadingColor": "#232323",
        "paraColor": "#494949",
        "textHoverColor": "#002060"
      },
      backgroundColor: {
        "facebookBg": "#4B69A8",
        "youtubeBg": "#EE403F",
        "linkedinBg": "#1D98D3",
        "instagramBg": "#D70867",
        "whatsappBg": "#00A834",
        "navBg" : "#002060",
        "navHoverColor" : "#003080",
        "bgYellow" : "#ffc107",
        "footerBg" : "#1C1C1C",
        "sectionBg" : "#F7F9FB",
        "productBg" : "#EAEBF2"
      },
      borderColor : {
        "hoverborder" : "#002060",
        "buttonborder" : "#002060"
      },
      opacity: {
        '85': '0.85',
      },
    },
  },
  plugins: [],
};
