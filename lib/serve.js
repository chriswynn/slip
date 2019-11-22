const build = require("./build");
const liveServer = require("live-server");
const chokidar = require("chokidar");

const serve = () => {
  const srcPath = "./src";

  build();

  chokidar.watch(srcPath).on("change", path => {
    console.log(`Change in ${path} reloading...`);
    build();
  });

  liveServer.start({
    port: 8080,
    logLevel: 0,
    root: "./public",
    file: "index.html"
  });
};

module.exports = serve;
