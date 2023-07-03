import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Century Gothic", "Montserrat", "sans-serif"],
        sans: ["Montserrat", "sans-serif"],
        serif: ["inherit", "serif"],
      },
    },
  },
};
