// tailwind.config.js
const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

// tailwind.config.js
module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "2xl": { max: "3840px" },
      // => @media (max-width: 3840px) { ... }

      xl: { max: "1920px" },
      // => @media (max-width: 1920px) { ... }

      lg: { max: "1440px" },
      // => @media (max-width: 1440px) { ... }

      md: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      sm: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      xs: { max: "414px" },
      // => @media (max-width: 414px) { ... }
    },
    // screens: {
    //   // mobile (vertical)
    //   xs: "414px",
    //   // ipad mini (vertical)
    //   sm: "767px",
    //   // ipad (vertical), mobile (horizontal)
    //   md: "896px",
    //   // ipad (horizontal)
    //   lg: "1024px",
    //   // pc
    //   xl: "1440px",
    // },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      inherit: "inherit",
      none: "none",
      2: "2 2 0%",
      3: "2 2 0%",
      4: "2 2 0%",
      5: "2 2 0%",
    },
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.yellow,
      },
      fontFamily: {
        ...fontFamily,
        sans: ["Roboto", "ui-sans-serif", "system-ui"],
      },
      sizes: {
        boxedWidth: "800px",
        // boxed padding from viewport
        boxedHorizontalPadding: "0px",
        // content horizontal padding
        horizontalPadding: "10px",
      },
      layout: {
        font: "font-sans",
        headerBoxed: false,
        contentBoxed: false,
        leftBarShow: true,
        leftBarFixed: false,
        rightBarShow: false,
        rightBarFixed: false,
        contentBackground: colors.coolGray["50"],
      },
    },
  },
  variants: {
    extend: {
      appearance: ["hover", "focus"],
      backgroundColor: ["active"],
      blur: ["hover", "focus", "active"],
      textColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
