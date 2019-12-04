import postcss from "rollup-plugin-postcss";
import easyImport from "postcss-easy-import";

export default {
  input: "src/js/index.js",
  output: {
    file: "public/bundle.js",
    format: "iife"
  },
  plugins: [
    postcss({
      plugins: [easyImport()]
    })
  ]
};
