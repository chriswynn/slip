const program = require("commander");
const build = require("./lib/build");
const serve = require("./lib/serve");

program
  .option("-b, --build", "just a single build")
  .option("-w, --watch", "just a bit of watching");

program.parse(process.argv);

if (program.watch) {
  serve();
} else if (program.build) {
  build();
}
