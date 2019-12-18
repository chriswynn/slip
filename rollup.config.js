import resolve from "@rollup/plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
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
    }),
    commonjs(),
    resolve(),
    uglify()
  ]
};
